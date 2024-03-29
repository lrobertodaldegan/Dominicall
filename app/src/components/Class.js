import React, {useState, useEffect} from 'react';
import { 
  faCalendarDays, 
  faChalkboard, 
  faChild, 
  faCoins, 
  faGraduationCap, 
  faPersonChalkboard 
} from '@fortawesome/free-solid-svg-icons';
import {
  StyleSheet,
  Dimensions,
  View,
  FlatList,
  RefreshControl,
  ToastAndroid,
} from 'react-native';
import { Colors } from '../utils/Colors';
import { Days } from '../utils/Days';
import Input from './Input';
import Label from './Label';
import Link from './Link';
import Button from './Button';
import IconLabel from './IconLabel';
import NewListItem from './NewListItem';
import NumberListItem from './NumberListItem';
import ListItem from './ListItem';
import StudentModal from './StudentModal';
import OfferModal from './OfferModal';
import TeacherModal from './TeacherModal';
import PositionListItem from './PositionListItem';
import EventModal from './EventModal';
import VisitModal from './VisitModal';
import StudentListItem from './StudentListItem';
import { del, get } from '../service/Rest/RestService';
import { Texts } from '../utils/Texts';

const ALUNOS = [
  {id:0, name:'Lucas Roberto', presence:10, ausence:5},
  {id:1, name:'Lucas Roberto', presence:10, ausence:5},
  {id:2, name:'Lucas Roberto', presence:10, ausence:5},
  {id:3, name:'Jéssica Sabrina', presence:10, ausence:5},
  {id:4, name:'Luiz Carlos', presence:10, ausence:5},
];

const PROFS = [
  {id:0, name:'Lucas Roberto', level:'Professor'},
  {id:2, name:'Lucas Roberto', level:'Coordenador'},
];

const OFFERS = [
  {id:0, dt:'19/03/2024', value:10, offerer:'Aluno'},
  {id:1, dt:'19/03/2024', value:5, offerer:'Aluno'}
];

const EVENTS = [
  {id:0, dt:'19/03/2024', title:'Encerramento\ndo trimeste', teacher:'Lucas Roberto'},
  {id:1, dt:'19/03/2024', title:'Evento', teacher:'Carlos'}
];

const CLASS_OPTIONS = [
  {
    id:'opt1', 
    icon:faGraduationCap,
    title:'Alunos',
    page:'students'
  },
  {
    id:'opt2', 
    icon:faChild,
    title:'Visitas',
    page:'visits'
  },
  {
    id:'opt3', 
    icon:faCoins,
    title:'Ofertas',
    page:'offers'
  },
  {
    id:'opt4', 
    icon:faPersonChalkboard,
    title:'Professores',
    page:'teachers'
  },
  {
    id:'opt5', 
    icon:faCalendarDays,
    title:'Escalas',
    page:'calendar'
  },
];

const CLASS_ORDER = [
  {id:0, teacher:'Lucas Roberto',position:1},
  {id:1, teacher:'Gessé',position:2},
  {id:2, teacher:'Carlos',position:3},
  {id:3, teacher:'Elecy',position:4},
];

export default function Class({
                          navigation,
                          item, 
                          onGoBack=()=>null, 
                          onNameChange=(newName)=>null
                        }) {

  const [name, setName] = useState(null);
  const [page, setPage] = useState(null);
  const [showSave, setShowSave] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [offering, setOffering] = useState(null);
  const [loading, setLoading] = useState(false);
  const [calendarList, setCalendarList] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    setName(item?.name);
    setShowSave(false);
    setPage('students');
  },[]);

  useEffect(() => {
    setList([]);

    loadPageList();
  }, [page]);

  const loadPageList = () => {
    if(page === 'students')
      loadStudentsList();

    if(page === 'teachers')
      loadTeachersList();

    if(page === 'offers')
      loadOffersList();

    if(page === 'calendar')
      loadCalendarList();

    if(page === 'visits')
      loadVisitorsList();
  }

  const loadPageListAux = (url, onSuccess=(r)=>null) => {
    setLoading(true);

    get(getURLWithClassIdAndDateQuery(url))
    .then(response => {
      if(response.status === 200){
        onSuccess(response);
      } else {
        if(response.status !== 204){
          if(response.data && response.data.message)
            ToastAndroid.show(response.data.message, ToastAndroid.BOTTOM);
        }
      }

      setLoading(false);
    });
  }

  const getURLWithClassIdAndDateQuery = (prefix) => {
    return `${prefix}?classId=${item._id}&dt=${Days.label()}`; 
  }

  const loadVisitorsList = () => {
    loadPageListAux(Texts.API.visitors, (response) => {
      setList(response.data.visitors);
    });
  }

  const loadStudentsList = () => {
    loadPageListAux(Texts.API.visitors, (response) => {
      setList(response.data.students);
    });
  }

  const loadOffersList = () => {
    loadPageListAux(Texts.API.offers, (response) => {
      setList(response.data.offers);
    });
  }

  const loadTeachersList = () => {
    loadPageListAux(Texts.API.teachers, (response) => {
      setList(response.data.teachers);
    });
  }

  const loadCalendarList = () => {
    setCalendarList(CLASS_ORDER);
  }

  const handleNameChanging = (v) => {
    setName(v);
    setShowSave(v !== item?.name);
  }

  const handleSubmitNameChanging = () => {
    onNameChange(name);
  }

  const sendRemove = (url) => {
    del(url).then(response => {
      if(response.data && response.data.message)
        ToastAndroid.show(response.data.message, ToastAndroid.BOTTOM);
      
      if(response.status === 200){
        setList([]);

        loadPageList();
      }
    });
  }

  const handleRemove = (item) => {
    let url = null;

    if(page === 'students')
      url = Texts.API.students;

    if(page === 'teachers')
      url = Texts.API.teachers;

    if(page === 'offers')
      url = Texts.API.offers;

    if(page === 'calendar')
      url = Texts.API.events;

    if(page === 'visits')
      url = Texts.API.visitors;

    if(url !== null)
      sendRemove(`${url}/${item._id}`);
  }

  const renderSave = () => {
    if(showSave === true){
      return (
        <Button label={'Salvar'}/>
      );
    }

    return <></>
  }

  const getListItem = (item) => {
    if(page === 'students'){
      return (
        <StudentListItem item={item}
          onRemove={() => handleRemove(item)}
          onOfferPress={() => setOffering(item)}
        />
      )
    }

    if(page === 'teachers'){
      return (
        <ListItem title={item.name}
          onRemove={() => handleRemove(item)}
          leftComponent={
            <Label value={item.role} style={styles.lbl}/>
          }
        />
      )
    }

    if(page === 'offers'){
      return (
        <NumberListItem subtitle={item.offerer ? item.offerer : ''} 
          number={item.value} 
          onRemove={() => handleRemove(item)}/>
      );
    }

    if(page === 'visits'){
      return (
        <ListItem title={item.name} 
          onRemove={() => handleRemove(item)}/>
      )
    }

    if(page === 'calendar'){
      return (
        <ListItem title={item.teacher}
          onRemove={() => handleRemove(item)}
          leftComponent={
            <Label value={`${item.title}`} style={styles.lbl}/>
          }
          midleComponent={
            <Label value={`Data:\n${item.dt}`} style={styles.lbl}/>
          }
        />
      )
    }

    return <></>
  }

  const getFirstListItem = () => {
    let title = '';

    if(page === 'students')
      title = 'Novo aluno';

    if(page === 'teachers')
      title = 'Novo professor';

    if(page === 'offers')
      title = 'Lançar oferta';

    if(page === 'calendar')
      title = 'Novo evento';

    if(page === 'visits')
      title = 'Nova visita';
    
    return (
      <NewListItem title={title} 
          onPress={() => setShowModal(true)}/>
    )
  }

  const getLastListItem = () => {
    let c = [];

    if(page === 'offers'){
      let total = 0;

      list.map(o => total+=o.value);
      
      c.push(
        <NumberListItem key={total} 
          subtitle='Total da classe ' 
          number={total}
          showRemove={false}
        />
      );
    }

    c.push(<View key={'foot'} style={styles.foot}/>);

    return <>{c}</>
  }

  const getCalendarList = () => {
    if(page === 'calendar')
      return calendarList;

    return [];
  }

  const handlePositionChange = (item, movement) => {
    let list = [...calendarList];

    let newPos = new Number(item.position) + new Number(movement);
    
    if(newPos > 0 && newPos <= list.length){
      for(let i=0; i < list.length; i++){
        let ii = list[i];

        if(ii.position === newPos){
          if(movement > 0)
            ii.position = ii.position - 1;//down
      
          if(movement < 0)
            ii.position = ii.position + 1;//up
        }

        if(ii.id === item.id)
          ii.position = newPos;
      }
    }
    
    setCalendarList(list.sort((a, b) => a.position < b.position ? -1 : 1));
  }

  const handleModalClose = () => {
    loadPageList();
    setShowModal(false);
  }

  const renderModal = () => {
    if(showModal === true){
      if(page === 'students')
        return <StudentModal classs={item} onClose={handleModalClose}/>

      if(page === 'offers')
        return <OfferModal classs={item} onClose={handleModalClose}/>

      if(page === 'teachers')
        return <TeacherModal navigation={navigation} 
                  classs={item} onClose={handleModalClose}/>

      if(page === 'calendar')
        return <EventModal classs={item} onClose={handleModalClose}/>

      if(page === 'visits')
        return <VisitModal classs={item} onClose={handleModalClose}/>
    }

    if(offering && offering !== null){
      return (
        <OfferModal offerer={offering} onClose={() => {
          setOffering(null);
        }}/>
      );
    }

    return <></>
  }

  const renderClassHeader = () => {
    return (
      <>
        <Link onPress={onGoBack} label={'< Voltar'}/>

        <View style={styles.header}>
          <Label value={Days.label()} style={styles.dt}/>

          <Input placeholder={item.name} 
              value={name}
              onChange={handleNameChanging}
              onEnter={handleSubmitNameChanging}
              ico={faChalkboard}
              style={styles.inputWrap}
              inputStyle={styles.input}
          />

          {renderSave()}

          <FlatList 
            keyboardDismissMode='on-drag'
            keyboardShouldPersistTaps='always'
            horizontal
            data={CLASS_OPTIONS}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => 
              <IconLabel icon={item.icon} 
                label={item.title}
                style={styles.opts}
                lblStyle={styles.opt}
                selected={page === item.page}
                onPress={() => setPage(item.page)}
              />
            }
          />
        </View>

        {getFirstListItem()}
      </>
    );
  }

  return (
    <>
      {renderModal()}

      <FlatList 
        contentContainerStyle={styles.wrap}
        keyboardDismissMode='on-drag'
        keyboardShouldPersistTaps='always'
        refreshControl={
          <RefreshControl refreshing={loading}
            onRefresh={loadPageList}/>
        }
        ListHeaderComponent={
          <FlatList 
            contentContainerStyle={styles.wrap}
            keyboardDismissMode='on-drag'
            keyboardShouldPersistTaps='always'
            ListHeaderComponent={renderClassHeader()}
            data={list}
            keyExtractor={(item) => item._id}
            renderItem={({item}) => getListItem(item)}
          />
        }
        data={getCalendarList()}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => 
          <PositionListItem title={item.teacher}
            subtitle={`Aula ${item.position}`}
            onDown={() => handlePositionChange(item, 1)}
            onUp={() => handlePositionChange(item, -1)}
          />
        }
        ListFooterComponent={() => getLastListItem()}
      />
    </>
  );
}

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
  wrap:{
    backgroundColor:Colors.white,
    marginTop:20,
    width:screen.width - 10,
    borderRadius:20,
    padding:5,
  },
  header:{
    alignItems:'center',
  },
  dt:{
    color:Colors.black,
    fontSize:12
  },
  inputWrap:{
    minWidth:screen.width * 0.5,
    maxWidth:screen.width - 40,
  },
  input:{
    textAlign:'center',
    minWidth:((screen.width - 40) * 0.5) * 0.9,
    maxWidth:(screen.width - 40) * 0.8,
  },
  opt:{
    fontSize:14
  },
  opts:{
    marginHorizontal:25
  },
  lbl:{
    color:Colors.black,
    fontSize:14
  },
  foot:{
    height:screen.height * 0.2
  },
});