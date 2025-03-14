import React, { useEffect, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
} from 'react-native';
import { Label } from './Label';

const Select = ({ 
                onSelect=()=>null, 
                options=[{label:"",value:""}], 
                initialVal=null, 
                legend="", 
                placeholder="Escolha uma opção"
              }) => {

  const [selectedOption, setSelectedOption] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setSelectedOption(options.find((i) => `${i.label}` === `${initialVal}`));
  }, []);

  const handleSelect = (option) => {
    setSelectedOption(option);
    onSelect(option.value);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.selectButton}
        onPress={() => setModalVisible(true)}
      >

        <Label value={selectedOption ? selectedOption.label : placeholder}
          style={styles.selectedLbl}/>
      </TouchableOpacity>

      <Label value={legend} style={styles.selectButtonText}/>

      <Modal visible={modalVisible} animationType="fade" transparent>
        <TouchableOpacity
          style={styles.modalBackground}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              ListHeaderComponent={
                <Label value={`${placeholder}:`} 
                  style={styles.modalPlaceholder}
                  />
              }
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => handleSelect(item)}
                >
                  <Label value={item.label} style={styles.optionText}/>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    paddingHorizontal:10
  },
  selectButton: {
    borderWidth: 1,
    borderColor: '#555',
    padding: 5,
    borderRadius: 5,
  },
  selectedLbl:{
    textAlign:'center',
  },
  selectButtonText: {
    fontSize: 12,
    textAlign:'center',
    marginTop:5
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fcfcfc',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxHeight: '90%'
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  optionText: {
    textAlign:'center',
  },
  modalPlaceholder:{
    textAlign:'center',
    marginBottom:10
  },
});

export default Select;