import React, {useState} from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { faCalendarDay, faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons';
import DatePicker from 'react-native-modern-datepicker';
import { Colors } from '../utils/Colors';
import Input from './Input';
import Label from './Label';
import Modal from './Modal';
import Button from './Button';

export default function EventModal({onClose=()=>null}){
  const [event, setEvent] = useState(null);
  const [teacher, setTeacher] = useState(null);
  const [dt, setDt] = useState(null);
  const [err, setErr] = useState(null);

  const handleSubmit = () => {
    console.log(event);
    console.log(teacher);
    console.log(dt);//yyyy/mm/dd

    if(!event || event === null){
      setErr('Por favor, informe o nome do evento.');
    } else {
      if(!teacher || teacher === null){
        setErr('Por favor, informe o nome do professor ou palestrante.');
      } else {
        if(!dt || dt === null){
          setErr('Por favor, informe a data do evento.');
        } else {
          //todo success

          onClose();
        }
      }
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
        <Label value={'Novo Evento'} style={styles.title}/>

        <Input ico={faCalendarDay} 
            placeholder='Nome do evento'
            value={event}
            iconSize={30}
            style={styles.input}
            onChange={setEvent}
            onEnter={handleSubmit}
        />

        <Input ico={faChalkboardTeacher} 
            placeholder='Nome do professor'
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
  dtPicker:{
    width:screen.width * 0.8,
    marginBottom:10,
    borderRadius:10
  },
  error:{
    color:Colors.red,
    fontSize:18,
    marginVertical:10,
    fontFamily:'MartelSans-Bold'
  },
});