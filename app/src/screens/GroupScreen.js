import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
  FlatList,
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

const GROUPS = [
  {id:0, name:'Quitandinha', classes:5},
  {id:1, name:'Maracanã', classes:5},
];

const GroupScreen = ({navigation}) => {
  const [showModal, setShowModal] = useState(false);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    setGroups(GROUPS);

    if(GROUPS.length === 1)
      navigation.navigate('home', {group:GROUPS[0]});
  }, []);

  const handleDeletion = (group) => {
    //todo
  }

  const renderModal = () => {
    if(showModal === true)
      return <GroupModal onClose={() => setShowModal(false)}/>

    return <></>
  }

  return (
    <ImageBackground source={fundo} resizeMode='repeat' style={styles.wrap}>
      <View style={styles.logoffwrap}>
        <Link label={'< Sair do app (logoff)'}
          onPress={() => navigation.navigate('login')}/>
      </View>
      <Logo style={styles.logo}/>

      <Label value={'Grupos educacionais'} style={styles.title}/>

      {renderModal()}

      <FlatList 
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps='always'
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <NewListItem title='Novo grupo'
            onPress={() => setShowModal(true)}/>
        }
        keyExtractor={(item) => item.id}
        data={groups}
        renderItem={({item}) => 
          <ListItem title={item.name}
            onPress={() => navigation.navigate('home', {group:item})}
            onRemove={() => handleDeletion(item)}
            leftComponent={
              <Label value={`${item.classes} turmas`}
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