import React, {useState, useEffect} from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import { faCoins, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { Colors } from '../utils/Colors';
import Input from './Input';
import Label from './Label';
import Modal from './Modal';
import Button from './Button';
import { Texts } from '../utils/Texts';
import { Days } from '../utils/Days';
import { post } from '../service/Rest/RestService';

export default function OfferModal({classs, offerer=null, onClose=()=>null}){
  const [value, setValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [offererr, setOffererr] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    setOffererr(offerer);
  }, []);

  const handleSubmit = () => {
    let val = value && value !== null ? value : 0;

    let valueOk = isNaN(val) === false;

    if(valueOk === true){
      setLoading(true);
      setErr(null);

      let body = {
        value:val,
        classId: classs?._id,
        offerer: offererr,
        dt:Days.label()
      };

      post(Texts.API.offers, body).then(response => {
        setLoading(false);
        
        if(response.status === 201){
          ToastAndroid.show('Oferta registrada com sucesso!', ToastAndroid.BOTTOM);

          onClose();
        } else {
          if(response.data && response.data.message)
            setErr(response.data.message);
        }
      });
    } else {
      setLoading(false);
      setErr('Por favor, corrija o valor informado.');
    }
  }

  const renderError = () => {
    if(err && err !== null)
      return <Label value={err} style={styles.error}/>

    return <></>
  }


  return (
    <Modal onClose={onClose} content={
      <View>
        <Label value={'Oferta'} style={styles.title}/>

        <Input ico={faCoins} 
            placeholder='Valor ofertado'
            value={value}
            iconSize={30}
            keyboardType={'numeric'}
            style={styles.input}
            onChange={setValue}
            onEnter={handleSubmit}
        />

        <Input ico={faGraduationCap} 
            placeholder='Ofertante (opcional)'
            value={offererr}
            iconSize={30}
            style={styles.input}
            onChange={setOffererr}
            onEnter={handleSubmit}
        />

        {renderError()}

        <Button label={'Lançar'} 
            onPress={handleSubmit}
            style={styles.input}
            loading={loading}
        />
      </View>
    }/>
  );
}

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
  title:{
    color:Colors.black,
    textAlign:'center',
    fontSize:20,
    marginBottom:20,
    fontFamily:'MartelSans-Bold'
  },
  input:{
    width:screen.width * 0.8
  },
  error:{
    color:Colors.red,
    fontSize:18,
    marginVertical:10,
    fontFamily:'MartelSans-Bold'
  },
});