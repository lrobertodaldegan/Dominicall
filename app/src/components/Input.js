import React, {useState, useEffect} from 'react';
import {
  TextInput,
  StyleSheet,
  Dimensions,
  View,
  TouchableHighlight,
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
                        keyboardType='default',
                        hideValue=false,
                        onChange=(v)=>null,
                        onEnter=(v)=>null
                      }) {
  const [showValue, setShowValue] = useState(false);

  useEffect(()=>{
    setShowValue(!hideValue)
  },[]);

  const renderIcon = () => {
    if(ico !== null){
      let iconComp = <Icon icon={ico} size={iconSize} style={iconStyle}/>;

      if(hideValue === true){
        return (
          <TouchableHighlight underlayColor={Colors.white}
              onPress={() => setShowValue(!showValue)}>
            {iconComp}
          </TouchableHighlight>
        );
      } else {
        return iconComp;
      }
    }

    return <></>
  }
  
  return (
    <View style={[styles.wrap, style]}>
      {renderIcon()}

      <TextInput style={[styles.input, inputStyle]} 
          placeholderTextColor={Colors.darkerGray}
          placeholder={placeholder}
          value={value} 
          keyboardType={keyboardType}
          onSubmitEditing={onEnter}
          onChangeText={onChange}
          secureTextEntry={!showValue}
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