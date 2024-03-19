import React, {useState} from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import { Colors } from "../utils/Colors";
import Label from "./Label";
import Link from "./Link";
import Icon from "./Icon";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default function NumberListItem({
                                title='',
                                number=0,
                                onPress=()=>null,
                                onRemove=()=>null,
                              }) {
  
  const [showConfirm, setShowConfirm] = useState(false);

  const renderConfirmation = () => {
    if(showConfirm === true){
      return (
        <View style={styles.confirmation}>
          <Label value={'Isso não pode ser desfeito!'} style={styles.dltTitle}/>

          <View style={styles.confActions}>
            <Link label={'Quero remover mesmo'} 
                style={styles.dltLink}
                onPress={onRemove}
            />
            <Link label={'Cancelar'} 
                style={styles.cnclLink}
                onPress={() => setShowConfirm(false)}
            />
          </View>
        </View>
      );
    }
  }
                              
  return (
    <TouchableHighlight style={styles.wrap}
        underlayColor={Colors.white}
        onPress={onPress}>
      <>
        {renderConfirmation()}

        <View style={styles.left}>
          <Label value={'R$'} style={styles.titleLeft}/>
        </View>

        <View style={styles.componentsWrap}>
          <Label value={`${title}${number}`} style={styles.title}/>

          <TouchableHighlight style={styles.rmBtn}
                underlayColor={Colors.white}
                onPress={() => setShowConfirm(true)}>
              <Icon icon={faTrash} style={{color:Colors.black}}/>
            </TouchableHighlight>
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
  componentsWrap:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    width:screen.width * 0.65,
  },
  title:{
    color:Colors.black,
    fontSize:22,
    fontFamily:'MartelSans-Bold'
  },
  confirmation:{
    position:'absolute',
    width:screen.width,
    height:screen.height * 0.1,
    backgroundColor:Colors.white,
    zIndex:7
  },
  dltTitle:{
    color:Colors.red,
    fontSize:22,
    fontFamily:'MartelSans-Bold',
    textAlign:'center'
  },
  confActions:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
  dltLink:{
    color:Colors.red,
    fontSize:16,
    textAlign:'center',
    marginRight:20,
    fontFamily:'MartelSans-Bold',
  },
  cnclLink:{
    color:Colors.black,
    fontSize:16,
    textAlign:'center'
  },
});