import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ToastAndroid,
} from 'react-native';
import CheckListItem from './CheckListItem';
import IconLabel from './IconLabel';
import { Colors } from '../utils/Colors';
import { faBible, faBook, faCoins } from '@fortawesome/free-solid-svg-icons';
import { Texts } from '../utils/Texts';
import { post, put, del } from '../service/Rest/RestService';


export default function StudentListItem({
                                    item, 
                                    onOfferPress=(item)=>null,
                                  }) {
  const [changed, setChanged] = useState(false);
  const [presenceId, setPresenceId] = useState(item.presence?._id);
  const [selected, setSelected] = useState(false);
  const [bible, setBible] = useState(false);
  const [book, setBook] = useState(false);

  useEffect(() => {
    setChanged(false);

    if(item && item !== null){
      setSelected((item.presence && item.presence !== null) === true);
      setBook(item.presence?.book === true);
      setBible(item.presence?.bible === true);
    } else {
      setSelected(false);
      setBook(false);
      setBible(false);
    }
  }, []);

  useEffect(() => {
    if(changed === true){
      if(selected === false){
        setPresenceId(null);
        setBible(false);
        setBook(false);

        if(presenceId && presenceId !== null){
          del(`${Texts.API.presences}/${presenceId}`).then(response => {
            if(response.status !== 200 && response.data && response.data.message)
              ToastAndroid.show(response.data.message, ToastAndroid.BOTTOM);
          });
        }
      } else if(selected === true) {
        let body = {
          classId: item.clas,
          studentId: item._id,
          bible: bible,
          book: book
        };

        post(Texts.API.presences, body).then(response => {
          if(response.status === 201 && response.data && response.data.message)
            ToastAndroid.show(response.data.message, ToastAndroid.BOTTOM);

          setPresenceId(response.data._id);
        });
      }
    }
  }, [selected]);

  useEffect(() => {
    setChanged(true);

    if(selected === true) {
      let body = {bible: bible,book: book};
    
      if(presenceId && presenceId !== null){
        put(`${Texts.API.presences}/${presenceId}`, body).then(response => { 
          if(response.status !== 200 && response.data && response.data.message)
            ToastAndroid.show(response.data.message, ToastAndroid.BOTTOM);
        });
      }
    }

    if(selected === false && (bible === true || book == true))
      setSelected(true);
  }, [book, bible]);

  const handleBibleOrBookPress = (pressOn) => { 
    let bi = bible === true;
    let bo = book === true;
    
    if(pressOn === 'bible')
      bi = !bi;

    if(pressOn === 'book')
      bo = !bo;

    setBible(bi);
    setBook(bo);
  }

  return (
    <CheckListItem 
      title={item?.name}
      checklistLbl='Ausente'
      checklistSelectedLbl='Presente'
      selected={selected}
      onSelect={() => {setChanged(true); setSelected(!selected);}}
      removable={false}
      bottomComponent={
        <View style={styles.botWrap}>
          <IconLabel
            icon={faBible}
            label='Bíblia'
            style={styles.botOpt}
            lblStyle={bible === true ? styles.botLblS : styles.botLbl}
            iconStyle={bible === true ? styles.botLblS : styles.botIco}
            onPress={() => handleBibleOrBookPress('bible')}
          />

          <IconLabel
            icon={faBook}
            label='Revista'
            style={styles.botOpt}
            lblStyle={book === true ? styles.botLblS : styles.botLbl}
            iconStyle={book === true ? styles.botLblS : styles.botIco}
            onPress={() => handleBibleOrBookPress('book')}
          />

          <IconLabel
            icon={faCoins}
            label='Oferta'
            style={styles.botOpt}
            lblStyle={styles.botLblS}
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
    marginRight:screen.width * 0.1
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