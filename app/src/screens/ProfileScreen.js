import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
  ToastAndroid,
  RefreshControl,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import fundo from '../assets/img/fundo.png';
import Button from '../components/Button';
import Header from '../components/Header';
import {put} from '../service/Rest/RestService';
import CacheService from '../service/Cache/CacheService';
import Input from '../components/Input';
import { faKey, faUser } from '@fortawesome/free-solid-svg-icons';
import By from '../components/By';
import { Colors } from '../utils/Colors';
import Label from '../components/Label';
import { Texts } from '../utils/Texts';

const ProfileScreen = ({navigation}) => {
  const [user, setUser] = useState(null);
  const [pass, setPass] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    search();
  },[]);

  const search = () => {
    setLoading(true);

    CacheService.get(Texts.Cache.user).then(user => {
      setUser(user.username);
      setName(user.name);
      setEmail(user.email);

      setLoading(false);
    });
  }

  const handleSubmit = () => {
    if(user && user != null && user && user != null){
      setLoading(true);

      let body = {
        username: user,
        name: name,
        email:email
      };

      if(pass && pass !== null)
        body.password = pass;

      put(Texts.API.user, body).then((response) => {
        setLoading(false);

        if(response.status == 200){
          CacheService.register(Texts.Cache.user, response.data);

          ToastAndroid.show('Dados atualizados com sucesso!', ToastAndroid.BOTTOM);
        } else {
          if(response.data && response.data.message)
            ToastAndroid.show(response.data.message, ToastAndroid.BOTTOM);
        }
      });
    }else{
      ToastAndroid.show('Nome e usuário são obrigatórios!', ToastAndroid.BOTTOM);

      setLoading(false);
    }
  }

  return (
    <ImageBackground source={fundo} resizeMode='repeat' style={styles.wrap}>
      <Header page={'profile'} navigation={navigation}/>

      <KeyboardAwareScrollView contentContainerStyle={styles.subwrap} 
          enableOnAndroid={true}
          refreshControl={
            <RefreshControl refreshing={loading} 
              onRefresh={search}
            />
          }
          keyboardShouldPersistTaps='always'>

        <View style={styles.formWrap}>

          <Input onChange={setName} placeholder='Seu nome'
              value={name}
              ico={faUser}
              iconSize={24}/>

          <Input onChange={setUser} placeholder='Seu usuário'
              value={user}
              ico={faUser}
              iconSize={24}/>

          <Input onChange={setEmail} placeholder='Seu e-mail'
              value={email}
              ico={faUser}
              iconSize={24}/>

          <Input onChange={setPass} placeholder='Sua nova senha (opcional)'
              value={pass}
              ico={faKey}
              hideValue={true}
              iconSize={24}/>

          <Label style={styles.legend}
              value={'Seu e-mail também é opcional, mas é a única forma automática de recuperar o seu acesso ao app.'}/>

          <Button label={'Salvar'} 
              onPress={() => handleSubmit()}
              loading={loading}/>
        </View>

        <By />
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
}

const screen = Dimensions.get('screen');

const styles= StyleSheet.create({
  wrap:{
    height:screen.height,
    width:screen.width,
    backgroundColor:Colors.white,
    alignItems:'center',
    padding:10
  },
  subwrap:{
    height:screen.height,
    width:screen.width - 20,
    alignItems:'center',
    paddingVertical: screen.height * 0.05
  },
  title:{
    fontSize:20,
    textAlign: 'center',
    color:Colors.black,
    marginBottom: 20
  },
  legend:{
    fontSize:14,
    color:Colors.black,
    marginBottom: 10,
    textAlign:'center'
  },
  btnLi:{
    backgroundColor:Colors.white
  },
  btnLiLbl:{
    color:Colors.red
  },
});

export default ProfileScreen;