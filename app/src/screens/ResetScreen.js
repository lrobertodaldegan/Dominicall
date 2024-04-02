import {useState} from 'react';
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
import Logo from '../components/Logo';
import {post} from '../service/Rest/RestService';
import CacheService from '../service/Cache/CacheService';
import Input from '../components/Input';
import { faKey, faUser } from '@fortawesome/free-solid-svg-icons';
import By from '../components/By';
import { Colors } from '../utils/Colors';
import { Texts } from '../utils/Texts';
import Link from '../components/Link';

const ResetScreen = ({navigation}) => {
  const [code, setCode] = useState(null);
  const [codeSent, setCodeSent] = useState(false);
  const [codeValidated, setCodeValidated] = useState(false);
  const [pass, setPass] = useState(null);
  const [username, setUsername] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [btnLbl, setBtnLbl] = useState('Enviar código');
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if(username && username != null){
      setLoading(true);
      setErrorMsg(null);

      if(codeSent === true){
        if(codeValidated === true){
          if(pass && pass !== null){
            post(Texts.API.user, {username: username, password: pass})
            .then(response => {
              setLoading(false);

              if(response.status === 200){
                navigation.navigate('group');
              } else {
                if(response.data && response.data.message)
                  setErrorMsg(response.data.message);
              }
            });
          } else {
            setErrorMsg('Informe uma nova senha válida para continuar!');
          }
        } else {
          if(code && code != null){
            post(Texts.API.confirmResetCode, {username: username, code: code})
            .then(response => {
              setLoading(false);

              if(response.status === 200){
                CacheService.register(Texts.Cache.user, response.data)
                .then(() => {
                  setBtnLbl('Atualizar senha');
                  setCodeValidated(true);
                });
              } else {
                if(response.data && response.data.message)
                  setErrorMsg(response.data.message);
              }
            });
          }else{
            setErrorMsg('Informe corretamente o código recebido para continuar!\nCaso não tenha recebido o código no e-mail, infelizmente não será possível continuar!\n Se precisar, contate nosso time de suporte.');
          }
        }
      } else {
        post(Texts.API.requestResetCode, {username: username})
        .then(response => {
          setLoading(false);

          if(response.status === 200){
            setCodeSent(true);
            setBtnLbl('Confirmar código');
          } else {
            if(response.data && response.data.message)
              setErrorMsg(response.data.message);
          }
        });
      }
    }else{
      setLoading(false);
      setErrorMsg('Informe um e-mail válido para continuar!');
    }
  }

  const renderError = () => {
    if(errorMsg && errorMsg !== null)
      return <ErrorLabel value={errorMsg} style={styles.lblError}/>
    else
      return <></>
  }

  const renderComp = () => {
    if(codeSent === true) {
      if(codeValidated === true){
        return (
          <Input onChange={setPass} 
            placeholder='Sua nova senha'
            value={pass}
            ico={faKey}
            hideValue={true}
            iconSize={24}/>
        );
      } else {
        return (
          <Input onChange={setCode} placeholder='Insira o código recebido'
              value={code}
              ico={faKey}
              keyboardType='numeric'
              iconSize={24}/>
        );
      }
    } else {
      return (
        <Input onChange={setUsername} 
          placeholder='Confirme seu usuário'
          value={username}
          ico={faUser}
          iconSize={24}/>
      );
    }
  }

  return (
    <ImageBackground source={fundo} resizeMode='repeat' style={styles.wrap}>
      <ScrollView contentContainerStyle={styles.subwrap} 
          keyboardDismissMode='on-drag' 
          keyboardShouldPersistTaps='always'>

        <View style={styles.logoffwrap}>
          <Link label={'< voltar'}
            onPress={() => navigation.goBack()}/>
        </View>

        <Logo style={styles.logo} />

        <View style={styles.formWrap}>
          {renderComp()}

          {renderError()}

          <Button label={btnLbl} 
            onPress={() => handleSubmit()}
            loading={loading}/>
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
  logoffwrap:{
    marginTop:screen.height * 0.04,
    width:screen.width - 20,
    alignItems:'flex-start',
    justifyContent:'flex-start'
  },
  logo:{
    width:screen.width * 0.4,
    height:screen.width * 0.4,
    marginTop:screen.height * 0.1,
    marginBottom:20,
  },
  legend:{
    fontSize:12
  },
});

export default ResetScreen;