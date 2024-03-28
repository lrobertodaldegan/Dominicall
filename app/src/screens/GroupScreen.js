import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
  FlatList,
  ToastAndroid,
  RefreshControl,
} from 'react-native';
import fundo from '../assets/img/fundo.png';
import By from '../components/By';
import NewListItem from '../components/NewListItem';
import ListItem from '../components/ListItem';
import Label from '../components/Label';
import { Colors } from '../utils/Colors';
import Logo from '../components/Logo';
import GroupModal from '../components/GroupModal';
import Link from '../components/Link';
import { del, get } from '../service/Rest/RestService';
import { Texts } from '../utils/Texts';
import CacheService from '../service/Cache/CacheService';

const GroupScreen = ({navigation}) => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    search();
  }, []);

  const search = () => {
    setLoading(true);

    get(Texts.API.group).then(response => {
      if(response.status === 200){
        let gps = response.data.groups;

        setGroups(gps);
        
        if(gps.length === 1)
          handleGroupSelection(gps[0]);
      } else {
        if(response.data && response.data.message)
          ToastAndroid.show(response.data.message, ToastAndroid.BOTTOM);

        if(response.status === 403){
          CacheService.wipe(Texts.Cache.user);
          
          navigation.navigate('login');
        } else {
          if(response.status === 204)
            setGroups([]);
        }
      }

      setLoading(false);
    });
  }

  const handleGroupSelection = (group) => {
    CacheService.register(Texts.Cache.group, group);

    navigation.navigate('home');
  }

  const handleDeletion = (group) => {
    del(`${Texts.API.group}/${group._id}`).then(response => {
      search();
    });
  }

  const handleLogoff = () => {
    CacheService.wipe(Texts.Cache.group);
    CacheService.wipe(Texts.Cache.user);
    
    navigation.navigate('login');
  }

  const renderModal = () => {
    if(showModal === true)
      return <GroupModal onClose={() => {search(); setShowModal(false);}}/>

    return <></>
  }

  return (
    <ImageBackground source={fundo} resizeMode='repeat' style={styles.wrap}>
      <View style={styles.logoffwrap}>
        <Link label={'< Sair do app (logoff)'}
          onPress={handleLogoff}/>
      </View>
      <Logo style={styles.logo}/>

      <Label value={'Grupos educacionais'} style={styles.title}/>

      {renderModal()}

      <FlatList 
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps='always'
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={loading} 
              onRefresh={search}/>
        }
        ListHeaderComponent={
          <NewListItem title='Novo grupo'
            onPress={() => setShowModal(true)}/>
        }
        keyExtractor={(item) => item._id}
        data={groups}
        renderItem={({item}) => 
          <ListItem title={item.name}
            onPress={() => handleGroupSelection(item)}
            onRemove={() => handleDeletion(item)}
            leftComponent={
              <Label value={`${item.classes} turma(s)`}
                style={styles.lbl}/>
            }
          />
        }
        ListFooterComponent={
          <View style={styles.listFoot}/>
        }
      />

      <By />
    </ImageBackground>
  );
}

const screen = Dimensions.get('screen');

const styles= StyleSheet.create({
  wrap:{
    height:screen.height,
    width:screen.width,
    backgroundColor:Colors.white,
    padding:10,
    alignItems:'center'
  },
  logoffwrap:{
    marginTop:screen.height * 0.04,
    width:screen.width - 20,
    alignItems:'flex-start',
    justifyContent:'flex-start'
  },
  logo:{
    height:screen.height * 0.1,
    width:screen.height * 0.1,
    marginTop:screen.height * 0.08,
  },
  list:{
    marginVertical:20,
    backgroundColor:Colors.white,
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
  },
  title:{
    fontSize:26,
    fontFamily:'MartelSans-Bold',
    color:Colors.dark,
    marginVertical:screen.height * 0.05
  },
  lbl:{
    color:Colors.gray
  },
  listFoot:{
    height:200
  },
});

export default GroupScreen;