import React, {useState, useEffect} from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import { Colors } from '../utils/Colors';
import Input from './Input';
import Label from './Label';
import Modal from './Modal';
import Button from './Button';

export default function OfferModal({onClose=()=>null}){
  const [value, setValue] = useState(null);

  useEffect(() => {
    setValue(value);
  }, []);

  const handleSubmit = () => {

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
  wrap:{
    position:'absolute',
    width:screen.width,
    height:screen.height,
    backgroundColor:Colors.white,
  },
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
});