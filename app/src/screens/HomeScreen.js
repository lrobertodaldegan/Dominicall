import React, {useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  ImageBackground,
} from 'react-native';
import fundo from '../assets/img/fundo.png';
import By from '../components/By';
import Header from '../components/Header';
import Classes from '../components/Classes';
import { Colors } from '../utils/Colors';

const HomeScreen = ({navigation}) => {

  return (
    <ImageBackground source={fundo} resizeMode='repeat' style={styles.wrap}>
      <Header page={'home'} navigation={navigation}/>

      <Classes />

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
});

export default HomeScreen;