import react, {useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
  FlatList,
} from 'react-native';
import fundo from '../assets/img/fundo.png';
import By from '../components/By';
import Header from '../components/Header';
import { Colors } from '../utils/Colors';
import ReportListItem from '../components/ReportListItem';

const REPORTS = [
  {id:0, title:'Presença', subtitle:'Presentes e ausentes por turma e total geral', action:()=>null},
  {id:1, title:'Ofertas', subtitle:'Ofertas por turma e total geral', action:()=>null},
  {id:3, title:'Geral', subtitle:'Relatório geral (presença e ofertas)', action:()=>null},
  {id:2, title:'Cantina', subtitle:'Entradas e saídas da cantina', action:()=>null},
  {id:4, title:'Escalas', subtitle:'Escalas de professores', action:()=>null},
];

const ReportScreen = ({navigation, route}) => {
  const [showModal, setShowModal] = useState(false);

  const {group} = route.params;

  const renderModal = () => {
    if(showModal === true){
      return <></>
    }

    return <></>
  }

  return (
    <ImageBackground source={fundo} resizeMode='repeat' style={styles.wrap}>
      <Header group={group} page={'reports'} navigation={navigation}/>

      {renderModal()}

      <FlatList 
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps='always'
        contentContainerStyle={styles.list}
        keyExtractor={(item) => item.id}
        data={REPORTS}
        renderItem={({item}) => 
          <ReportListItem
            title={item.title}
            subtitle={item.subtitle}
          />
        }
        ListFooterComponent={
          <View style={styles.listFoot}/>
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
  listFoot:{
    height:200
  },
});

export default ReportScreen;