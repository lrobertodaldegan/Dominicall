import React, {useState} from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Colors } from "../utils/Colors";
import Icon from "./Icon";
import Label from "./Label";
import Link from "./Link";

export default function ListItem({
                                title=' ',
                                leftComponent=<></>,
                                rightComponent=<></>,
                                bottomComponent=<></>,
                                showRemove=true,
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

  const renderTrash = () => {
    if(showRemove === true){
      return (
        <TouchableHighlight style={styles.rmBtn}
            underlayColor={Colors.white}
            onPress={() => setShowConfirm(true)}>
          <Icon icon={faTrash} style={{color:Colors.black}}/>
        </TouchableHighlight>
      );
    }

    return <></>
  }
                              
  return (
    <TouchableHighlight style={styles.wrap}
        underlayColor={Colors.white}
        onPress={onPress}>
      <>
        {renderConfirmation()}
        
        <View style={styles.left}>
          <Label value={title && title !== null ? title[0] : ''} 
            style={styles.titleLeft}/>
        </View>
        <View style={styles.componentsWrap}>
          <View style={styles.titleWrap}>
            <Label value={title && title !== null ? title : ''} 
              style={styles.title}/>

            {renderTrash()}
          </View>

          <View style={styles.components}>
            <View style={styles.compsItem}>
              {leftComponent}
            </View>
            
            <View style={styles.compsItem}>
              {rightComponent}
            </View>
          </View>

          <View style={styles.components}>
            <View style={styles.bottomCompWrap}>
              {bottomComponent}
            </View>
          </View>
        </View>
      </>
    </TouchableHighlight>
  );
}

const screen = Dimensions.get('screen');

const widthComps = ((screen.width - 20) - ((screen.height * 0.12) * 0.5)) * 0.45;

const styles = StyleSheet.create({
  wrap:{
    flexDirection:'row',
    alignItems:'center',
    width:screen.width - 20,
    minHeight:screen.height * 0.12,
    paddingVertical:10,
    backgroundColor:Colors.white,
    borderRadius:10,
    marginBottom:10,
    borderBottomWidth:1,
    borderBottomColor:Colors.aWhite
  },
  titleLeft:{
    color:Colors.white,
    fontSize:24
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
    fontSize:20,
    fontFamily:'MartelSans-Bold',
  },
  titleWrap:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    width:screen.width * 0.66
  },
  components:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginTop:5,
  },
  compsItem:{
    width: widthComps,
  },
  bottomCompWrap:{
    width: (screen.width - 20) - ((screen.height * 0.12) * 0.5)
  },
  confirmation:{
    position:'absolute',
    width:screen.width,
    height:screen.height * 0.1,
    backgroundColor:Colors.red,
    justifyContent:'center',
    zIndex:7
  },
  dltTitle:{
    color:Colors.white,
    fontSize:20,
    fontFamily:'MartelSans-Bold',
    textAlign:'center'
  },
  confActions:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
  dltLink:{
    color:Colors.black,
    fontSize:14,
    textAlign:'center',
    marginRight:20,
    fontFamily:'MartelSans-Bold',
  },
  cnclLink:{
    color:Colors.white,
    fontSize:14,
    textAlign:'center'
  },
});