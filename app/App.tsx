import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import TeamScreen from './src/screens/TeamScreen';
import ReportScreen from './src/screens/ReportScreen';
import GroupScreen from './src/screens/GroupScreen';
import InviteScreen from './src/screens/InviteScreen';
import FirstAccessScreen from './src/screens/FirstAccessScreen';
import ResetScreen from './src/screens/ResetScreen';
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
          <Stack.Screen name="team" component={TeamScreen} options={ScreensOptions} />
          <Stack.Screen name="reports" component={ReportScreen} options={ScreensOptions} />
          <Stack.Screen name="group" component={GroupScreen} options={ScreensOptions} />
          <Stack.Screen name="invite" component={InviteScreen} options={ScreensOptions} />
          <Stack.Screen name="firstAccess" component={FirstAccessScreen} options={ScreensOptions} />
          <Stack.Screen name="reset" component={ResetScreen} options={ScreensOptions} />
          <Stack.Screen name="error" component={ErrorScreen} options={ScreensOptions} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default App;
