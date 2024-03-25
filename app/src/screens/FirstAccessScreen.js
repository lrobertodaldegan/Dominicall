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

const FirstAccessScreen = ({navigation}) => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [pass, setPass]   = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [btnLbl, setBtnLbl] = useState('Salvar');

  const handleSubmit = () => {
    if(user && user != null && pass && pass != null){
      setErrorMsg(null);

      CacheService.wipe('@jwt');

      setBtnLbl('Cadastrando...');

      // post('/auth/signin', {email: email, password: pass}).then((response) => {
      //   if(response.status == 200){
      //     CacheService.register('@jwt', response.data.token);

      //     navigation.navigate('inscricoes');
      //   } else {
      //     setBtnLbl('Tente novamente!');
      //   }
      // }).catch(err => {console.log(err); setBtnLbl('Tente novamente!');});

      navigation.navigate('group');
    }else{
      setErrorMsg('Usuário e senha são obrigatórios para entrar!');
    }
  }

  const handleChangeName = (val) => {
    let un = '';

    if(val?.length > 2){
      if(paper && paper !== null)
        un += paper.substring(0, 3); 

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

  return (
    <ImageBackground source={fundo} resizeMode='repeat' style={styles.wrap}>
      <ScrollView contentContainerStyle={styles.subwrap} keyboardDismissMode='on-drag' keyboardShouldPersistTaps='always'>
        <Logo style={styles.logo} />

        <View style={styles.formWrap}>
          <Input onChange={handleChangeName} placeholder='Seu nome'
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

          <Label style={styles.legend}
              value={'Seu e-mail é opcional, mas é a única forma automática de recuperar o seu acesso ao sistema.'}/>

          <Input onChange={setPass} placeholder='Sua senha'
              value={pass}
              ico={faKey}
              iconSize={24}/>

          {renderError()}

          <Button label={btnLbl} onPress={() => handleSubmit()}/>

          <Link label='Esqueceu sua senha ou é seu primeiro acesso? Toque aqui' 
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
    marginTop:screen.height * 0.1,
    marginBottom:20,
  },
  legend:{
    fontSize:12
  },
});

export default FirstAccessScreen;