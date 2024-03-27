import React, {useState, useEffect} from "react";
import {
  FlatList,
  StyleSheet,
  View,
  ToastAndroid,
  RefreshControl,
} from 'react-native';
import { Colors } from "../utils/Colors";
import Class from "./Class";
import ClassModal from "./ClassModal";
import Label from "./Label";
import ListItem from "./ListItem";
import NewListItem from "./NewListItem";
import { get } from "../service/Rest/RestService";
import { Texts } from "../utils/Texts";
import CacheService from "../service/Cache/CacheService";

export default function Classes({}) {
  const [comp, setComp] = useState('list');
  const [classList, setClassList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadClassList();
  }, []);

  const loadClassList = () => {
    setLoading(true);

    get(Texts.API.class).then(response => {
      if(response.status === 200){
        setClassList(response.data.classes);
      } else {
        if(response.status !== 204){
          if(response.data && response.data.message)
            ToastAndroid.show(response.data.message, ToastAndroid.BOTTOM);

          if(response.status === 403){
            CacheService.wipe(Texts.Cache.user);
            
            navigation.navigate('login');
          }
        }
      }

      setLoading(false);
    });
  }

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
          keyExtractor={(item) => item._id}
          data={classList}
          RefreshControl={
            <RefreshControl refreshing={loading} 
                onRefresh={loadClassList}/>
          }
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