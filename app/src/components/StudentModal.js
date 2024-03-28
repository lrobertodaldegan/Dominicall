import React, {useState, useEffect} from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { Colors } from '../utils/Colors';
import Input from './Input';
import Label from './Label';
import Modal from './Modal';
import Button from './Button';
import { Texts } from '../utils/Texts';
import { post } from '../service/Rest/RestService';

export default function StudentModal({classs, student=null, onClose=()=>null}){
  const [name, setName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  useEffect(() => {
    setName(student?.name);
    setErr(null);
  }, []);

  const handleSubmit = () => {
    if(name && name !== null){
      setLoading(true);
      setErr(null);

      let body = {
        name:name,
        classId: classs?._id,
      };

      post(Texts.API.students, body).then(response => {
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
      setErr('Por favor, informe um nome válido para o aluno.');
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
        <Label value={'Novo aluno'} style={styles.title}/>

        <Input ico={faGraduationCap} 
            placeholder='Nome do aluno'
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
  error:{
    color:Colors.red,
    fontSize:18,
    marginVertical:10,
    fontFamily:'MartelSans-Bold'
  },
});