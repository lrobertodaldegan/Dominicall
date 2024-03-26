import React, {useEffect, useState} from 'react';
import { 
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  FlatList,
  Linking,
} from "react-native";
import Logo from "./Logo";
import {  faUsers, faChalkboard, faPeopleGroup, faNewspaper, faStar, faBoxOpen } from '@fortawesome/free-solid-svg-icons'
import IconLabel from './IconLabel';
import { Colors } from '../utils/Colors';
import Label from './Label';
import { Texts } from '../utils/Texts';
import CacheService from '../service/Cache/CacheService';

const OPTIONS = [
  {id:0, label:'Turmas', page:'home', icon:faChalkboard},
  {id:1, label:'Equipe', page:'team', icon:faPeopleGroup},
  {id:2, label:'Relatórios', page:'reports', icon:faNewspaper},
  {id:3, label:'Avalie o app', link: Texts.Avalie, icon:faStar},
  {id:4, label:'Outros apps', link: Texts.GooglePlay, icon:faBoxOpen},
];

const Header = ({navigation, page='home', group}) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    CacheService.get('@user').then(u => setUser(u.name))
  }, []);

  return (
    <>
      <StatusBar translucent backgroundColor={Colors.white} 
          barStyle='dark-content'/>

      <View style={styles.wrap} elevation={2}>
        <View style={styles.header}>
          <Logo />

          <View style={styles.titleWrap}>
            <Label value={group?.name} style={styles.title}/>
            <Label value={user} style={styles.user}/>
          </View>
          
          <IconLabel icon={faUsers} label='Meus grupos'
              onPress={() => navigation.navigate('group')}/>
        </View>

        <FlatList 
          keyboardDismissMode='on-drag'
          keyboardShouldPersistTaps='always'
          contentContainerStyle={styles.list}
          horizontal
          data={OPTIONS}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => 
            <IconLabel icon={item.icon} 
              iconSize={26}
              label={item.label}
              lblStyle={styles.menuOpts}
              style={styles.menuOptsWrap}
              selected={page === item.page}
              onPress={async () => {
                if(item?.page && item?.page !== null)
                  navigation.navigate(item?.page, {group:group});
                else
                  await Linking.openURL(item?.link);
              }}
            />
          }
        />
      </View>
    </>
  );
}

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
  wrap:{
    alignItems:'center',
    backgroundColor:Colors.white,
    paddingTop:screen.height * 0.04,
    paddingHorizontal:10,
    borderBottomLeftRadius:20,
    borderBottomRightRadius:20,
    height: screen.height * 0.25,
  },
  header:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    width:screen.width - 20,
    
  },
  title:{
    color:Colors.black,
    fontSize:24,
    fontFamily:'MartelSans-Bold'
  },
  user:{
    color:Colors.black,
    textAlign:'center'
  },
  list:{
    alignItems:"center"
  },
  menuOpts:{
    fontSize:18,
    textAlign:'center'
  },
  menuOptsWrap:{
    minWidth:(screen.width * 0.33) * 0.5,
    marginHorizontal:(screen.width * 0.33) * 0.25,
  },
});

export default Header;