import react, {useState, useEffect} from 'react';
import { faChalkboard, faPen } from '@fortawesome/free-solid-svg-icons';
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  View,
} from 'react-native';
import { Colors } from '../utils/Colors';
import { Days } from '../utils/Days';
import Input from './Input';
import Label from './Label';
import Link from './Link';
import Button from './Button';

export default function Class({
                          item, 
                          onGoBack=()=>null, 
                          onNameChange=(newName)=>null
                        }) {

  const [name, setName] = useState(null);
  const [showSave, setShowSave] = useState(false);

  useEffect(() => {
    setName(item?.name);
    setShowSave(false);
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

  return (
    <ScrollView contentContainerStyle={styles.wrap}
        keyboardDismissMode='on-drag'
        keyboardShouldPersistTaps='always'>

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
      </View>
    </ScrollView>
  );
}

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
  wrap:{
    backgroundColor:Colors.white,
    marginTop:20,
    width:screen.width - 20,
    borderRadius:20,
    padding:10
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
});