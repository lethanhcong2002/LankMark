import React from 'react';
import {
  View,
  FlatList,
  Dimensions,
  StyleSheet,
  Alert,
  Text,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'; // Import Icon from react-native-vector-icons

function onPressHanging(value) {
  Alert.alert(value);
}

function SliderIcon({data}) {
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => onPressHanging(item.value)}>
        <Icon name="home" size={30} color="#2C7865" />
        <Text className="pt-1">{item.value}</Text>
      </TouchableOpacity>
    );
  };

  const numColumns = Math.min(4, data.length);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        snapToInterval={Dimensions.get('window').width / numColumns}
        decelerationRate="fast"
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  iconContainer: {
    width: Dimensions.get('window').width / 4,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
});

export default SliderIcon;
