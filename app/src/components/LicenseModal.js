import React, {useState, useEffect} from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import Input from './Input';
import Label from './Label';
import Modal from './Modal';
import Button from './Button';
import { Texts } from '../utils/Texts';
import { post } from '../service/Rest/RestService';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Colors } from '../utils/Colors';

export default function LicenseModal({licenseMail=null, onClose=()=>null}){
  const [licenseEmail, setLicenseEmail] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLicenseEmail(licenseMail);
  }, []);

  const handleLicenseSubmit = () => {
    if(licenseEmail && licenseEmail !== null){
      setLoading(true);

      post(Texts.API.license, {email: licenseEmail})
      .then((response) => {
        setLoading(false);

        if(response.status === 200){
          ToastAndroid.show('Logo você receberá nossas instruções. Fique atento!', ToastAndroid.BOTTOM);
          
          onClose();
        } else {
          if(response.data && response.data.message)
            ToastAndroid.show(response.data.message, ToastAndroid.BOTTOM);
        }
      });
    } else {
      setLoading(false);

      ToastAndroid.show('Informe seu melhor e-mail para continuar', ToastAndroid.BOTTOM);
    }
  }

  return (
    <Modal onClose={onClose} content={
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
            style={styles.input}
            value={licenseEmail}
            ico={faEnvelope}
            iconSize={24}/>

          <Button label={'Quero ativar a licença'} 
              style={styles.input}
              onPress={() => handleLicenseSubmit()}
              loading={loading}/>
        </View>
      </ScrollView>
    }/>
  );
}

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
  modalScroll:{
    height:screen.height,
    alignItems:'center',
  },
  license:{
    color:Colors.black,
    textAlign:'justify',
    marginHorizontal:10,
    marginVertical:20,
    width:screen.width - 70
  },
  legend:{
    fontSize:14,
    color:Colors.black,
    marginBottom: 10,
    textAlign:'center'
  },
  input:{
    width:screen.width - 60
  },
});