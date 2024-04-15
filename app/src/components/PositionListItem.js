import React, {useState} from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import { faArrowDown, faArrowUp, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Colors } from "../utils/Colors";
import Icon from "./Icon";
import Label from "./Label";
import Link from "./Link";

export default function PositionListItem({
                                title=' ',
                                subtitle='',
                                removable=true,
                                onUp=()=>null,
                                onDown=()=>null,
                                onRemove=()=>null,
                              }) {
  const [showConfirm, setShowConfirm] = useState(false);

  const renderConfirmation = () => {
    if(showConfirm === true){
      return (
        <View style={styles.confirmation}>
          <Label value={'Isso não pode ser desfeito!'} 
              style={styles.dltTitle}/>

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

  const renderRemoveBtn = () => {
    if(removable === true){
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
    <View style={styles.wrap}>

      {renderConfirmation()}

      <View style={styles.left}>
        <Label value={title[0]} style={styles.titleLeft}/>
      </View>
      <View style={styles.componentsWrap}>
        <View style={styles.titleWrap}>
          <Label value={title} style={styles.title}/>

          {renderRemoveBtn()}
        </View>

        <View style={styles.components}>
          <View style={styles.compsItem}>
            <Label value={subtitle} style={styles.subtitle}/>
          </View>
          <View style={styles.arrowWrap}>
            <TouchableHighlight underlayColor={'transparent'}
                style={styles.btn}
                onPress={onUp}>
              <Icon icon={faArrowUp} />
            </TouchableHighlight>
          
            <TouchableHighlight underlayColor={'transparent'}
                style={styles.btn}
                onPress={onDown}>
              <Icon icon={faArrowDown} />
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </View>
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
    marginBottom:10,
    borderBottomWidth:1,
    borderBottomColor:Colors.aWhite
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
  titleWrap:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    width:screen.width * 0.66
  },
  subtitle:{
    color:Colors.black,
    fontSize:14
  },
  components:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginTop:10,
  },
  compsItem:{
    width: (screen.width - ((screen.height * 0.12) * 0.5)) * 0.4
  },
  arrowWrap:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
  btn:{
    marginTop: 10,
    marginLeft:screen.width * 0.05
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
    color:Colors.black,
    fontSize:16,
    textAlign:'center',
    marginRight:20,
    fontFamily:'MartelSans-Bold',
  },
  cnclLink:{
    color:Colors.white,
    fontSize:16,
    textAlign:'center'
  },
});