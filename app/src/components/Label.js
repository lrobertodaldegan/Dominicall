import { 
  Text,
  StyleSheet,
} from "react-native";
import { Colors } from "../utils/Colors";



const Label = ({value, style={}}) => {
  return (
    <Text style={[styles.lbl, style]}>{value}</Text>
  );
}

const styles = StyleSheet.create({
  lbl:{
    color:Colors.white,
    fontSize:16,
    fontFamily:'MartelSans-Regular'
  }
});

export default Label;