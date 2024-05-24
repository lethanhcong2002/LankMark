import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import UserInfoScreen from '../screens/UserInfoScreen';
import UserDetailScreen from '../screens/UserDetailScreen';
import { useNavigation } from '@react-navigation/native';
import CustomDotUser from '../components/CustomDotUser';
import UpdateUserScreen from '../screens/UpdateUserScreen';
import InvoiceScreen from '../screens/InvoiceScreen';
import StatisticsScreen from '../screens/StatisticsScreen';

const Stack = createNativeStackNavigator();

export default function UserStack() {
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen name='UserMain' component={UserInfoScreen} options={{ headerShown: false }} navigation={navigation} />
      <Stack.Screen name='UserDetail' component={UserDetailScreen} options={{ title: '', headerRight: () => <CustomDotUser navigation={navigation} /> }} />
      <Stack.Screen name='UpdateUser' component={UpdateUserScreen} options={{ title: '' }} navigation={navigation} />
      <Stack.Screen name='Invoice' component={InvoiceScreen} options={{ title: '' }} navigation={navigation} />
      <Stack.Screen name='Statistics' component={StatisticsScreen} options={{ title: '' }} navigation={navigation} />
    </Stack.Navigator>
  )
}