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
import { post } from '../service/Rest/RestService';
import { Texts } from '../utils/Texts';
import { Days } from '../utils/Days';

export default function EventModal({
                                classs,
                                onClose=()=>null
                              }){

  const [event, setEvent] = useState(null);
  const [teacher, setTeacher] = useState(null);
  const [dt, setDt] = useState(null);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(null);

  const handleSubmit = () => {
    if(!event || event === null){
      setErr('Por favor, informe o nome do evento.');
      setLoading(false);
    } else {
      if(!teacher || teacher === null){
        setErr('Por favor, informe o nome do professor ou palestrante.');
        setLoading(false);
      } else {
        if(!dt || dt === null){
          setErr('Por favor, informe a data do evento.');
          setLoading(false);
        } else {
          let dts = dt.split('/');
          let d = new Number(dts[2]);
          let m = new Number(dts[1]);
          let y = new Number(dts[0]);
          let dtf = new Date(y, m-1, d);

          let body = {
            classId:classs._id,
            dt:Days.label(dtf),
            name:event,
            teacher:teacher
          };

          post(Texts.API.events, body).then((response) => {
            setLoading(false);

            if(response.status === 201){
              onClose();
            } else {
              if(response.data && response.data.message)
                setErr(response.data.message);
            }
          });
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
          loading={loading}
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