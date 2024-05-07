import React, { useEffect, useState } from 'react';
import { FlatList, View, TouchableOpacity, ImageBackground } from 'react-native';
import SingleSelect from '../components/SingleSelect';
import { Searchbar, Text } from 'react-native-paper';
import { getDishesFromFireStore } from '../handle_code/dishesManage';
import { useDispatch } from 'react-redux';
import { getData } from '../actions/dataAction';

function MenuScreen({ navigation }) {
  const [initialData, setInitialData] = useState([]);
  const [bodyData, setBodyData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = getDishesFromFireStore(dishes => {
      setInitialData(dishes);
      setBodyData(dishes);
    });

    return () => unsubscribe();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query === '') {
      setBodyData(initialData);
    } else {
      const filteredData = initialData.filter(item => 
        item.foodName.toLowerCase().includes(query.toLowerCase())
      );
      setBodyData(filteredData);
    }
  };

  const handleCategorySelect = (value) => {
    if (value === '0') {
      setBodyData(initialData);
    } else {
      const filteredData = initialData.filter(item => item.role === value);
      setBodyData(filteredData);
    }
  };

  const handleDetailDishes = (item) => {
    navigation.navigate('Detail_Dishes')
    dispatch(getData(item))
  }
  const data = [
    { value: '0', label: 'Tất cả' },
    { value: 'Khai vị', label: 'Khai vị' },
    { value: 'Món chính', label: 'Món chính' },
    { value: 'Tráng Miệng', label: 'Tráng Miệng' },
    { value: 'Nước', label: 'Nước' },
  ];

  return (
    <View className="flex-1 p-2">
      <View className="mb-4">
        <Searchbar
          className="border border-gray-300 bg-transparent"
          placeholder="Tìm kiếm..."
          onChangeText={handleSearch}
          value={searchQuery}
        />
      </View>
      <View className="mb-4">
        <SingleSelect data={data} onSelect={handleCategorySelect} />
      </View>
      <FlatList
        data={bodyData}
        numColumns={2}
        columnWrapperStyle={{ gap: 10, paddingHorizontal: 12 }}
        contentContainerStyle={{ gap: 10, paddingBottom: 12 }}
        keyExtractor={item => item.uid}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              className="flex-1 rounded-2xl overflow-hidden"
              onPress={() => handleDetailDishes(item)}>
              <ImageBackground
                source={{ uri: item.imageURL }}
                className="flex-1 justify-center items-center flex-row h-24">
                <Text className="text-white font-bold text-lg">{item.foodName}</Text>
              </ImageBackground>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

export default MenuScreen;
