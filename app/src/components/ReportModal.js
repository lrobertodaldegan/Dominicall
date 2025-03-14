import React, {useEffect, useState} from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  Linking,
  Share,
  ToastAndroid,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { get } from '../service/Rest/RestService';
import { Colors } from '../utils/Colors';
import { Texts } from '../utils/Texts';
import Label from './Label';
import OldModal from './OldModal';
import Button from './Button';

const reportTypes = ['pdf', 'csv'];

export default function ReportModal({group, report, onClose=()=>null}){
  const [reportType, setReportType] = useState(null);
  const [reportDates, setReportDates] = useState(null);
  const [reportDate, setReportDate] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if(report?.link === null || report?.linkCsv === null){
      if(report?.link !== null)
        setReportType(reportTypes[0]);

      if(report?.linkCsv !== null)
        setReportType(reportTypes[1]);
    }

    if(report?.enableDateFilter === true){
      setLoading(true);

      get(`${Texts.API.reports.presencesDays}?groupId=${group?._id}`).then((response) => {
        if(response.status === 200){
          let dts = response.data.dates;
          
          setReportDates(dts.sort((a, b) => {
            let dta = a.split(" ")[1];
            let dtb = b.split(" ")[1];

            const partesA = dta.split('/');
            const partesB = dtb.split('/');

            let dateA = new Date(parseInt(partesA[2], 10), 
                                  parseInt(partesA[1], 10) - 1,
                                  parseInt(partesA[0], 10));

            let dateB = new Date(parseInt(partesB[2], 10), 
                                  parseInt(partesB[1], 10) - 1,
                                  parseInt(partesB[0], 10));

            if(dateA > dateB)
              return 1;
            else
              return 0;
          }));

          if(dts.length === 1)
            setReportDate(dts[0]);
        }

        setLoading(false);
      });
    }
  }, []);

  const getLink = () => {
    let link = null;

    if(reportType === reportTypes[0])
      link = `${report?.link}?groupId=${group._id}`;
    else
      link = `${report?.linkCsv}?groupId=${group._id}`;

    if(report?.enableDateFilter === true && reportDate !== null)
      link = `${link}&d=${reportDate}`;

    return link;
  }

  const onShare = async () => {
    try {
      let msg = `Acesse o relatório ${report?.title} pelo link:\n${getLink()}\n\nGerado automaticamente no App Dominicall: https://play.google.com/store/apps/details?id=com.dominicall\n\n🙌 Deus abençoe!`;

      await Share.share({message: msg});
    } catch (error) {
      console.log(error);
      
      ToastAndroid.show('Não foi possível gerar o link de compartilhamento!\nTente novamente mais tarde!', ToastAndroid.BOTTOM);
    }
  }

  return (
    <OldModal onClose={onClose} content={
      <ScrollView contentContainerStyle={styles.modalScroll}>
        <Label value={`Relatório ${report?.title}`} style={styles.title}/>

        {isLoading === true && (
          <ActivityIndicator size={'large'} color={'#000'}/>
        )}

        {isLoading === false
            && report?.enableDateFilter === true 
            && reportDate === null
            && reportDates !== null
            && (
          <>
            <Label value={'Selecione uma data para o relatório:'}
                style={styles.legend}/>
          
            {reportDates.map((rd) => 
              <Button key={rd}
                  label={rd} 
                  onPress={() => setReportDate(rd)}
                  style={styles.whiteBtn}
                  labelStyle={styles.whiteBtnLbl}
              />
            )}
          </>
        )}

        {isLoading === false
            && (report?.enableDateFilter === true ? reportDate !== null : true)
            && reportDate != null && (
        
          <Label value={`Data do relatório: ${reportDate}`}
              style={styles.subtitle}/>
        )}

        {isLoading === false
            && (report?.enableDateFilter === true ? reportDate !== null : true)
            && reportType === null && (
          <>
            <Label value={'Selecione o tipo de arquivo desejado:'}
                style={styles.legend}/>
          
            {reportTypes.map((rt) => 
              <Button key={rt}
                  label={rt} 
                  onPress={() => setReportType(rt)}
                  style={styles.btn}
              />
            )}
          </>
        )}

        {isLoading === false 
            && (report?.enableDateFilter === true ? reportDate !== null : true)
            && reportType !== null && (
          <>
            <Label style={styles.legend}
                value={`Você pode abrir o relatório (${reportType}) no navegador\nou compartilhar um link de acesso:`}/>

            <Button label={'Abrir'} 
                onPress={() => Linking.openURL(getLink())}
                style={styles.btn}
            />

            <Button label={'Compartilhar link'} 
                onPress={onShare}
                labelStyle={styles.whiteBtnLbl}
                style={styles.whiteBtn}
            />
          </>
        )}
      </ScrollView>
    }/>
  );
}

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
  modalScroll:{
    minHeight:screen.height * 0.75,
    alignItems:'center',
    justifyContent: 'center'
  },
  title:{
    color:Colors.black,
    textAlign:'center',
    fontSize:20,
    marginBottom:20,
    fontFamily:'MartelSans-Bold'
  },
  subtitle:{
    textAlign:'center',
    fontSize:18,
    marginBottom:20,
    fontFamily:'MartelSans-Bold',
    color:Colors.black,
  },
  legend:{
    textAlign:'center',
    fontSize:14,
    marginBottom:20,
    color:Colors.black,
  },
  btn:{
    width:screen.width * 0.8
  },
  whiteBtn:{
    width:screen.width * 0.8,
    backgroundColor:Colors.white
  },
  whiteBtnLbl:{
    color: Colors.black
  },
  error:{
    color:Colors.red,
    fontSize:18,
    marginVertical:10,
    fontFamily:'MartelSans-Bold'
  },
});