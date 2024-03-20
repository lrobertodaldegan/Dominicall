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

export default function Modal({onClose=()=>null, content=<></>}){
  return (
    <View style={styles.wrap}>
      <View style={styles.subWrap}>
        <View style={styles.header}>
          <TouchableHighlight underlayColor={'transparent'}
              onPress={() => onClose()}>
            <Icon icon={faX} size={26}/>
          </TouchableHighlight>
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
    backgroundColor:Colors.offWhite,
    opacity:0.8,
    padding:10,
    alignItems:'center',
    justifyContent:'center',
  },
  subWrap:{
    borderWidth:2,
    borderColor:Colors.darkerGray,
    borderRadius:20,
    width:screen.width - 20,
    padding:10,
    backgroundColor:Colors.white,
    zIndex:10,
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