import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import CartScreen from '../screens/CartScreen';
import ReservationScreen from '../screens/ReservationScreen';
import DetailReservationScreen from '../screens/DetailReservationScreen';
import UpdateReservationScreen from '../screens/UpdateReservationScreen';

const Stack = createNativeStackNavigator();

function CartStack() {
  const navigation = useNavigation();
  return (
    <Stack.Navigator initialRouteName="Cart_Screen">
      <Stack.Screen
        name="Cart_Screen"
        component={CartScreen}
        navigation={navigation}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Reservation"
        component={ReservationScreen}
        options={{
          title: 'Đặt bàn',
        }}
        navigation={navigation}
      />
      <Stack.Screen
        name="Update_Reservation"
        component={UpdateReservationScreen}
        options={{
          title: 'Cập nhật thông tin',
        }}
        navigation={navigation}
      />
      <Stack.Screen
        name="Detail_Reservation"
        component={DetailReservationScreen}
        options={{
          title: 'Thông tin chi tiết',
        }}
      />
    </Stack.Navigator>
  );
}

export default CartStack;
