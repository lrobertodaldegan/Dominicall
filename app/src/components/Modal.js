import React from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { Colors } from '../utils/Colors';
import Icon from './Icon';

export default function Modal({onClose=()=>null, closable=true, content=<></>}){
  const renderClose = () => {
    if(closable === true){
      return (
        <TouchableHighlight underlayColor={'transparent'}
            onPress={() => onClose()}>
          <Icon icon={faX} size={22}/>
        </TouchableHighlight>
      );
    }

    return <></>
  }
  
  return (
    <View style={styles.wrap} elevation={5}>
      <View style={styles.subWrap}>
        <View style={styles.header}>
          {renderClose()}
        </View>

        <View style={styles.content}>
          {content}
        </View>
      </View>
    </View>
  );
}

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
  wrap:{
    position:'absolute',
    width:screen.width,
    height:screen.height,
    zIndex:7,
    backgroundColor:Colors.white,
    opacity:0.95,
    padding:10,
    alignItems:'center',
  },
  subWrap:{
    borderWidth:1,
    borderColor:Colors.offWhite,
    borderRadius:10,
    width:screen.width - 20,
    padding:10,
    backgroundColor:Colors.white,
    zIndex:10,
    marginTop:screen.height * 0.05
  },
  header:{
    justifyContent:'center',
    alignItems:'flex-end',
    zIndex:11
  },
  content:{
    alignItems:'center',
    justifyContent:'center',
    zIndex:11,
    backgroundColor:Colors.white,
    maxHeight: screen.height * 0.8
  },
});