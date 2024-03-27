import React, {useState, useEffect} from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { faEnvelope, faPersonChalkboard, faUsd, faUser } from '@fortawesome/free-solid-svg-icons';
import { Colors } from '../utils/Colors';
import Input from './Input';
import Label from './Label';
import Modal from './Modal';
import Button from './Button';
import { Texts } from '../utils/Texts';
import { post } from '../service/Rest/RestService';

export default function TeacherModal({
                                navigation, 
                                classs, 
                                teacher=null, 
                                onClose=()=>null
                              }){
  const [name, setName] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    handleChangeName(teacher?.name);
    setEmail(teacher?.email);
    setShowForm(false);
  }, []);

  const handleSubmit = () => {
    if(name && name !== null && username && username !== null){
      setLoading(true);
      setErr(null);

      let body = {
        classId: classs?._id,
        username: username,
        name: name,
        email: email,
        role: 'Professor'
      };

      post(Texts.API.member, body).then(response => {
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
      setErr('Por favor, informe um nome e usuário válidos.');
    }
  }

  const handleChangeName = (val) => {
    let un = '';

    if(val?.length > 2){
      un += 'Pro' + val.substring(0, 3) + '01';

      setUsername(un);
    }

    setName(val);
  }

  const renderError = () => {
    if(err && err !== null)
      return <Label value={err} style={styles.error}/>

    return <></>
  }

  const renderComp = () => {
    if(showForm === true){
      return (
        <>
          <Input ico={faPersonChalkboard} 
            placeholder='Nome do professor'
            value={name}
            iconSize={30}
            style={styles.input}
            onChange={handleChangeName}
            onEnter={handleSubmit}
          />

          <Input ico={faUser} 
            placeholder='Usuário para acesso'
            value={username}
            iconSize={30}
            style={styles.input}
            onChange={setUsername}
            onEnter={handleSubmit}
          />

          <Input ico={faEnvelope} 
            placeholder='E-mail para acesso'
            value={email}
            iconSize={30}
            style={styles.input}
            onChange={setEmail}
            onEnter={handleSubmit}
          />

          {renderError()}

          <Button label={'Salvar'} 
              onPress={handleSubmit}
              style={styles.input}
              loading={loading}
          />
        </>
      );
    } else {
      return (
        <>
          <Label value={'Você pode convidar alguém que já usa o APP ou criar um usuário novo para alguém.\nO que você quer fazer?'} 
            style={styles.legend}/>

          <Button label={'Convidar alguém'} 
            onPress={() => navigation.navigate('invite', {role:'Professor'})}
            style={styles.input}
            loading={loading}
          />

          <Button label={'Criar usuário'} 
            onPress={() => setShowForm(true)}
            style={styles.input}
            loading={loading}
          />
        </>
      );
    }
  }

  return (
    <Modal onClose={onClose} content={
      <View style={styles.input}>
        <Label value={'Novo Professor'} style={styles.title}/>

        {renderComp()}
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
  legend:{
    color:Colors.black,
    fontSize:16,
    marginBottom:20,
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