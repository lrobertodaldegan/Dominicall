import react, {useState, useEffect} from 'react';
import { 
  View,
  StyleSheet,
  TouchableHighlight,
  Dimensions,
  Linking,
  TextInput,
  StatusBar
} from "react-native";
import Logo from "./Logo";
import Icon from "./Icon";
import { faCircleUser, faPlaceOfWorship, faLungs, faUsers, faChalkboard, faPeopleGroup, faNewspaper } from '@fortawesome/free-solid-svg-icons'
import Button from './Button';
import IconLabel from './IconLabel';
import { Colors } from '../utils/Colors';
import Label from './Label';

const Header = ({
                  navigation, 
                  title='',
                  page='classes'
                }) => {

  return (
    <>
      <StatusBar translucent backgroundColor={Colors.white} 
          barStyle='dark-content'/>

      <View style={styles.wrap} elevation={2}>
        <View style={styles.header}>
          <Logo />

          <Label value={title} style={styles.title}/>
          
          <IconLabel icon={faUsers} label='Meus grupos'
              onPress={() => navigation.navigate('groups')}/>
        </View>

        <View style={styles.menu}>
          <IconLabel icon={faChalkboard} label='Turmas'
              lblStyle={styles.menuOpts}
              style={styles.menuOptsWrap}
              selected={page === 'classes'}
              onPress={() => navigation.navigate('classes')}/>

          <IconLabel icon={faPeopleGroup} label='Equipe'
              lblStyle={styles.menuOpts}
              style={styles.menuOptsWrap}
              selected={page === 'team'}
              onPress={() => navigation.navigate('team')}/>

          <IconLabel icon={faNewspaper} label='Relatórios'
              lblStyle={styles.menuOpts}
              style={styles.menuOptsWrap}
              selected={page === 'reports'}
              onPress={() => navigation.navigate('reports')}/>
        </View>
      </View>
    </>
  );
}

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
  wrap:{
    alignItems:'center',
    backgroundColor:Colors.white,
    paddingTop:30,
    paddingHorizontal:10,
    borderBottomLeftRadius:20,
    borderBottomRightRadius:20,
  },
  header:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    width:screen.width - 20,
  },
  menu:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginVertical:20
  },
  menuOpts:{
    fontSize:14,
  },
  menuOptsWrap:{
    minWidth:(screen.width * 0.33) * 0.5,
    marginHorizontal:(screen.width * 0.33) * 0.25,
  },
  title:{
    color:Colors.black,
    fontSize:24
  },
});

export default Header;