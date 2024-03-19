import React,{useState} from "react";
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
                                checklistLbl='Selecionar',
                                checklistSelectedLbl='Selecionado',
                                leftComponent=<></>,
                                rightComponent=<></>,
                                onSelect=()=>null,
                                onRemove=()=>null,
                              }) {
  const [selected, setSelected] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSelection = () => {
    setSelected(!selected);

    onSelect(title);
  }

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
    <View style={styles.wrap}>
      {renderConfirmation()}

      <View style={styles.left}>
        <IconLabel label={selected === true ? checklistSelectedLbl : checklistLbl}
            iconStyle={selected === true ? styles.slctd : styles.nSlctd}
            icon={faCheckSquare}
            onPress={handleSelection}/>
      </View>

      <View style={styles.componentsWrap}>
        <View style={styles.titleWrap}>
          <Label value={title} style={styles.title}/>

          <TouchableHighlight style={styles.rmBtn}
              underlayColor={Colors.white}
              onPress={() => setShowConfirm(true)}>
            <Icon icon={faTrash} style={{color:Colors.black}}/>
          </TouchableHighlight>
        </View>

        <View style={styles.components}>
          <View style={styles.compsItem}>
            {leftComponent}
          </View>
          
          <View style={styles.compsItem}>
            {rightComponent}
          </View>
        </View>
      </View>
    </View>
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
    justifyContent:'center',
    alignItems:'center',
    width:(screen.height * 0.12) * 0.5,
    height:(screen.height * 0.12) * 0.5,
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
  components:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginTop:5,
  },
  compsItem:{
    width: widthComps
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