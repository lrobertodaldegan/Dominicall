import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
  ScrollView,
} from 'react-native';
import fundo from '../assets/img/fundo.png';
import Button from '../components/Button';
import ErrorLabel from '../components/ErrorLabel';
import Link from '../components/Link';
import Logo from '../components/Logo';
import {post} from '../service/Rest/RestService';
import CacheService from '../service/Cache/CacheService';
import Input from '../components/Input';
import { faKey, faUser } from '@fortawesome/free-solid-svg-icons';
import By from '../components/By';
import { Colors } from '../utils/Colors';
import { Texts } from '../utils/Texts';

const LoginScreen = ({navigation}) => {
  const [user, setUser] = useState(null);
  const [pass, setPass]   = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    CacheService.get(Texts.Cache.user)
    .then(user => {
      if(user && user !== null)
        navigation.navigate('group');
    });
  }, []);

  const handleSubmit = () => {
    if(user && user != null && pass && pass != null){
      setLoading(true);

      setErrorMsg(null);

      CacheService.wipe(Texts.Cache.user);

      setBtnLbl('Entrando...');

      post(Texts.API.signin, {username: user, password: pass}).then((response) => {
        if(response.status == 200){
          CacheService.register(Texts.Cache.user, response.data);

          navigation.navigate('group');
        } else {
          setLoading(false);
          setErrorMsg(response.data?.message);
          setBtnLbl('Tente novamente!');
        }
      });
    }else{
      setErrorMsg('Usuário e senha são obrigatórios para entrar!');
    }
  }

  const renderError = () => {
    if(errorMsg && errorMsg !== null)
      return <ErrorLabel value={errorMsg} style={styles.lblError}/>
    else
      return <></>
  }

  return (
    <ImageBackground source={fundo} resizeMode='repeat' style={styles.wrap}>
      <ScrollView contentContainerStyle={styles.subwrap} keyboardDismissMode='on-drag' keyboardShouldPersistTaps='always'>
        <Logo style={styles.logo} />

        <View style={styles.formWrap}>
          <Input onChange={setUser} placeholder='Seu usuário'
              value={user}
              ico={faUser}
              iconSize={24}/>

          <Input onChange={setPass} placeholder='Sua senha'
              value={pass}
              ico={faKey}
              hideValue={true}
              iconSize={24}/>

          {renderError()}

          <Link label='É seu primeiro acesso? Toque aqui' 
              style={styles.linkFA}
              onPress={() => navigation.navigate('firstAccess')}/>

          <Button label={'Entrar'} onPress={() => handleSubmit()}
            loading={loading}/>

          <Link label='Esqueceu sua senha? Toque aqui' 
              style={styles.linkFA}
              onPress={() => navigation.navigate('reset')}/>
        </View>

        <By />
      </ScrollView>
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
  },
  logo:{
    width:screen.width * 0.4,
    height:screen.width * 0.4,
    marginTop:screen.height * 0.22,
    marginBottom:20,
  },
  linkFA:{
    marginBottom:10,
    textAlign:'center'
  },
});

export default LoginScreen;