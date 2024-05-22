/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MenuStack from './MenuStack';
import CartStack from './CartStack';
import UserStack from './UserStack';
import { PaperProvider } from 'react-native-paper';
import HomeStack from './HomeStack';

const Tab = createBottomTabNavigator();

function AppBottomNavigation() {
  return (
    <PaperProvider>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: 'red',
          tabBarItemStyle: {
            backgroundColor: '#f4c95d',
          },
        }}
        initialRouteName="Home">
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{
            tabBarStyle: {borderTopColor: '#f4c95d'},
            tabBarLabel: 'Home',
            tabBarIcon: ({color, size}) => (
              <Icon name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Menu"
          component={MenuStack}
          options={({route}) => ({
            tabBarStyle: {display: getVisibility(route, 'Menu'), borderTopColor: '#f4c95d'},
            tabBarLabel: 'Menu',
            tabBarIcon: ({color, size}) => (
              <Icon name="utensils" size={size} color={color} />
            ),
          })}
        />

        <Tab.Screen
          name="Cart"
          component={CartStack}
          options={({route}) => ({
            tabBarStyle: {display: getVisibility(route, 'Cart'), borderTopColor: '#f4c95d'},
            tabBarLabel: 'Cart',
            tabBarIcon: ({color, size}) => (
              <Icon name="shopping-cart" size={size} color={color} />
            ),
          })}
        />
        <Tab.Screen
          name="User"
          component={UserStack}
          options={({route}) => ({
            tabBarStyle: {display: getVisibility(route, 'User'), borderTopColor: '#f4c95d'},
            tabBarLabel: 'User',
            tabBarIcon: ({color, size}) => (
              <Icon name="user" size={size} color={color} />
            ),
          })}
        />
      </Tab.Navigator>
    </PaperProvider>
  );
}

function getVisibility(route, tabName) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? tabName;
  switch (tabName) {
    case 'Home':
      switch (routeName) {
        case 'Detail_Dishes':
          return 'none';
        default:
          return 'flex';
      }
    case 'Menu':
      switch (routeName) {
        case 'Detail_Dishes':
          return 'none';
        default:
          return 'flex';
      }
    case 'Cart':
      switch (routeName) {
        case 'Reservation':
        case 'Detail_Reservation':
        case 'Update_Reservation':
          return 'none';
        default:
          return 'flex';
      }
    case 'User':
      switch (routeName){
        case 'UserDetail':
        case 'UpdateUser':
          return 'none';
        default:
          return 'flex';
      }
    default:
      return 'flex';
  }
}

export default AppBottomNavigation;
