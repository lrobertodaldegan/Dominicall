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
import { del, get } from "../service/Rest/RestService";
import { Texts } from "../utils/Texts";
import CacheService from "../service/Cache/CacheService";
import { BannerAd,BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
const adUnitId = __DEV__ ? TestIds.BANNER : Texts.Ads.bannerBot;

export default function Classes({navigation}) {
  const [comp, setComp] = useState('list');
  const [classList, setClassList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [showNewOption, setShowNewOption] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadClassList();
  }, []);

  const loadClassList = () => {
    setLoading(true);

    CacheService.get(Texts.Cache.user).then(user => {
      CacheService.get(Texts.Cache.group).then(group => {
        if(group.role === 'Professor'){
          setShowNewOption(false);

          get(`${Texts.API.teachers}/${user.id}`).then(response => {
            if(response.status === 200){
              let tclasses = response.data.teacherClasses;

              searchClasses((response) => {
                let cs = response.data.classes;
                
                let classesAccessable = [];

                for(let i=0; i < cs.length; i++){
                  let filtered = tclasses.filter(tc => tc._id === cs[i]._id);

                  if(filtered && filtered.length > 0)
                    classesAccessable.push(cs[i]);
                }

                setClassList(classesAccessable);

                setLoading(false);
              });
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
        } else {
          searchClasses((response) => {
            setClassList(response.data.classes);
            setShowNewOption(true);
            setLoading(false);
          });
        }
      });
    });
  }

  const searchClasses = (onSuccess=()=>null) => {
    if(loading === false)
      setLoading(true);

    get(Texts.API.class).then(response => {
      if(response.status === 200){
        onSuccess(response);
      } else {
        setLoading(false);

        if(response.status !== 204){
          if(response.data && response.data.message)
            ToastAndroid.show(response.data.message, ToastAndroid.BOTTOM);

          if(response.status === 403){
            CacheService.wipe(Texts.Cache.user);
            
            navigation.navigate('login');
          }
        }
      }
    });
  }

  const handleRemove = (item) => {
    del(`${Texts.API.class}/${item._id}`).then(response => {
      if(response.data && response.data.message)
        ToastAndroid.show(response.data.message, ToastAndroid.BOTTOM);
      
      if(response.status === 200)
        loadClassList();
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
      return <ClassModal onClose={() => {loadClassList(); setShowModal(false);}}/>
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
          refreshControl={
            <RefreshControl refreshing={loading} 
                onRefresh={loadClassList}/>
          }
          ListHeaderComponent={() => {
            if(showNewOption === true){
              return (
                <NewListItem title="Nova turma"
                  onPress={() => setShowModal(true)}/>
              );
            }

            return <></>
          }}
          renderItem={({item}) => 
            <ListItem onPress={() => handleListItem(item)}
                onRemove={() => handleRemove(item)}
                title={item.name}
                leftComponent={
                  <Label value={`${item.teachers} professor(es)`}
                      style={styles.lbl}/>
                }
                rightComponent={
                  <Label value={`${item.students} aluno(s)`}
                      style={styles.lbl}/>
                }
            />
          }
          ListFooterComponent={
            <View style={styles.listFoot}>
              <BannerAd
                unitId={adUnitId}
                size={BannerAdSize.MEDIUM_RECTANGLE}
                requestOptions={{requestNonPersonalizedAdsOnly: false,}}
              />
            </View>
          }
        />
      </>
    );
  }

  if(comp === 'class' && selected !== null){
    return <Class navigation={navigation} item={selected} onGoBack={handleGoBack}/>
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
    alignItems:'center',
    marginBottom: 200
  },
});