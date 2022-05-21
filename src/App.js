import React, { useEffect, useState } from 'react';
import { View, Button, Text, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { withWalletConnect, useWalletConnect } from '@walletconnect/react-native-dapp';
import AsyncStorage from '@react-native-async-storage/async-storage';

import StartScreen from './Screens/StartScreen';
import EmailScreen from './Screens/EmailScreen';
import Home from './Screens/HomeScreen';

const Stack = createNativeStackNavigator();

function App() {

  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    AsyncStorage.getItem('email')
      .then(email => {
        console.log(email)
        if (email) {
          setAuthorized(true)
        } else {
          setAuthorized(false)
        }
      })
  }, [])

  return <NavigationContainer>
    {!authorized ?
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name='Start'
          component={StartScreen}
        />
        <Stack.Screen
          name='Email'
          initialParams={{ onJoin: () => { setAuthorized(true) } }}
          component={EmailScreen} />
        <Stack.Screen
          name='Home'
          component={Home}
        />
      </Stack.Navigator>
      :
      <Home logout={() => setAuthorized(false)} />}
  </NavigationContainer>
}

export default withWalletConnect(App, {
  clientMeta: { description: 'Connect with WalletConnect' },
  redirectUrl: 'sleepnscheme://',
  storageOptions: { asyncStorage: AsyncStorage },
});
