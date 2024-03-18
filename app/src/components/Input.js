import React from 'react';
import {
  TextInput,
  StyleSheet,
  Dimensions,
  View,
} from 'react-native';
import { Colors } from '../utils/Colors';
import Icon from './Icon';


export default function Input({
                        iconSize=18, 
                        iconStyle={},
                        ico=null,
                        style={},
                        inputStyle={},
                        placeholder='',
                        value=null,
                        onChange=(v)=>null,
                        onEnter=(v)=>null
                      }) {
  const renderIcon = () => {
    if(ico !== null)
      return <Icon icon={ico} size={iconSize} style={iconStyle}/>

    return <></>
  }
  
  return (
    <View style={[styles.wrap, style]}>
      {renderIcon()}

      <TextInput style={[styles.input, inputStyle]} 
          placeholderTextColor={Colors.darkerGray}
          placeholder={placeholder}
          value={value} 
          onSubmitEditing={onEnter}
          onChangeText={onChange}
      />
    </View>
  );
}

const screen = Dimensions.get('screen');

const styles= StyleSheet.create({
  wrap:{
    flexDirection:'row',
    alignItems:'center',
    width:screen.width - 20,
    paddingHorizontal:10,
    backgroundColor:Colors.white,
    borderRadius:10,
    marginBottom:10
  },
  input:{
    borderRadius:10,
    marginVertical: 5,
    height:screen.height * 0.06,
    paddingHorizontal:10,
    fontFamily:'MartelSans-Regular',
    color:Colors.black,
    fontSize:18,
    width:screen.width * 0.8,
  },
});