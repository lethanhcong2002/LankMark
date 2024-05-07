import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AuthStack from './AuthStack';
import AppBottomNavigation from './BottomNavigation';
import auth from '@react-native-firebase/auth';
import { Init, loginUser } from '../actions/authAction';
import { NavigationContainer } from '@react-navigation/native';
import {
  MD3LightTheme as LightTheme,
  MD3DarkTheme as DarkTheme,
} from 'react-native-paper';
import { useColorScheme } from 'react-native';

function RootNavigator() {

  const useScheme = useColorScheme();  

  const dispatch = useDispatch();

  const init = () => {
    dispatch(Init());
  }
  
  useEffect(() => {
    init();
  }, []);
  
  const user = useSelector(state => state.auth.userData);

  if(user) {
    return(
      <NavigationContainer theme={useScheme === 'dark' ? DarkTheme : LightTheme}>
        <AppBottomNavigation />
      </NavigationContainer>
    )
  }
  else {
    return(
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    )
  }
}

export default RootNavigator;
