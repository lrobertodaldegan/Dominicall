import React,{useState} from "react";
import {
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import { Colors } from "../utils/Colors";
import Label from "./Label";
import IconLabel from "./IconLabel";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";

export default function CheckListItem({
                                title='',
                                checklistLbl='Selecionar',
                                checklistSelectedLbl='Selecionado',
                                leftComponent=<></>,
                                rightComponent=<></>,
                                onSelect=()=>null
                              }) {
  const [selected, setSelected] = useState(false);

  const handleSelection = () => {
    setSelected(!selected);

    onSelect(title);
  }

  return (
    <View style={styles.wrap}>
      <View style={styles.left}>
        <IconLabel label={selected === true ? checklistSelectedLbl : checklistLbl}
            iconStyle={selected === true ? styles.slctd : styles.nSlctd}
            icon={faCheckSquare}
            onPress={handleSelection}/>
      </View>
      <View style={styles.componentsWrap}>
        <Label value={title} style={styles.title}/>

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
    marginRight:30
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
  slctd:{
    color:Colors.black
  },
  nSlctd:{
    color:Colors.lightGray
  }
});