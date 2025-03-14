import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
  FlatList,
  ToastAndroid,
  RefreshControl,
} from 'react-native';
import fundo from '../assets/img/fundo.png';
import By from '../components/By';
import Header from '../components/Header';
import NewListItem from '../components/NewListItem';
import { Colors } from '../utils/Colors';
import { get, del } from '../service/Rest/RestService';
import { Texts } from '../utils/Texts';
import CacheService from '../service/Cache/CacheService';
import FinanceModal from '../components/FinanceModal';
import NumberListItem from '../components/NumberListItem';

const FinanceScreen = ({navigation}) => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [itens, setItens] = useState(false);

  useEffect(() => {
    search();
  }, []);

  const search = () => {
    setLoading(true);

    get(Texts.API.finance).then(response => {
      if(response.status === 200){
        setItens(response.data.finances);
      } else {
        if(response.data && response.data.message)
          ToastAndroid.show(response.data.message, ToastAndroid.BOTTOM);

        if(response.status === 403){
          CacheService.wipe(Texts.Cache.user);
          
          navigation.navigate('login');
        } else {
          if(response.status === 204)
            setItens([]);
        }
      }

      setLoading(false);
    });
  }

  const handleRemove = (item) => {
    del(`${Texts.API.finance}/${item._id}`).then(response => {
      search();
    });
  }

  const getTotal = () => {
    let t = 0;

    if(itens && itens !== null){
      for(let i=0; i< itens.length; i++){
        if(itens[i].type === 'Entrada')
          t += itens[i].value;
        else
          t -= itens[i].value;
      }
    }

    return t;
  }

  const renderModal = () => {
    if(showModal === true)
      return <FinanceModal onClose={() => {search(); setShowModal(false);}}/>

    return <></>
  }

  return (
    <ImageBackground source={fundo} resizeMode='repeat' style={styles.wrap}>

      <Header page={'finance'} navigation={navigation}/>

      {renderModal()}

      <FlatList 
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps='always'
        contentContainerStyle={styles.list}
        data={itens}
        refreshControl={
          <RefreshControl refreshing={loading}
            onRefresh={search}
          />
        }
        ListHeaderComponent={
          <NewListItem title="Lançar no caixa"
            onPress={() => setShowModal(true)}/>
        }
        keyExtractor={(item) => item._id}
        renderItem={({item}) => 
          <NumberListItem
            onRemove={() => handleRemove(item)}
            number={item.type === 'Entrada' ? item.value : item.value * -1}
            subtitle={`${item.title} \n${item.dt}`}
          />
        }
        ListFooterComponent={
          <View style={styles.listFoot}>
            <NumberListItem
              number={getTotal()}
              subtitle='Total'
              showRemove={false}
            />
          </View>
        }
      />

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
    padding:10,
    alignItems:'center'
  },
  list:{
    marginVertical:20
  },
  lbl:{
    color:Colors.gray
  },
  lblUser:{
    fontSize: 12,
    color:Colors.gray
  },
  listFoot:{
    alignItems:'center',
    marginBottom: 200
  },
});

export default FinanceScreen;