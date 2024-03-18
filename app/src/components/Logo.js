import { 
  StyleSheet,
  ImageBackground,
} from "react-native";
import logo from '../assets/img/Logo.png';

const Logo = ({style={}}) => <ImageBackground style={[styles.logo, style]} source={logo}/>

const styles = StyleSheet.create({
  logo:{
    width:60,
    height:60
  }
});

export default Logo;