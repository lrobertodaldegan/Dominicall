import { faPlus } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import { Colors } from "../utils/Colors";
import Icon from "./Icon";
import Label from "./Label";

export default function NewListItem({
                                title='',
                                onPress=()=>null
                              }) {
  return (
    <TouchableHighlight style={styles.wrap}
        underlayColor={Colors.white}
        onPress={onPress}>
      <>
        <View style={styles.left}>
          <Icon icon={faPlus} size={26}/>
        </View>
        <View style={styles.componentsWrap}>
          <Label value={title} style={styles.title}/>
        </View>
      </>
    </TouchableHighlight>
  );
}

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
  wrap:{
    flexDirection:'row',
    alignItems:'center',
    width:screen.width - 20,
    height:screen.height * 0.12,
    backgroundColor:Colors.white,
    borderRadius:10,
    marginBottom:10
  },
  left:{
    justifyContent:'center',
    alignItems:'center',
    width:(screen.height * 0.12) * 0.5,
    marginRight:20
  },
  title:{
    color:Colors.black,
    fontSize:24,
    fontFamily:'MartelSans-Bold'
  },
});