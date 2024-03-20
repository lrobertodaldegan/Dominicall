import React, {useState, useEffect} from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { faCoins, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { Colors } from '../utils/Colors';
import Input from './Input';
import Label from './Label';
import Modal from './Modal';
import Button from './Button';

export default function OfferModal({offerer=null, onClose=()=>null}){
  const [value, setValue] = useState(null);
  const [offererr, setOffererr] = useState(null);

  useEffect(() => {
    setOffererr(offerer);
  }, []);

  const handleSubmit = () => {
    //TODO tratar 0 na api

    onClose();
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
            value={offererr?.name}
            iconSize={30}
            style={styles.input}
            onChange={setOffererr}
            onEnter={handleSubmit}
        />

        <Button label={'Lançar'} 
            onPress={handleSubmit}
            style={styles.input}
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