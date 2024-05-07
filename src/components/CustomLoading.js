/* eslint-disable prettier/prettier */
import {View} from 'react-native';
import React from 'react';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

export default function CustomLoading() {
  return (
    <View className="justify-center absolute top-0 left-0 right-0 bottom-0 z-[2]" style={{backgroundColor: 'rgba(128, 128, 128, 0.5)'}}>
      <ActivityIndicator animating={true} size="large" color={MD2Colors.amber900}/>
    </View>
  );
}
