import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import { useNavigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator();
function AuthStack() {
  const navigation = useNavigation();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="LoginAccount" component={LoginScreen} navigation={navigation}/>
      <Stack.Screen name="RegisterAccount" component={RegisterScreen} navigation={navigation}/>
    </Stack.Navigator>
  );
}

export default AuthStack;
