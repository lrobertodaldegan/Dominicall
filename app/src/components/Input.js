import React, {useState, useEffect} from 'react';
import {
  TextInput,
  StyleSheet,
  Dimensions,
  View,
  TouchableHighlight,
  Keyboard,
} from 'react-native';
import { Colors } from '../utils/Colors';
import Icon from './Icon';


export default function Input({
                        iconSize=26, 
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

  const handleKeyboardSubmit = () => {
    if(Keyboard.isVisible())
      Keyboard.dismiss();

    onEnter(value);
  }
  
  return (
    <View style={[styles.wrap, style]}>
      {renderIcon()}

      <TextInput style={[styles.input, inputStyle]} 
          placeholderTextColor={Colors.darkerGray}
          placeholder={placeholder}
          value={value} 
          keyboardType={keyboardType}
          onSubmitEditing={handleKeyboardSubmit}
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
    width:screen.width * 0.8,
    paddingHorizontal:10,
    backgroundColor:Colors.white,
    borderRadius:10,
    marginBottom:10,
    borderWidth:1,
    borderColor:Colors.black
  },
  input:{
    borderRadius:10,
    marginVertical: 5,
    minHeight:screen.height * 0.05,
    paddingHorizontal:10,
    fontFamily:'MartelSans-Regular',
    color:Colors.black,
    fontSize:18,
    width:screen.width * 0.8,
  },
});