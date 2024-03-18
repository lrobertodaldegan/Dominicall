import {
  TouchableHighlight,
  StyleSheet,
} from 'react-native';
import { Colors } from '../utils/Colors';
import Label from './Label';

const Link = ({label, style={}, onPress=()=>null}) => {
  return (
    <TouchableHighlight underlayColor='rgba(0,0,0,0)'
        onPress={() => onPress()}>

      <Label value={label} style={[styles.lbl, style]}/>

    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  lbl:{
    color: Colors.black,
    fontSize: 14,
    marginTop:10
  }
});

export default Link;