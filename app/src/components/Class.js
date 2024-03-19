import react, {useState, useEffect} from 'react';
import { faChalkboard, faChalkboardTeacher, faChalkboardUser, faCoins, faHardHat, faPen } from '@fortawesome/free-solid-svg-icons';
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  View,
  FlatList,
} from 'react-native';
import { Colors } from '../utils/Colors';
import { Days } from '../utils/Days';
import Input from './Input';
import Label from './Label';
import Link from './Link';
import Button from './Button';
import IconLabel from './IconLabel';
import CheckListItem from './CheckListItem';

const ALUNOS = [
  {id:0, name:'Lucas Roberto', presence:10, ausence:5},
  {id:1, name:'Lucas Roberto', presence:10, ausence:5},
  {id:2, name:'Lucas Roberto', presence:10, ausence:5},
  {id:3, name:'Jéssica Sabrina', presence:10, ausence:5},
  {id:4, name:'Luiz Carlos', presence:10, ausence:5},
];

const PROFS = [
  {id:0, name:'Lucas Roberto', presence:10, ausence:5},
  {id:2, name:'Lucas Roberto', presence:10, ausence:5},
];

export default function Class({
                          item, 
                          onGoBack=()=>null, 
                          onNameChange=(newName)=>null
                        }) {

  const [name, setName] = useState(null);
  const [showSave, setShowSave] = useState(false);
  const [page, setPage] = useState(null);

  useEffect(() => {
    setName(item?.name);
    setShowSave(false);
    setPage('students');
  },[]);

  const handleNameChanging = (v) => {
    console.log(v);
    setName(v);
    setShowSave(v !== item?.name);
  }

  const handleSubmitNameChanging = () => {
    onNameChange(name);
  }

  const renderSave = () => {
    if(showSave === true){
      return (
        <Button label={'Salvar'}/>
      );
    }

    return <></>
  }

  const getData = () => {
    if(page === 'students'){
      return ALUNOS;
    }

    if(page === 'teachers'){
      return PROFS;
    }

    return [];
  }

  const getListItem = (item) => {
    if(page === 'students'){
      return (
        <CheckListItem title={item.name}
          checklistLbl='Ausente'
          checklistSelectedLbl='Presente'
          leftComponent={
            <Label value={`${item.presence} presença(s)`}
                style={styles.lbl}/>
          }
          rightComponent={
            <Label value={`${item.ausence} ausência(s)`}
                style={styles.lbl}/>
          }
        />
      )
    }

    if(page === 'teachers'){

    }

    return <></>
  }

  return (
    <FlatList 
      contentContainerStyle={styles.wrap}
      keyboardDismissMode='on-drag'
      keyboardShouldPersistTaps='always'
      ListHeaderComponent={
        <>
          <Link onPress={onGoBack} label={'< Voltar'}/>

          <View style={styles.header}>
            <Label value={Days.label()} style={styles.dt}/>

            <Input placeholder={item.name} 
                value={name}
                onChange={handleNameChanging}
                onEnter={handleSubmitNameChanging}
                ico={faChalkboard}
                style={styles.inputWrap}
                inputStyle={styles.input}
            />

            {renderSave()}

            <View style={styles.optWrap}>
              <IconLabel icon={faChalkboardUser} label='Alunos'
                  lblStyle={styles.opt}
                  selected={page === 'students'}
                  onPress={() => setPage('students')}/>
              <IconLabel icon={faChalkboardTeacher} label='Professores'
                  lblStyle={styles.opt}
                  selected={page === 'teachers'}
                  onPress={() => setPage('teachers')}/>
              <IconLabel icon={faCoins} label='Ofertas'
                  lblStyle={styles.opt}
                  selected={page === 'offers'}
                  onPress={() => setPage('offers')}/>
            </View>
          </View>
        </>
      }
      data={getData()}
      keyExtractor={(item) => item.id}
      renderItem={({item}) => getListItem(item)}
      ListFooterComponent={<View style={styles.foot}/>}
    />
  );
}

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
  wrap:{
    backgroundColor:Colors.white,
    marginTop:20,
    width:screen.width - 10,
    borderRadius:20,
    padding:5,
    overflow:'scroll'
  },
  header:{
    alignItems:'center'
  },
  dt:{
    color:Colors.black,
    fontSize:12
  },
  inputWrap:{
    minWidth:screen.width * 0.5,
    maxWidth:screen.width - 40,
  },
  input:{
    textAlign:'center',
    minWidth:((screen.width - 40) * 0.5) * 0.9,
    maxWidth:(screen.width - 40) * 0.8,
  },
  optWrap:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    width:screen.width * 0.75
  },
  opt:{
    fontSize:14
  },
  lbl:{
    color:Colors.black,
    fontSize:14
  },
  foot:{
    height:screen.height * 0.2
  },
});