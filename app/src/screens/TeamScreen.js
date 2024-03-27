import react, {useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ImageBackground,
  FlatList,
} from 'react-native';
import fundo from '../assets/img/fundo.png';
import By from '../components/By';
import Header from '../components/Header';
import NewListItem from '../components/NewListItem';
import ListItem from '../components/ListItem';
import Label from '../components/Label';
import MemberModal from '../components/MemberModal';
import { Colors } from '../utils/Colors';

const MEMBERS = [
  {id:0, name:'Lucas Roberto', level:'Professor'},
  {id:1, name:'Ismael', level:'Coordenador'},
  {id:2, name:'Lucas', level:'Secretário'},
  {id:3, name:'Arlam', level:'Coordenador'},
];

const TeamScreen = ({navigation}) => {
  const [showModal, setShowModal] = useState(false);

  const handleRemove = (item) => {
    //todo
  }

  const renderModal = () => {
    if(showModal === true){
      return <MemberModal onClose={() => setShowModal(false)}/>
    }

    return <></>
  }

  return (
    <ImageBackground source={fundo} resizeMode='repeat' style={styles.wrap}>
      <Header page={'team'} navigation={navigation}/>

      {renderModal()}

      <FlatList 
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps='always'
        contentContainerStyle={styles.list}
        keyExtractor={(item) => item.id}
        data={MEMBERS}
        ListHeaderComponent={
          <NewListItem title="Novo membro"
            onPress={() => setShowModal(true)}/>
        }
        renderItem={({item}) => 
          <ListItem onRemove={() => handleRemove(item)}
            title={item.name}
            leftComponent={
              <Label value={`${item.level}`}
                  style={styles.lbl}/>
            }
          />
        }
        ListFooterComponent={
          <View style={styles.listFoot}/>
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
  listFoot:{
    height:200
  },
});

export default TeamScreen;