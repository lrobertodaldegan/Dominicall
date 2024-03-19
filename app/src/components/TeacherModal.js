import React, {useState, useEffect} from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons';
import { Colors } from '../utils/Colors';
import Input from './Input';
import Label from './Label';
import Modal from './Modal';
import Button from './Button';

export default function TeacherModal({teacher=null, onClose=()=>null}){
  const [name, setName] = useState(null);

  useEffect(() => {
    setName(teacher?.name);
  }, []);

  const handleSubmit = () => {

    onClose();
  }

  return (
    <Modal onClose={onClose} content={
      <View>
        <Label value={'Professor'} style={styles.title}/>

        <Input ico={faChalkboardTeacher} 
            placeholder='Nome do professor'
            value={name}
            iconSize={30}
            style={styles.input}
            onChange={setName}
            onEnter={handleSubmit}
        />

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
});