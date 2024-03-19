import React, {useState} from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-native-modern-datepicker';
import { Colors } from '../utils/Colors';
import Input from './Input';
import Label from './Label';
import Modal from './Modal';
import Button from './Button';

export default function EventModal({onClose=()=>null}){
  const [teacher, setTeacher] = useState(null);
  const [dt, setDt] = useState(null);

  const handleSubmit = () => {
    console.log(teacher);
    console.log(dt);//yyyy/mm/dd
    onClose();
  }

  return (
    <Modal onClose={onClose} content={
      <View>
        <Label value={'Novo Evento'} style={styles.title}/>

        <Input ico={faCalendarDay} 
            placeholder='Nome do evento'
            value={teacher}
            iconSize={30}
            style={styles.input}
            onChange={setTeacher}
            onEnter={handleSubmit}
        />

        <DatePicker 
          mode='calendar'
          style={styles.dtPicker}
          options={{
            defaultFont:'MartelSans-Regular',
            mainColor: Colors.black,
          }}
          onSelectedChange={date => setDt(date)}
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
  dtPicker:{
    width:screen.width * 0.8,
    marginBottom:10,
    borderRadius:10
  },
});