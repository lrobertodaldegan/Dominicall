import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faDotCircle } from '@fortawesome/free-solid-svg-icons'
import Link from './Link';
import { Colors } from '../utils/Colors';

const IconLabel = ({
                iconSize=22, 
                icon=faDotCircle, 
                iconStyle={},
                lblStyle={}, 
                style={},
                label='',
                selected=false,
                onPress=()=>null
              }) => {
  return (
    <View style={[styles.wrap, style, selected === true ? styles.wrapS : {}]}>
      <FontAwesomeIcon size={iconSize} 
          style={[styles.icon, iconStyle, selected === true ? styles.iconS : {}]} 
          icon={icon} />

      <Link label={label} onPress={onPress} 
          style={[styles.link, lblStyle, selected === true ? styles.linkS : {}]}/>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap:{
    alignItems:'center',
  },
  wrapS:{
    backgroundColor:Colors.black,
    borderRadius:10,
    padding:10
  },
  icon:{
    fontSize:16,
    color:Colors.black,
  },
  iconS:{
    color:Colors.white
  },
  link:{
    fontSize:12,
    marginTop:0
  },
  linkS:{
    color:Colors.white,
    fontFamily:'MartelSans-Bold'
  },
});

export default IconLabel;