import React from 'react';
import firestore from '@react-native-firebase/firestore';
import {View} from 'react-native';
import {Text} from 'react-native-paper';

function Test() {
  firestore()
    .collection('Product')

    .add({
      productName: 'afda',
      price: 20,
    })
    .then(() => console.log('add new document'))
    .catch(e => console.log(e.message));
  return (
    <View>
      <Text>dasdsdsds</Text>
    </View>
  );
}

export default Test;
