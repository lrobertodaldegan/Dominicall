import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import fundo from '../assets/img/fundo.png';
import Button from '../components/Button';
import ErrorLabel from '../components/ErrorLabel';
import Header from '../components/Header';
import {put} from '../service/Rest/RestService';
import CacheService from '../service/Cache/CacheService';
import Input from '../components/Input';
import { faEnvelope, faKey, faUser } from '@fortawesome/free-solid-svg-icons';
import By from '../components/By';
import { Colors } from '../utils/Colors';
import Label from '../components/Label';
import { Texts } from '../utils/Texts';
import Modal from '../components/Modal';

const ProfileScreen = ({navigation}) => {
  const [user, setUser] = useState(null);
  const [pass, setPass] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [licenseEmail, setLicenseEmail] = useState(null);
  const [license, setLicense] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(()=>{
    CacheService.get(Texts.Cache.user).then(user => {
      setUser(user.username);
      setName(user.name);
      setEmail(user.email);
      setLicenseEmail(user.email);
      setLicense(user.license);
    });
  },[]);

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

  const handleLicenseSubmit = () => {
    if(licenseEmail && licenseEmail !== null){
      //TODO

      //on success...
      setShowModal(false);
      ToastAndroid.show('Logo você receberá nossas instruções. Fique atento!', ToastAndroid.BOTTOM);
    } else {
      ToastAndroid.show('Informe seu melhor e-mail para continuar', ToastAndroid.BOTTOM);
    }
  }

  const renderLicenseAction = () => {
    if(license && license !== null)
      return <></>;

    return (
      <Button label={'Ativar licença'} 
        style={styles.btnLi}
        labelStyle={styles.btnLiLbl}
        onPress={() => setShowModal(true)}
      />
    );
  }

  const renderModal = () => {
    if(showModal === true){
      return (
        <Modal onClose={() => setShowModal(false)} 
          content={
            <ScrollView contentContainerStyle={styles.modalScroll} 
                keyboardDismissMode='on-drag' 
                keyboardShouldPersistTaps='always'>

              <View style={styles.modal}>
                <Label value={Texts.License.info}
                  style={styles.license}/>

                <Label value={'Meu melhor e-mail é:'}
                  style={styles.legend}/>

                <Input onChange={setLicenseEmail} 
                  placeholder='Seu melhor e-mail'
                  value={licenseEmail}
                  ico={faEnvelope}
                  iconSize={24}/>

                <Button label={'Quero ativar a licença'} 
                    onPress={() => handleLicenseSubmit()}
                    loading={loading}/>
              </View>
            </ScrollView>
          }
        />
      );
    }

    return<></>
  }

  return (
    <ImageBackground source={fundo} resizeMode='repeat' style={styles.wrap}>
      <Header page={'profile'} navigation={navigation}/>

      {renderModal()}

      <ScrollView contentContainerStyle={styles.subwrap} 
          keyboardDismissMode='on-drag' 
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

          <Label style={styles.legend}
              value={`Status da licença de usuário: ${license && license !== null ? 'Ativo' : 'Inativo'}`}/>

          {renderLicenseAction()}
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
  modalScroll:{
    height:screen.height,
    alignItems:'center',
  },
  license:{
    color:Colors.black,
    textAlign:'justify',
    marginHorizontal:10,
    marginVertical:20
  }
});

export default ProfileScreen;