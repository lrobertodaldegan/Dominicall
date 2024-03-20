import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions
} from 'react-native';
import CheckListItem from './CheckListItem';
import IconLabel from './IconLabel';
import Label from './Label';
import { Colors } from '../utils/Colors';
import { faBible, faCheckSquare, faCoins } from '@fortawesome/free-solid-svg-icons';
import { Screen } from 'react-native-screens';

export default function StudentListItem({item, onOfferPress=(item)=>null}) {
  const [bible, setBible] = useState(false);
  const [book, setBook] = useState(false);

  const handleBiblePress = () => {
    //todo
    
    setBible(!bible);
  }

  const handleBookPress = () => {
    //todo
    
    setBook(!book);
  }

  const handleSelection = () => {
    //todo
  }

  return (
    <CheckListItem 
      title={item?.name}
      checklistLbl='Ausente'
      checklistSelectedLbl='Presente'
      onSelect={handleSelection}
      leftComponent={
        <Label value={`${item?.presence} presença(s)`}
            style={styles.lbl}/>
      }
      rightComponent={
        <Label value={`${item?.ausence} ausência(s)`}
            style={styles.lbl}/>
      }
      bottomComponent={
        <View style={styles.botWrap}>
          <IconLabel
            icon={faCheckSquare}
            label='Bíblia'
            style={styles.botOpt}
            lblStyle={bible === true ? styles.botLblS : styles.botLbl}
            iconStyle={bible === true ? styles.botLblS : styles.botIco}
            onPress={handleBiblePress}
          />

          <IconLabel
            icon={faBible}
            label='Revista'
            style={styles.botOpt}
            lblStyle={book === true ? styles.botLblS : styles.botLbl}
            iconStyle={book === true ? styles.botLblS : styles.botIco}
            onPress={handleBookPress}
          />

          <IconLabel
            icon={faCoins}
            label='Oferta'
            style={styles.botOpt}
            lblStyle={styles.botLblS}
            iconStyle={styles.botIcoS}
            onPress={onOfferPress}
          />
        </View>
      }
    />
  );
}

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
  lbl:{
    color:Colors.black,
    fontSize:14
  },
  botWrap:{
    flexDirection:'row',
    marginTop:10,
  },
  botOpt:{
    marginRight:screen.width * 0.2
  },
  botLbl:{
    color:Colors.darkerGray
  },
  botLblS:{
    color:Colors.black
  },
  botIco:{
    color:Colors.gray
  },
});