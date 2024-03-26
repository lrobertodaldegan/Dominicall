import {
  TouchableHighlight,
  StyleSheet,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import { Colors } from '../utils/Colors';
import Icon from './Icon';
import Label from './Label';

const Button = ({label, 
                  style={}, 
                  labelStyle={}, 
                  icon=null, 
                  iconStyle={}, 
                  iconPosition='r', 
                  loading=false,
                  onPress=()=>null
                }) => {
  
  const getIcon = () => {
    return icon === null 
                  ? <></>
                  : <Icon icon={icon} size={18} 
                        style={[styles.icon, iconStyle]}/>;
  }

  const renderLoadingOrLabel = () => {
    if(loading === true){
      return <ActivityIndicator color={Colors.white}/>
    } else {
      return <Label value={label} style={[styles.lbl, labelStyle]}/>
    }
  }
  
  return (
    <TouchableHighlight underlayColor='rgba(0,0,0,0)'
        style={[styles.btn, style]}
        onPress={() => onPress()}>
      <>
        {iconPosition === 'l' ? getIcon() : <></>}

        {renderLoadingOrLabel()}

        {iconPosition === 'r' ? getIcon() : <></>}
      </>
    </TouchableHighlight>
  );
}

const screen = Dimensions.get('screen');

const styles = StyleSheet.create({
  btn:{
    flexDirection:'row',
    backgroundColor:Colors.black,
    width:screen.width - 20,
    alignItems:'center',
    justifyContent:'center',
    height:screen.height * 0.06,
    borderRadius:10,
    marginVertical:5
  },
  icon:{
    color: Colors.white
  },
  lbl:{
    fontSize:20,
    fontFamily:'MartelSans-Bold'
  },
});

export default Button;