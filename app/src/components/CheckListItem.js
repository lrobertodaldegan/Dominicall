import React, {useState} from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import { Colors } from "../utils/Colors";
import Label from "./Label";
import IconLabel from "./IconLabel";
import Icon from "./Icon";
import { faCheckSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import Link from "./Link";

export default function CheckListItem({
                                title='',
                                selected=false,
                                checklistLbl='Selecionar',
                                checklistSelectedLbl='Selecionado',
                                leftComponent=<></>,
                                rightComponent=<></>,
                                bottomComponent=<></>,
                                removable=true,
                                onSelect=()=>null,
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

  const renderRmoveBtn = () => {
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
        <IconLabel label={selected === true ? checklistSelectedLbl : checklistLbl}
            iconStyle={selected === true ? styles.slctd : styles.nSlctd}
            icon={faCheckSquare}
            onPress={onSelect}/>
      </View>

      <View style={styles.componentsWrap}>
        <View style={styles.titleWrap}>
          <Label value={title} style={styles.title}/>

          {renderRmoveBtn()}
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
    </View>
  );
}

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
  wrap:{
    flexDirection:'row',
    alignItems:'center',
    width:screen.width * 0.99,
    minHeight:screen.height * 0.12,
    backgroundColor:Colors.white,
    marginBottom:20,
    paddingVertical:10,
    borderBottomWidth:1,
    borderBottomColor:Colors.aWhite
  },
  titleLeft:{
    color:Colors.white,
    fontSize:26
  },
  left:{
    justifyContent:'center',
    alignItems:'center',
    width:screen.width * 0.20,
    height:screen.width * 0.15,
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
  components:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginTop:5,
  },
  compsItem:{
    width:screen.width * 0.20,
  },
  slctd:{
    color:Colors.black
  },
  nSlctd:{
    color:Colors.lightGray
  },
  confirmation:{
    position:'absolute',
    width:screen.width,
    height:screen.height * 0.15,
    backgroundColor:Colors.white,
    zIndex:7,
    justifyContent:'center',
    backgroundColor:Colors.red,
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