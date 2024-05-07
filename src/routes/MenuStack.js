/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MenuScreen from '../screens/MenuScreen';
import DetailDishesScreen from '../screens/DetailDishesScreen';
import {useNavigation} from '@react-navigation/native';

const Stack = createNativeStackNavigator();

function MenuStack() {
  const navigation = useNavigation();

  return (
    <Stack.Navigator initialRouteName="List_Dishes">
      <Stack.Screen
        name="List_Dishes"
        component={MenuScreen}
        navigation={navigation}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Detail_Dishes"
        component={DetailDishesScreen}
        options={{
          title: '',
        }}
        navigation={navigation}
      />
    </Stack.Navigator>
  );
}

export default MenuStack;
