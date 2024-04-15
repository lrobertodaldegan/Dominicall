import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
  ToastAndroid,
  RefreshControl,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons';
import fundo from '../assets/img/fundo.png';
import Button from '../components/Button';
import Input from '../components/Input';
import {get, post} from '../service/Rest/RestService';
import Header from '../components/Header';
import By from '../components/By';
import { Colors } from '../utils/Colors';
import Label from '../components/Label';
import { Texts } from '../utils/Texts';
import Link from '../components/Link';

const NewMemberScreen = ({navigation, route}) => {
  const [name, setName] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [paper, setPaper] = useState(null);
  const [classes, setClasses] = useState([]);
  const [clas, setClas] = useState(classs);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  const {classs} = route.params;

  useEffect(()=>{
    searchClasses();
  },[]);

  const searchClasses = () => {
    setLoading(true);

    get(Texts.API.class).then(response => {
      if(response.status === 200){
        setClasses(response.data.classes);
      } else {
        if(response.data && response.data.message)
          ToastAndroid.show(response.data.message, ToastAndroid.BOTTOM);
      }

      setLoading(false);
    });
  }

  const handleSubmit = () => {
    if(name && name !== null 
            && paper && paper !== null
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
            ToastAndroid.show('Membro cadastrado com sucesso!', ToastAndroid.BOTTOM);
            
            navigation.goBack();
          } else {
            if(response.data && response.data.message)
              setErr(response.data.message);
          }
        });
      }
    } else {
      setLoading(false);
      setErr('Por favor, preencha os campos necessários.');

      ToastAndroid.show('Por favor, preencha os campos necessários.', 
                        ToastAndroid.BOTTOM);
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
          <Label value={'Escolha uma turma para o professor:'}
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

  return (
    <ImageBackground source={fundo} resizeMode='repeat' style={styles.wrap}>
      <Header page={'profile'} navigation={navigation}/>

      <KeyboardAwareScrollView contentContainerStyle={styles.subwrap} 
          enableOnAndroid={true}
          refreshControl={
            <RefreshControl refreshing={loading} 
              onRefresh={searchClasses}
            />
          }
          keyboardShouldPersistTaps='always'>

        <View style={styles.formWrap}>

          <Link onPress={() => navigation.goBack()} label={'< Voltar'}/>

          <Label value={'Novo membro'}
            style={styles.title}/>

          <Label value={'Escolha uma função para o membro:'}
            style={styles.lbl}/>

          <View style={styles.papers}>
            <Button label={'Coordenador'} 
              onPress={() => setPaper(paper === 'Coordenador' ? null : 'Coordenador')}
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
              onPress={() => setPaper(paper === 'Professor' ? null : 'Professor')}
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
              onPress={() => setPaper(paper === 'Auxiliar' ? null : 'Auxiliar')}
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

          <Input ico={faUser} 
            placeholder={`Nome do ${paper && paper !== null ? paper : 'membro'}`}
            value={name}
            style={styles.input}
            onChange={handleChangeName}
            onEnter={handleSubmit}
          />

          <Input ico={faUser} 
            placeholder='Usuário para acesso'
            value={username}
            style={styles.input}
            onChange={setUsername}
            onEnter={handleSubmit}
          />

          <Input ico={faEnvelope} 
            placeholder='E-mail para acesso'
            value={email}
            style={styles.input}
            onChange={setEmail}
            onEnter={handleSubmit}
          />

          {renderClasses()}

          {renderError()}

          <Button label={'Salvar'} 
            onPress={handleSubmit}
            style={styles.input}
            loading={loading}
          />
        </View>

      </KeyboardAwareScrollView>
      <By />
    </ImageBackground>
  );
}

const screen = Dimensions.get('screen');

const styles= StyleSheet.create({
  wrap:{
    height:screen.height,
    width:screen.width,
    backgroundColor:Colors.white,
    alignItems:'center',
    padding:10
  },
  subwrap:{
    height:screen.height * 2,
    width:screen.width - 20,
    alignItems:'center',
    paddingVertical: screen.height * 0.05,
  },
  title:{
    color:Colors.black,
    fontSize:22,
    fontFamily: 'MartelSans-Bold',
    textAlign:'center' 
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
    textAlign:'center'
  },
  input:{
    width:screen.width * 0.8
  },
  papers:{
    flexWrap:'wrap',
    justifyContent:'space-between',
    marginBottom:10
  },
  paperBtn:{
    width: screen.width * 0.8,
    backgroundColor:Colors.white
  },
  paperBtnLbl:{
    color:Colors.black,
    fontSize:18,
    fontFamily:'MartelSans-Regular'
  },
  paperSlctd:{
    borderColor:Colors.black,
    borderWidth:2,
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

export default NewMemberScreen;