import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {NavigationRef} from './RouterServices';
import {Form1, Form2, Form3} from '../screens';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer ref={NavigationRef}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Form1" component={Form1} />
        <Stack.Screen name="Form2" component={Form2} />
        <Stack.Screen name="Form3" component={Form3} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
