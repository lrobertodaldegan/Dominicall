import AsyncStorage from "@react-native-async-storage/async-storage";

const CacheService = {
  get: async (key) => {
    try{
      return JSON.parse(await AsyncStorage.getItem(key));
    } catch(e){
      console.log(e);
    }
  },
  register: async (key, value) => {
    try{
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch(e){
      console.log(e);
    }
  },
  wipe: async (key) => {
    try{
      await AsyncStorage.removeItem(key);
    } catch(e){
      console.log(e);
    }
  },
}

export default CacheService;