import {
  TouchableHighlight,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Keyboard,
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

  const handlePress = () => {
    if(Keyboard.isVisible())
      Keyboard.dismiss();
    
    onPress();
  }
  
  return (
    <TouchableHighlight underlayColor='rgba(0,0,0,0)'
        style={[styles.btn, style]}
        onPress={handlePress}>
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
    width:screen.width * 0.8,
    alignItems:'center',
    justifyContent:'center',
    minHeight:screen.height * 0.05,
    borderRadius:10,
    marginVertical:5,
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