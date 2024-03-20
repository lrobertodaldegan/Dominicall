import React, {useState, useEffect} from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { faPersonChalkboard } from '@fortawesome/free-solid-svg-icons';
import { Colors } from '../utils/Colors';
import Input from './Input';
import Label from './Label';
import Modal from './Modal';
import Button from './Button';

export default function TeacherModal({classs=null, teacher=null, onClose=()=>null}){
  const [name, setName] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    setName(teacher?.name);
  }, []);

  const handleSubmit = () => {
    if(name && name !== null){
      //todo success

      onClose();
    } else {
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
        <Label value={'Professor'} style={styles.title}/>

        <Input ico={faPersonChalkboard} 
            placeholder='Nome do professor'
            value={name}
            iconSize={30}
            style={styles.input}
            onChange={setName}
            onEnter={handleSubmit}
        />

        {renderError()}

        <Button label={'Salvar'} 
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
  error:{
    color:Colors.red,
    fontSize:18,
    marginVertical:10,
    fontFamily:'MartelSans-Bold'
  },
});