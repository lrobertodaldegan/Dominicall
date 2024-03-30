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

const ResetScreen = ({navigation}) => {
  const [code, setCode] = useState(null);
  const [codeSent, setCodeSent] = useState(false);
  const [username, setUsername] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [btnLbl, setBtnLbl] = useState('Enviar código');
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if(username && username != null){
      setLoading(true);

      if(codeSent === true){
        if(code && code != null){
          post(Texts.API.requestResetCode, {code: code}).then(response => {
            if(response.status === 200){
              CacheService.register(Texts.Cache.user, response.data);

              navigation.navigate('group');
            } else {
              setErrorMsg(response.data.message);
            }
  
            setLoading(false);
          });
        }else{
          setErrorMsg('Informe corretamente o código recebido para continuar!\nCaso não tenha recebido o código no e-mail, infelizmente não será possível continuar!\n Se precisar, contate nosso time de suporte.');
        }
      } else {
        post(Texts.API.requestResetCode, {username: username}).then(response => {
          if(response.status === 200){
            codeSent(true);
            setBtnLbl('Confirmar código');
          } else {
            setErrorMsg(response.data.message);
          }

          setLoading(false);
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
      return (
        <View style={styles.formWrap}>
          <Input onChange={setCode} placeholder='Insira o código recebido'
              value={code}
              ico={faKey}
              iconSize={24}/>

          {renderError()}

          <Button label={btnLbl} 
              loading={loading}
              onPress={() => handleSubmit()}/>
        </View>
      );
    } else {
      return (
        <View style={styles.formWrap}>
          <Input onChange={setUsername} 
              placeholder='Confirme seu usuário'
              value={username}
              ico={faUser}
              iconSize={24}/>

          {renderError()}

          <Button label={btnLbl} 
              onPress={() => handleSubmit()}
              loading={loading}/>
        </View>
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

        {renderComp()}

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