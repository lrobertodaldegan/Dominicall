import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { faCheckSquare, faGraduationCap, faMobile } from '@fortawesome/free-solid-svg-icons';
import { Colors } from '../utils/Colors';
import Input from './Input';
import Label from './Label';
import Modal from './Modal';
import Button from './Button';
import IconLabel from './IconLabel';
import { Texts } from '../utils/Texts';
import { post, put } from '../service/Rest/RestService';
import Link from './Link';
import DatePicker from 'react-native-date-picker';
import { Days } from '../utils/Days';

export default function StudentModal({classs, student=null, onClose=()=>null}){
  const [name, setName] = useState(null);
  const [number, setNumber] = useState(null);
  const [churchMember, setChurchMember] = useState(null);
  const [date, setDate] = useState(new Date());
  const [oldDn, setOldDn] = useState(null);
  const [showDtPicker, setShowDtPicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  useEffect(() => {
    setDate(new Date());
    setName(student?.name);
    setNumber(student?.number);
    setChurchMember(student?.churchMember);

    if(student?.dn){
      setOldDn(new Date(student?.dn));
      setDate(new Date(student?.dn));
    }
    
    setErr(null);
  }, []);

  useEffect(() => {
    setOldDn(date)
  }, [date]);

  const handleSubmit = () => {
    if(name && name !== null){
      setLoading(true);
      setErr(null);

      let dtf = null;

      if(date && date !== null)
        dtf = date.getTime();

      let body = {
        name:name,
        classId: classs?._id,
        number:number,
        churchMember: churchMember,
      };

      if(dtf && dtf !== null)
        body.dn = dtf;

      if(student && student !== null){
        put(`${Texts.API.students}/${student._id}`, body).then(response => {
          setLoading(false);
          
          if(response.status === 200){
            onClose();
          } else {
            if(response.data && response.data.message)
              setErr(response.data.message);
          }
        });
      } else {
        post(Texts.API.students, body).then(response => {
          setLoading(false);
          
          if(response.status === 201){
            onClose();
          } else {
            if(response.data && response.data.message)
              setErr(response.data.message);
          }
        });
      }
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
      <ScrollView contentContainerStyle={styles.wrap}
        keyboardDismissMode='on-drag'
        keyboardShouldPersistTaps='always'>
        <Label value={student && student !== null ? 'Aluno' : 'Novo aluno'} 
          style={styles.title}/>

        <Input ico={faGraduationCap} 
          placeholder='Nome do aluno'
          value={name}
          style={styles.input}
          onChange={setName}
          onEnter={handleSubmit}
        />

        <Input ico={faMobile} 
          placeholder='Telefone'
          value={number}
          style={styles.input}
          onChange={setNumber}
          onEnter={handleSubmit}
        />

        <Link label={`Data de nascimento: ${oldDn ? Days.simpleLabel(oldDn) : 'Não informado'}\nToque para alterar`}
          style={styles.lblDn}
          onPress={() => setShowDtPicker(true)}
        />

        <DatePicker 
          date={date} 
          mode='date'
          theme='light'
          modal={true}
          open={showDtPicker}
          title='Informe a data de nascimento do aluno:'
          onClose={() => setShowDtPicker(false)}
          onCancel={() => setShowDtPicker(false)}
          onConfirm={(newDt) => {setShowDtPicker(false); setDate(newDt);}}
        />

        <IconLabel
          icon={faCheckSquare}
          label={churchMember === true ? 'Já é membro da igreja' : 'Ainda não é membro da igreja'}
          style={styles.botOpt}
          lblStyle={churchMember === true ? styles.botLblS : styles.botLbl}
          iconStyle={churchMember === true ? styles.botLblS : styles.botIco}
          onPress={() => setChurchMember(!churchMember)}
        />

        {renderError()}

        <Button label={'Salvar'} 
          onPress={handleSubmit}
          style={styles.input}
          loading={loading}
        />
      </ScrollView>
    }/>
  );
}

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
  wrap:{
    height:screen.height * 1.3,
    backgroundColor:Colors.white,
  },
  modalWrap:{

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
  botOpt:{
    marginVertical:20
  },
  botLbl:{
    color:Colors.darkerGray
  },
  botLblS:{
    color:Colors.black
  },
  botIco:{
    color:Colors.gray
  },
  lblDn:{
    textAlign:'center',
    marginVertical:10
  },
});