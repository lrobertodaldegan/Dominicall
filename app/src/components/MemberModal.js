import React, {useState, useEffect} from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons';
import { Colors } from '../utils/Colors';
import Input from './Input';
import Label from './Label';
import Modal from './Modal';
import Button from './Button';

const TURMAS = [
  {id:0, name:'Adultos', students:'10',teachers:'2'},
  {id:1, name:'Discipulado', students:'10',teachers:'2'},
  {id:2, name:'Insfantil II', students:'10',teachers:'2'},
  {id:3, name:'Jovens', students:'10',teachers:'2'},
  {id:4, name:'Insfantil I', students:'10',teachers:'2'},
  {id:5, name:'Insfantil III', students:'10',teachers:'2'},
  {id:6, name:'Esdras e Noemi Noemi Noemi', students:'10',teachers:'2'},
];

export default function MemberModal({classs=null, onClose=()=>null}){
  const [name, setName] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [paper, setPaper] = useState('Professor');
  const [clas, setClas] = useState(classs);
  const [err, setErr] = useState(null);

  const handleSubmit = () => {
    if(name && name !== null && paper && paper !== null
            && username && username !== null){

      if(paper === 'Professor' && (!clas || clas === null)){
        setErr('Por favor, selecione uma turma para o professor.');
      } else {
        //todo success

        onClose();
      }
    } else {
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
    if(paper === 'Professor'){
      let classes = TURMAS;

      return (
        <>
          <Label value={'Escolha uma classe para o professor:'}
              style={styles.lbl}/>
          
          <View style={styles.papers}>
            {classes.map(c => {
              return (
                <Button key={c.id}
                  label={c.name} 
                  onPress={() => setClas(c.name)}
                  labelStyle={[
                    styles.paperBtnLbl,
                    clas === c.name ? styles.paperLblSlctd : {}
                  ]}
                  style={[
                        styles.paperBtn,
                        clas === c.name ? styles.paperSlctd : {}
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

  return (
    <Modal onClose={onClose} content={
      <ScrollView contentContainerStyle={styles.wrap}
          keyboardDismissMode='on-drag'
          keyboardShouldPersistTaps='always'>

        <Label value={'Novo membro'} style={styles.title}/>

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
        />
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