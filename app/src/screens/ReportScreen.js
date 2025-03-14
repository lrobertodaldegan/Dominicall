import React, {useState, useEffect} from 'react';
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
import { Texts } from '../utils/Texts';
import ReportModal from '../components/ReportModal';

const REPORTS = [
  {
    id:0, 
    title:'Geral', 
    subtitle:'Relatório de total geral (presença e ofertas)', 
    enableDateFilter:true,
    link: Texts.API.reports.general,
    linkCsv: Texts.API.reports.generalCsv
  },
  {
    id:1, 
    title:'Matrículas', 
    subtitle:'Alunos matriculados por turma', 
    enableDateFilter:false,
    link: Texts.API.reports.students,
    linkCsv: Texts.API.reports.studentsCsv
  },
  {
    id:2, 
    title:'Presenças', 
    subtitle:'Presenças registradas por turma', 
    enableDateFilter:false,
    link: null,
    linkCsv: Texts.API.reports.presencesCsv
  },
  {
    id:3, 
    title:'Escalas', 
    subtitle:'Escalas (ordem de aulas) e eventos', 
    enableDateFilter:false,
    link: Texts.API.reports.calendar,
    linkCsv: null,
  },
  {
    id:4, 
    title:'Financeiro', 
    subtitle:'Ofertas, entradas e saídas', 
    enableDateFilter:false,
    link: Texts.API.reports.finance,
    linkCsv: null,
  },
];

const ReportScreen = ({navigation, route}) => {
  const [report, setReport] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const {group} = route.params;

  useEffect(() => {
    setShowModal(report && report !== null);
  }, [report]);

  const renderModal = () => {
    if(showModal === true){
      return (
        <ReportModal 
          group={group}
          report={report}
          onClose={() => setReport(null)}
        />
      );
    }

    return <></>
  }

  return (
    <ImageBackground source={fundo} resizeMode='repeat' style={styles.wrap}>

      <Header page={'reports'} navigation={navigation}/>

      {renderModal()}

      <FlatList 
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps='always'
        contentContainerStyle={styles.list}
        keyExtractor={(item) => item.id}
        data={REPORTS}
        renderItem={({item}) => 
          <ReportListItem
            onPress={() => setReport(item)}
            title={item.title}
            subtitle={item.subtitle}
          />
        }
        ListFooterComponent={
          <View style={styles.listFoot}>
            
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
  listFoot:{
    alignItems:'center',
    marginBottom: 200
  },
});

export default ReportScreen;