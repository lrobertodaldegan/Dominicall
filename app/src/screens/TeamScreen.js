import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
  FlatList,
  ToastAndroid,
  RefreshControl,
} from 'react-native';
import fundo from '../assets/img/fundo.png';
import By from '../components/By';
import Header from '../components/Header';
import NewListItem from '../components/NewListItem';
import ListItem from '../components/ListItem';
import Label from '../components/Label';
import MemberModal from '../components/MemberModal';
import { Colors } from '../utils/Colors';
import { get, del } from '../service/Rest/RestService';
import { Texts } from '../utils/Texts';
import CacheService from '../service/Cache/CacheService';
import { BannerAd,BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
const adUnitId = __DEV__ ? TestIds.BANNER : Texts.Ads.bannerBot;
// import LicenseWarnModal from '../components/LicenseWarnModal';

const TeamScreen = ({navigation}) => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState(false);

  useEffect(() => {
    search();
  }, []);

  const search = () => {
    setLoading(true);

    get(Texts.API.member).then(response => {
      if(response.status === 200){
        setMembers(response.data.members);
      } else {
        if(response.data && response.data.message)
          ToastAndroid.show(response.data.message, ToastAndroid.BOTTOM);

        if(response.status === 403){
          CacheService.wipe(Texts.Cache.user);
          
          navigation.navigate('login');
        } else {
          if(response.status === 204)
            setMembers([]);
        }
      }

      setLoading(false);
    });
  }

  const handleRemove = (item) => {
    del(`${Texts.API.member}/${item._id}`).then(response => {
      search();
    });
  }

  const renderModal = () => {
    if(showModal === true){
      return <MemberModal onClose={() => {search(); setShowModal(false);}}/>
    }

    return <></>
  }

  return (
    <ImageBackground source={fundo} resizeMode='repeat' style={styles.wrap}>
      {/* <LicenseWarnModal navigation={navigation}/> */}

      <Header page={'team'} navigation={navigation}/>

      {renderModal()}

      <FlatList 
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps='always'
        contentContainerStyle={styles.list}
        data={members}
        refreshControl={
          <RefreshControl refreshing={loading}
            onRefresh={search}
          />
        }
        ListHeaderComponent={
          <NewListItem title="Novo membro"
            onPress={() => setShowModal(true)}/>
        }
        keyExtractor={(item) => item._id}
        renderItem={({item}) => 
          <ListItem onRemove={() => handleRemove(item)}
            title={item.name}
            leftComponent={
              <Label value={`${item.role}`}
                  style={styles.lbl}/>
            }
            rightComponent={
              <Label value={`(${item.username})`}
                  style={styles.lblUser}/>
            }
          />
        }
        ListFooterComponent={
          <View style={styles.listFoot}>
            <BannerAd
              unitId={adUnitId}
              size={BannerAdSize.MEDIUM_RECTANGLE}
              requestOptions={{requestNonPersonalizedAdsOnly: false,}}
            />
          </View>
        }
      />

      <By />
    </ImageBackground>
  );
}

const screen = Dimensions.get('screen');

const styles= StyleSheet.create({
  wrap:{
    height:screen.height,
    width:screen.width,
    backgroundColor:Colors.white,
    padding:10,
    alignItems:'center'
  },
  list:{
    marginVertical:20
  },
  lbl:{
    color:Colors.gray
  },
  lblUser:{
    fontSize: 14,
    color:Colors.gray
  },
  listFoot:{
    alignItems:'center',
    marginBottom: 200
  },
});

export default TeamScreen;