import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';
import LoginScreen from './src/screens/Login/LoginScreen';
import PrimeiroAcessoScreen from './src/screens/PrimeiroAcesso/PrimeiroAcessoScreen';
import ErrorScreen from './src/screens/Error/ErrorScreen';

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
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="login" component={LoginScreen} options={ScreensOptions} />
        <Stack.Screen name="primeiroAcesso" component={PrimeiroAcessoScreen} options={ScreensOptions} />
        <Stack.Screen name="error" component={ErrorScreen} options={ScreensOptions} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
