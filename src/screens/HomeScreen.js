import React, { useEffect, useState } from 'react';
import { Text } from 'react-native-paper';
import SliderIcon from '../components/SliderIcon';
import { ImageBackground, ScrollView, TouchableOpacity, View } from 'react-native';
import { getNewestDishes, getPopularDishes } from '../handle_code/dishesManage';
import { useDispatch } from 'react-redux';
import { getData } from '../actions/dataAction';

function HomeScreen({navigation}) {

  const [bodyData, setBodyData] = useState([]);
  const [popularDishes, setPopularDishes] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await getNewestDishes((dishes) => {
          setBodyData(dishes);
        });

        getPopularDishes((dishes) => {
          setPopularDishes(dishes);
        })

      } catch (error) {
        console.error("Error fetching dishes:", error);
      }
    };

    fetchData();
  }, []);

  const dispatch = useDispatch();

  const handleDetailDishes = (item) => {
    navigation.navigate('Detail_Dishes')
    dispatch(getData(item))
  }
  // const icons = [
  //   { icon: 'faHome', value: '1' },
  //   { icon: 'faHome', value: '2' },
  //   { icon: 'faHome', value: '3' },
  //   { icon: 'faHome', value: '4' },
  //   { icon: 'faHome', value: '5' },
  // ];
  return (
    <ScrollView>
      {/* <View className="py-4">
        <Text className="px-4 pb-4 text-xl font-bold">
          Loại món được yêu thích nhất
        </Text>
        <SliderIcon data={icons} />
      </View> */}
      <View className="py-4 px-4">
        <Text className="text-xl font-bold">Thịnh hành nhất</Text>
        {popularDishes.map((item) => (
          <TouchableOpacity
            key={item.id}
            className="flex-1 rounded-2xl overflow-hidden my-2"
            onPress={() => handleDetailDishes(item)}
          >
            <ImageBackground
              source={{ uri: item.imageURL }}
              className="justify-center items-center flex-row h-24">
              <View className="justify-center items-center h-full w-full" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                <Text className="text-white font-bold text-lg">{item.foodName}</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        ))}
      </View>
      <View className="py-4 px-4">
        <Text className="text-xl font-bold">Mới nhất</Text>
        {bodyData.map((item) => (
          <TouchableOpacity
            key={item.id}
            className="flex-1 rounded-2xl overflow-hidden my-2"
            onPress={() => handleDetailDishes(item)}
          >
            <ImageBackground
              source={{ uri: item.imageURL }}
              className="justify-center items-center flex-row h-24">
              <View className="justify-center items-center h-full w-full" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
                <Text className="text-white font-bold text-lg">{item.foodName}</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        ))}
      </View>
      {/* <View className="py-4 px-4">
        <Text className="text-xl font-bold">Tin tức</Text>
      </View> */}
    </ScrollView>
  );
}

export default HomeScreen;
