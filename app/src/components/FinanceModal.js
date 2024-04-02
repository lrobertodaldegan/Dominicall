import React, {useState} from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { faCoins, faTag } from '@fortawesome/free-solid-svg-icons';
import { Colors } from '../utils/Colors';
import Input from './Input';
import Label from './Label';
import Modal from './Modal';
import Button from './Button';
import { post } from '../service/Rest/RestService';
import { Texts } from '../utils/Texts';
import { Days } from '../utils/Days';

export default function FinanceModal({onClose=()=>null}){
  const [title, setTitle] = useState(null);
  const [value, setValue] = useState(null);
  const [type, setType] = useState('Entrada');//ou 'Saída'
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  const handleSubmit = () => {
    if(value && value !== null && type && type !== null){
      setLoading(true);
      setErr(null);

      let body = {
        title: title,
        value: value,
        type: type,
        dt:Days.label()
      };

      post(Texts.API.finance, body).then(response => {
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
      setErr('Por favor, informe todos os dados necessários.');
    }
  }

  const renderError = () => {
    if(err && err !== null)
      return <Label value={err} style={styles.error}/>

    return <></>
  }

  return (
    <Modal onClose={onClose} content={
      <ScrollView contentContainerStyle={styles.input}
          keyboardDismissMode='on-drag'
          keyboardShouldPersistTaps='always'>

        <Label value={'Novo lançamento'} style={styles.title}/>

        <Input ico={faTag} 
            placeholder='Título'
            value={title}
            iconSize={30}
            style={styles.input}
            onChange={setTitle}
            onEnter={handleSubmit}
          />

        <Input ico={faCoins} 
          placeholder='Valor'
          value={value}
          iconSize={30}
          style={styles.input}
          onChange={setValue}
          onEnter={handleSubmit}
        />

        <Label value={'Escolha o tipo de lançamento:'}
            style={styles.lbl}/>

        <View style={styles.papers}>
          <Button label={'Entrada'} 
              onPress={() => setType('Entrada')}
              labelStyle={[
                styles.paperBtnLbl,
                type === 'Entrada' ? styles.paperLblSlctd : {}
              ]}
              style={[
                styles.paperBtn,
                type === 'Entrada' ? styles.paperSlctd : {}
              ]}
          />
          <Button label={'Saída'} 
              onPress={() => setType('Saída')}
              labelStyle={[
                styles.paperBtnLbl,
                type === 'Saída' ? styles.paperLblSlctd : {}
              ]}
              style={[
                styles.paperBtn,
                type === 'Saída' ? styles.paperSlctd : {}
              ]}
          />
        </View>

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