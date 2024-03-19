import React, {useState, useEffect} from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { faClock, faGraduationCap, faUser } from '@fortawesome/free-solid-svg-icons';
import { Colors } from '../utils/Colors';
import Input from './Input';
import Label from './Label';
import Modal from './Modal';
import Button from './Button';

export default function MemberModal({onClose=()=>null}){
  const [name, setName] = useState(null);
  const [paper, setPaper] = useState('Professor');

  const handleSubmit = () => {

    onClose();
  }

  return (
    <Modal onClose={onClose} content={
      <View>
        <Label value={'Novo membro'} style={styles.title}/>

        <Input ico={faUser} 
            placeholder='Nome do membro'
            value={name}
            iconSize={30}
            style={styles.input}
            onChange={setName}
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
          <Button label={'Secretário'} 
              onPress={() => setPaper('Secretário')}
              labelStyle={[
                styles.paperBtnLbl,
                paper === 'Secretário' ? styles.paperLblSlctd : {}
              ]}
              style={[
                styles.paperBtn,
                paper === 'Secretário' ? styles.paperSlctd : {}
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
          <Button label={'Tesoureiro'} 
              onPress={() => setPaper('Tesoureiro')}
              labelStyle={[
                styles.paperBtnLbl,
                paper === 'Tesoureiro' ? styles.paperLblSlctd : {}
              ]}
              style={[
                styles.paperBtn,
                paper === 'Tesoureiro' ? styles.paperSlctd : {}
              ]}
          />
          <Button label={'Supervisor'} 
              onPress={() => setPaper('Supervisor')}
              labelStyle={[
                styles.paperBtnLbl,
                paper === 'Supervisor' ? styles.paperLblSlctd : {}
              ]}
              style={[
                styles.paperBtn,
                paper === 'Supervisor' ? styles.paperSlctd : {}
              ]}
          />
        </View>

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
  lbl:{
    color:Colors.black,
    fontSize:18
  },
  input:{
    width:screen.width * 0.8
  },
  papers:{
    flexDirection:'row',
    width:screen.width * 0.8,
    flexWrap:'wrap',
    justifyContent:'space-between'
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
});