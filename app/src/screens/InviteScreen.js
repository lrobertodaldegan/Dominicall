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
import Input from '../components/Input';
import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import Button from '../components/Button';

const InviteScreen = ({navigation, route}) => {
  const [filter, setFilter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const {role, classId} = route.params;

  const search = () => {
    setLoading(true);

    get(`${Texts.API.users}?filter=${filter}`).then(response => {
      if(response.status === 200){
        setUsers(response.data.users);
      } else {
        if(response.data && response.data.message)
          ToastAndroid.show(response.data.message, ToastAndroid.BOTTOM);

        if(response.status === 403){
          CacheService.wipe(Texts.Cache.user);
          
          navigation.navigate('login');
        }
      }

      setLoading(false);
    });
  }

  const sendInvite = (user) => {
    if(!role){
      //showMemberModal
    } else {
      if(role && paper === 'Professor' && (!clas || clas === null)){
        setLoading(false);
        setErr('Por favor, selecione uma turma para o professor.');
      } else {
        setLoading(true);
        setErr(null);

        let body = {
          classId: classs?._id,
          username: username,
          name: name,
          email: email,
          role: paper
        };

        post(Texts.API.member, body).then(response => {
          setLoading(false);
          
          if(response.status === 201){
            onClose();
          } else {
            if(response.data && response.data.message)
              setErr(response.data.message);
          }
        });
      }
    }
  }

  return (
    <ImageBackground source={fundo} resizeMode='repeat' style={styles.wrap}>
      <View style={styles.logoffwrap}>
        <Link label={'< voltar'}
          onPress={() => navigation.goBack()}/>
      </View>
      
      <Logo style={styles.logo}/>

      <Label value={'Convidar alguém'} style={styles.title}/>

      <FlatList 
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps='always'
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={loading} 
              onRefresh={search}/>
        }
        ListHeaderComponent={
          <View style={styles.form}>
            <Input ico={faSearch}
              value={filter}
              onChange={setFilter}
              onEnter={search}
              placeholder='Informe um usuário desejado'
            />

            <Button label={'Pesquisar'}
              loading={loading}
              onPress={search}
            />

            <Label value={'Toque em um usuário para enviar o convite.\nOs resultados serão exibidos aqui embaixo:'} 
              style={styles.legend}/>
          </View>
        }
        keyExtractor={(item) => item.username}
        data={users}
        renderItem={({item}) => 
          <ListItem title={item.name}
            onPress={() => sendInvite(item)}
            showRemove={false}
            leftComponent={
              <Label value={`${item.username}`}
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
  title:{
    fontSize:26,
    fontFamily:'MartelSans-Bold',
    color:Colors.dark,
    marginVertical:screen.height * 0.05
  },
  legend:{
    fontSize:14,
    textAlign:'center',
    color:Colors.dark,
    marginVertical:10
  },
  list:{
    marginVertical:20,
    backgroundColor:Colors.white,
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
  },
  lbl:{
    color:Colors.gray
  },
  listFoot:{
    height:200
  },
});

export default InviteScreen;