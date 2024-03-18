import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import PrimeiroAcessoScreen from './src/screens/PrimeiroAcessoScreen';
import ErrorScreen from './src/screens/ErrorScreen';

const ScreensOptions = {
  headerShown: false,
  headerTintColor: '#fff',
}

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  useEffect(() => {
    SplashScreen.hide()
  });

  return (
    <>
      <StatusBar translucent backgroundColor='transparent' barStyle='dark-content'/>
      
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="login" component={LoginScreen} options={ScreensOptions} />
          <Stack.Screen name="home" component={HomeScreen} options={ScreensOptions} />
          <Stack.Screen name="primeiroAcesso" component={PrimeiroAcessoScreen} options={ScreensOptions} />
          <Stack.Screen name="error" component={ErrorScreen} options={ScreensOptions} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default App;
