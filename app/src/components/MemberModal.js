import React, {useState, useEffect} from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import { faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons';
import { Colors } from '../utils/Colors';
import Input from './Input';
import Label from './Label';
import Modal from './Modal';
import Button from './Button';
import { get, post } from '../service/Rest/RestService';
import { Texts } from '../utils/Texts';

const TURMAS = [
  {id:0, name:'Adultos', students:'10',teachers:'2'},
  {id:1, name:'Discipulado', students:'10',teachers:'2'},
  {id:2, name:'Insfantil II', students:'10',teachers:'2'},
  {id:3, name:'Jovens', students:'10',teachers:'2'},
  {id:4, name:'Insfantil I', students:'10',teachers:'2'},
  {id:5, name:'Insfantil III', students:'10',teachers:'2'},
  {id:6, name:'Esdras e Noemi Noemi Noemi', students:'10',teachers:'2'},
];

export default function MemberModal({
                                member=null,
                                classs=null, 
                                showInputs=true,
                                showOptions=true,
                                onClose=()=>null}){
  const [name, setName] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [paper, setPaper] = useState(null);
  const [loading, setLoading] = useState(false);
  const [clas, setClas] = useState(classs);
  const [classes, setClasses] = useState([]);
  const [err, setErr] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setPaper('Professor');
    setClas(classs && classs !== null ? classs : null);
    setShowForm(!(showOptions === true));

    if(member && member !== null){
      setName(member.name);
      setUsername(member.username);
      setEmail(member.email);
    }

    get(Texts.API.class).then(response => {
      if(response.status === 200){
        setClasses(response.data.classes);
      } else {
        if(response.data && response.data.message)
          ToastAndroid.show(response.data.message, ToastAndroid.BOTTOM);
      }
    });
  }, []);

  const handleSubmit = () => {
    if(name && name !== null && paper && paper !== null
            && username && username !== null){

      if(paper === 'Professor' && (!clas || clas === null)){
        setLoading(false);
        setErr('Por favor, selecione uma turma para o professor.');
      } else {
        setLoading(true);
        setErr(null);

        let body = {
          classId: clas?._id,
          username: username,
          name: name,
          email: email,
          role: paper
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
      }
    } else {
      setLoading(false);
      setErr('Por favor, informe todos os dados necessários.');
    }
  }

  const handleChangeName = (val) => {
    let un = '';

    if(val?.length > 2){
      if(paper && paper !== null)
        un += paper.substring(0, 3); 

      un += val.substring(0, 3) + '01';

      setUsername(un);
    }

    setName(val);
  }

  const renderClasses = () => {
    if(paper === 'Professor' && classs === null){
      return (
        <>
          <Label value={'Escolha uma classe para o professor:'}
              style={styles.lbl}/>
          
          <View style={styles.papers}>
            {classes.map(c => {
              return (
                <Button key={c._id}
                  label={c.name} 
                  onPress={() => setClas(c)}
                  labelStyle={[
                    styles.paperBtnLbl,
                    clas?.name === c.name ? styles.paperLblSlctd : {}
                  ]}
                  style={[
                        styles.paperBtn,
                        clas?.name === c.name ? styles.paperSlctd : {}
                  ]}
                />
              );
            })}
          </View>
        </>
      );
    }

    return <></>
  }

  const renderError = () => {
    if(err && err !== null)
      return <Label value={err} style={styles.error}/>

    return <></>
  }

  const renderInputs = () => {
    if(showInputs === true){
      return (
        <>
          <Input ico={faUser} 
            placeholder='Nome do membro'
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
        </>
      );
    } else {
      return <></>
    }
  }

  const renderComp = () => {
    if(showForm === true) {
      return (
        <>
          {renderInputs()}

          <Label value={'Escolha uma função para o membro:'}
              style={styles.lbl}/>

          <View style={styles.papers}>
            <Button label={'Coordenador'} 
                onPress={() => setPaper('Coordenador')}
                labelStyle={[
                  styles.paperBtnLbl,
                  paper === 'Coordenador' ? styles.paperLblSlctd : {}
                ]}
                style={[
                  styles.paperBtn,
                  paper === 'Coordenador' ? styles.paperSlctd : {}
                ]}
            />
            <Button label={'Professor'} 
                onPress={() => setPaper('Professor')}
                labelStyle={[
                  styles.paperBtnLbl,
                  paper === 'Professor' ? styles.paperLblSlctd : {}
                ]}
                style={[
                  styles.paperBtn,
                  paper === 'Professor' ? styles.paperSlctd : {}
                ]}
            />
            <Button label={'Auxiliar'} 
                onPress={() => setPaper('Auxiliar')}
                labelStyle={[
                  styles.paperBtnLbl,
                  paper === 'Auxiliar' ? styles.paperLblSlctd : {}
                ]}
                style={[
                  styles.paperBtn,
                  paper === 'Auxiliar' ? styles.paperSlctd : {}
                ]}
            />
          </View>

          {renderClasses()}

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
            onPress={() => navigation.navigate('invite')}
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
      <ScrollView contentContainerStyle={styles.input}
          keyboardDismissMode='on-drag'
          keyboardShouldPersistTaps='always'>

        <Label value={'Novo membro'} style={styles.title}/>

        {renderComp()}

      </ScrollView>
    }/>
  );
}

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
  wrap:{
  
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
  lbl:{
    color:Colors.black,
    fontSize:18,
    marginTop:20,
  },
  input:{
    width:screen.width * 0.8
  },
  papers:{
    flexDirection:'row',
    width:screen.width * 0.8,
    flexWrap:'wrap',
    justifyContent:'space-between',
    marginBottom:10
  },
  paperBtn:{
    width: (screen.width * 0.8) * 0.45,
    backgroundColor:Colors.white
  },
  paperBtnLbl:{
    color:Colors.black,
    fontSize:18,
    fontFamily:'MartelSans-Regular'
  },
  paperSlctd:{
    borderColor:Colors.black,
    borderWidth:4,
    backgroundColor:Colors.offWhite
  },
  paperLblSlctd:{
    fontFamily:'MartelSans-Bold'
  },
  error:{
    color:Colors.red,
    fontSize:18,
    marginVertical:10,
    fontFamily:'MartelSans-Bold'
  },
});