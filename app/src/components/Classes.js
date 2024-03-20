import React, {useState, useEffect} from "react";
import {
  FlatList,
  StyleSheet,
  View,
} from 'react-native';
import { Colors } from "../utils/Colors";
import Class from "./Class";
import ClassModal from "./ClassModal";
import Label from "./Label";
import ListItem from "./ListItem";
import NewListItem from "./NewListItem";

const TURMAS = [
  {id:0, name:'Adultos', students:'10',teachers:'2'},
  {id:1, name:'Discipulado', students:'10',teachers:'2'},
  {id:2, name:'Insfantil II', students:'10',teachers:'2'},
  {id:3, name:'Jovens', students:'10',teachers:'2'},
  {id:4, name:'Insfantil I', students:'10',teachers:'2'},
  {id:5, name:'Insfantil III', students:'10',teachers:'2'},
  {id:6, name:'Esdras e Noemi Noemi Noemi', students:'10',teachers:'2'},
];

export default function Classes({}) {
  const [comp, setComp] = useState('list');
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleListItem = (item) => {
    setComp('class');
    setSelected(item);
  }

  const handleGoBack = () => {
    setComp(null);
    setComp('list');
  }

  const renderModal = () => {
    if(showModal === true){
      return <ClassModal onClose={() => setShowModal(false)}/>
    }

    return <></>
  }

  if(comp === 'list'){
    return (
      <>
        {renderModal()}
      
        <FlatList 
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps='always'
          contentContainerStyle={styles.list}
          keyExtractor={(item) => item.id}
          data={TURMAS}
          ListHeaderComponent={
            <NewListItem title="Nova turma"
              onPress={() => setShowModal(true)}/>
          }
          renderItem={({item}) => 
            <ListItem onPress={() => handleListItem(item)}
                title={item.name}
                leftComponent={
                  <Label value={`${item.teachers} professores`}
                      style={styles.lbl}/>
                }
                midleComponent={
                  <Label value={`${item.students} alunos`}
                      style={styles.lbl}/>
                }
            />
          }
          ListFooterComponent={
            <View style={styles.listFoot}/>
          }
        />
      </>
    );
  }

  if(comp === 'class' && selected !== null){
    return <Class item={selected} onGoBack={handleGoBack}/>
  }

  return <></>
}

const styles = StyleSheet.create({
  list:{
    marginVertical:20
  },
  lbl:{
    color:Colors.gray
  },
  listFoot:{
    height:200
  },
});