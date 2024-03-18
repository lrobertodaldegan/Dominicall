import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import { Colors } from "../utils/Colors";
import Label from "./Label";

export default function ListItem({
                                title=' ',
                                leftComponent=<></>,
                                midleComponent=<></>,
                                rightComponent=<></>,
                                onPress=()=>null
                              }) {
  return (
    <TouchableHighlight style={styles.wrap}
        underlayColor={Colors.white}
        onPress={onPress}>
      <>
        <View style={styles.left}>
          <Label value={title[0]} style={styles.titleLeft}/>
        </View>
        <View style={styles.componentsWrap}>
          <Label value={title} style={styles.title}/>

          <View style={styles.components}>
            <View style={styles.compsItem}>
              {leftComponent}
            </View>

            <View style={styles.compsItem}>
              {midleComponent}
            </View>
            
            <View style={styles.compsItem}>
              {rightComponent}
            </View>
          </View>
        </View>
      </>
    </TouchableHighlight>
  );
}

const screen = Dimensions.get('screen');

const widthComps = ((screen.width - 20) - ((screen.height * 0.12) * 0.5)) * 0.33;

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
  titleLeft:{
    color:Colors.white,
    fontSize:26
  },
  left:{
    borderRadius:(screen.height * 0.15) * 0.5,
    justifyContent:'center',
    alignItems:'center',
    width:(screen.height * 0.12) * 0.5,
    height:(screen.height * 0.12) * 0.5,
    backgroundColor:Colors.black,
    marginRight:20
  },
  title:{
    color:Colors.black,
    fontSize:22,
    fontFamily:'MartelSans-Bold'
  },
  components:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginTop:5,
  },
  compsItem:{
    width: widthComps
  },
});