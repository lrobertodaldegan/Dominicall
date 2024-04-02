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
import Link from '../components/Link';
import Logo from '../components/Logo';
import {post} from '../service/Rest/RestService';
import CacheService from '../service/Cache/CacheService';
import Input from '../components/Input';
import { faKey, faUser } from '@fortawesome/free-solid-svg-icons';
import By from '../components/By';
import { Colors } from '../utils/Colors';
import Label from '../components/Label';
import { Texts } from '../utils/Texts';

const FirstAccessScreen = ({navigation}) => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [pass, setPass]   = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showInputs, setShowInputs] = useState(false);
  const [isNew, setIsNew] = useState(false);

  const handleSubmit = () => {
    if(user && user != null && pass && pass != null){
      setLoading(true);

      setErrorMsg(null);

      CacheService.wipe(Texts.Cache.user);

      let body = {
        username: user,
        password: pass,
        name: name,
        email:email
      };

      if(isNew === true){
        post(Texts.API.signup, body).then((response) => {
          if(response.status == 201){
            post(Texts.API.signin, body).then((response) => {
              if(response.status == 200){
                CacheService.register(Texts.Cache.user, response.data);
      
                navigation.navigate('group');
              } else {
                setErrorMsg('Cadastro realizado! Vamos te redirecionar para o login...');
                setTimeout(() => navigation.navigate('login'), 3000);
              }

              setLoading(false);
            });
          } else {
            setErrorMsg(response.data.message);
            setLoading(false);
          }
        });
      } else {
        post(Texts.API.firstAccess, body).then((response) => {
          if(response.status == 200){
            CacheService.register(Texts.Cache.user, response.data);
  
            navigation.navigate('group');
          } else {
            if(response.data && response.data.message)
              setErrorMsg(response.data.message);
          }

          setLoading(false);
        });
      }
    }else{
      setErrorMsg('Usuário e senha são obrigatórios para entrar!');
      setLoading(false);
    }
  }

  const handleChangeName = (val) => {
    let un = '';

    if(val?.length > 2){
      un += val.substring(0, 3) + '01';

      setUser(un);
    }

    setName(val);
  }

  const renderError = () => {
    if(errorMsg && errorMsg !== null)
      return <ErrorLabel value={errorMsg} style={styles.lblError}/>
    else
      return <></>
  }

  const renderForm = () => {
    if(showInputs === true) {
      let nameInput = (
        <Input onChange={handleChangeName} placeholder='Seu nome'
          value={name}
          ico={faUser}
          iconSize={24}/>
      );

      let mailInput = (
        <Input onChange={setEmail} placeholder='Seu e-mail'
          value={email}
          ico={faUser}
          iconSize={24}/>
      );

      if(isNew === false){
        nameInput = <></>;
        mailInput = <></>;
      }
        
      return (
        <View style={styles.formWrap}>
          <Label style={styles.title}
            value={`Bem-vindo(a)${name && name !== null ? ', ' + name : ''}!`}/>

          {nameInput}

          {mailInput}

          <Input onChange={setUser} placeholder='Seu usuário'
            value={user}
            ico={faUser}
            iconSize={24}/>

          <Input onChange={setPass} placeholder='Sua nova senha'
            value={pass}
            ico={faKey}
            hideValue={true}
            iconSize={24}/>

          <Label style={styles.legend}
            value={'Seu e-mail é opcional, mas é a única forma automática de recuperar o seu acesso ao app.'}/>

          {renderError()}

          <Button label={'Entrar'} onPress={() => handleSubmit()}
              loading={loading}/>
        </View>
      );
    } else {
      return (
        <View style={styles.formWrap}>
          <Button label={'Já recebi meu usuário'} 
            onPress={() => {setIsNew(false); setShowInputs(true);}}/>

          <Button label={'Não possuo usuário'} 
            onPress={() => {setIsNew(true); setShowInputs(true);}}/>
        </View>
      );
    }
  }

  return (
    <ImageBackground source={fundo} resizeMode='repeat' style={styles.wrap}>
      <ScrollView contentContainerStyle={styles.subwrap} 
          keyboardShouldPersistTaps='always'>
        
        <View style={styles.logoffwrap}>
          <Link label={'< voltar'}
            onPress={() => navigation.goBack()}/>
        </View>

        <Logo style={styles.logo} />

        {renderForm()}

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
    height:screen.height * 1.3,
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
  title:{
    fontSize:20,
    textAlign: 'center',
    color:Colors.black,
    marginBottom: 20
  },
  legend:{
    fontSize:14,
    color:Colors.black,
    marginBottom: 10
  },
});

export default FirstAccessScreen;