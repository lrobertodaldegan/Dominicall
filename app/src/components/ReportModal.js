import React from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  Linking,
  Share,
  ToastAndroid,
} from 'react-native';
import { Colors } from '../utils/Colors';
import Label from './Label';
import Modal from './Modal';
import Button from './Button';

export default function ReportModal({group, report, onClose=()=>null}){

  const getLink = () => {
    return `${report?.link}?groupId=${group._id}`;
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
    <Modal onClose={onClose} content={
      <View>
        <Label value={'Relatório'} style={styles.title}/>

        <Label value={report?.title} style={styles.subtitle}/>

        <Label style={styles.legend}
            value={'Você pode abrir o relatório no navegador\nou compartilhar um link de acesso:'}/>

        <Button label={'Abrir'} 
            onPress={() => Linking.openURL(getLink())}
            style={styles.btn}
        />

        <Button label={'Compartilhar link'} 
            onPress={onShare}
            labelStyle={styles.whiteBtnLbl}
            style={styles.whiteBtn}
        />
      </View>
    }/>
  );
}

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
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