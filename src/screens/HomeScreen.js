import React from 'react';
import {Text} from 'react-native-paper';
import SliderIcon from '../components/SliderIcon';
import {ScrollView, View} from 'react-native';

function HomeScreen() {
  const icons = [
    {icon: 'faHome', value: '1'},
    {icon: 'faHome', value: '2'},
    {icon: 'faHome', value: '3'},
    {icon: 'faHome', value: '4'},
    {icon: 'faHome', value: '5'},
  ];
  return (
    <ScrollView>
      <View className="py-4">
        <Text className="px-4 pb-4 text-xl font-bold">
          Loại món được yêu thích nhất
        </Text>
        <SliderIcon data={icons} />
      </View>
      <View className="py-4 px-4">
        <Text className="text-xl font-bold">Thịnh hành nhất</Text>
      </View>
      <View className="py-4 px-4">
        <Text className="text-xl font-bold">Mới nhất</Text>
      </View>
      <View className="py-4 px-4">
        <Text className="text-xl font-bold">Tin tức</Text>
      </View>
    </ScrollView>
  );
}

export default HomeScreen;
