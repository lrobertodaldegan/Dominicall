import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faDotCircle } from '@fortawesome/free-solid-svg-icons'
import Link from './Link';
import { Colors } from '../utils/Colors';

const IconOption = ({
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
    <View style={[styles.wrap, style]}>
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
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
  icon:{
    fontSize:16,
    color:Colors.gray,
    marginRight: 10,
  },
  iconS:{
    color:Colors.black
  },
  link:{
    fontSize:12,
    marginTop:0,
    color:Colors.gray,
  },
  linkS:{
    color:Colors.black,
  },
});

export default IconOption;