import React from 'react';
import {
  View,
  StyleSheet,
  Linking,
} from 'react-native';
import { Colors } from '../utils/Colors';
import { Texts } from '../utils/Texts';
import Link from './Link';

export default function By(){
  return (
    <View style={styles.wrap}>
      <Link label={'Por @lucasrobertodev'} 
          style={styles.link}
          onPress={async () => await Linking.openURL(Texts.Insta)}/>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap:{
    position:'absolute',
    bottom:70,
    backgroundColor:Colors.black,
    borderRadius:20,
    margin:10,
    paddingHorizontal:20,
    paddingVertical:5,
    justifyContent:'center'
  },
  link:{
    fontSize:12,
    marginTop:0,
    color:Colors.white
  },
});