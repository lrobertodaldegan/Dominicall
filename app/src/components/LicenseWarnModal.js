import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  ToastAndroid,
  RefreshControl,
} from 'react-native';
import Label from './Label';
import Modal from './Modal';
import Button from './Button';
import { Colors } from '../utils/Colors';
import { Texts } from '../utils/Texts';
import { get } from '../service/Rest/RestService';
import CacheService from '../service/Cache/CacheService';

export default function LicenseWarnModal({navigation}){
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [title, setTitle] = useState(null);
  const [text, setText] = useState(null);
  const [show, setShow] = useState(true);
  const [closable, setClosable] = useState(false);

  useEffect(() => {
    search();
  }, []);

  useEffect(() => {
    if(status === 'expired'){
      setShow(true);
      setClosable(false);
      setTitle('Sua licença expirou!');
      setText('Ative sua licença para continuar usufruindo do APP em todas as funcionalidades.\nToque no botão abaixo para continuar.');
    } else {
      if(status === 'active' || status === 'requested'){
        setShow(false);
        setClosable(true);
      } else {
        CacheService.get(Texts.Cache.licenseModal)
        .then(licenseModal => {
          if(licenseModal && licenseModal !== null 
                          && licenseModal.dontShow === true){
            setShow(false);
            setClosable(true);
          } else {
            setShow(true);
            setClosable(true);
            setTitle('Ative sua licença!');
            setText('Está gostando do app? Então ative sua licença e garanta acesso vitalício ao app!\nAtualmente você está usando uma licença temporária que será desabilitada 14 dias a partir do seu registro de usuário.\nToque no botão abaixo para ativar a sua licença!');
          }
        });
      }
    }

    setLoading(false);
  }, [status]);

  const search = () => {
    setLoading(true);

    get(Texts.API.license).then(response => {
      if(response.status === 200){
        setStatus(response.data.status);
      } else {
        setLoading(false);
        ToastAndroid.show('Houve um erro ao tentar consultar o status da licença de usuário!');
      }
    });
  }

  const handleDontShowAnymore = () => {
    if(closable === true){
      CacheService.register(
          Texts.Cache.licenseModal, 
          {dontShow:true})
      .then(() => {
        setShow(false);
      });
    }
  }

  const handleClose = () => {
    if(closable === true)
      setShow(false);
  }

  const renderBtnDontShow = () => {
    if(closable == true){
      return (
        <Button label={'Ocultar avisos'} 
          style={styles.inputDontShow}
          labelStyle={styles.lblDontShow}
          onPress={handleDontShowAnymore}
        />
      );
    }

    return <></>
  }
  
  if(show === false)
    return <></>

  return (
    <Modal closable={closable} onClose={handleClose} content={
      <ScrollView contentContainerStyle={styles.modalScroll} 
          refreshControl={
            <RefreshControl refreshing={loading}
              onRefresh={search}
            />
          }
          keyboardDismissMode='on-drag' 
          keyboardShouldPersistTaps='always'>

        <Label value={title} style={styles.title}/>

        <Label value={text} style={styles.license}/>

        <Button label={'Quero ativar a licença'} 
          style={styles.input}
          onPress={() => navigation.navigate('profile')}
          loading={loading}/>

        {renderBtnDontShow()}
      </ScrollView>
    }/>
  );
}

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
  modalScroll:{
    height:screen.height * 0.75,
    alignItems:'center',
    justifyContent: 'center'
  },
  title:{
    color:Colors.red,
    fontFamily:'MartelSans-Bold',
    fontSize:24,
    textAlign:'center'
  },
  license:{
    color:Colors.black,
    textAlign:'justify',
    marginHorizontal:10,
    marginVertical:20,
    width:screen.width - 70
  },
  input:{
    width:screen.width - 60
  },
  inputDontShow:{
    width:screen.width - 60,
    backgroundColor:Colors.white,
  },
  lblDontShow:{
    color:Colors.black
  },
});