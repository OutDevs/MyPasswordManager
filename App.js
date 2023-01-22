import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Main from './app/screens/Main'
import SavePW from './app/screens/SavePW'
import Passwords from './app/screens/Passwords'
import SeePW from './app/screens/SeePW'

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />
        <Stack.Screen name="SavePW" component={SavePW} options={{ headerShown: false }} />
        <Stack.Screen name="Passwords" component={Passwords} options={{ headerShown: false }} />
        <Stack.Screen name="SeePW" component={SeePW} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
