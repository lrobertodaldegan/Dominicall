import React, {useState, useEffect} from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { faChild } from '@fortawesome/free-solid-svg-icons';
import { Colors } from '../utils/Colors';
import Input from './Input';
import Label from './Label';
import Modal from './Modal';
import Button from './Button';
import { Texts } from '../utils/Texts';
import { Days } from '../utils/Days';
import { post } from '../service/Rest/RestService';

export default function VisitModal({classs, onClose=()=>null}){
  const [name, setName] = useState(null);
  const [number, setNumber] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  useEffect(() => {
    setErr(null);
  }, []);

  const handleSubmit = () => {
    if(name && name !== null){
      setLoading(true);
      setErr(null);

      let body = {
        name:name,
        number:number,
        classId: classs?._id,
        dt:Days.label()
      };

      post(Texts.API.visitors, body).then(response => {
        setLoading(false);
        
        if(response.status === 201){
          onClose();
        } else {
          if(response.data && response.data.message)
            setErr(response.data.message);
        }
      });
    } else {
      setLoading(false);
      setErr('Por favor, informe um nome válido.');
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
        <Label value={'Nova visita'} style={styles.title}/>

        <Input ico={faChild} 
            placeholder='Nome da visita'
            value={name}
            iconSize={30}
            style={styles.input}
            onChange={setName}
            onEnter={handleSubmit}
        />

        <Input ico={faChild} 
            placeholder='Número (contato)'
            value={number}
            iconSize={30}
            style={styles.input}
            keyboardType='numeric'
            onChange={setNumber}
            onEnter={handleSubmit}
        />

        {renderError()}

        <Button label={'Salvar'} 
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