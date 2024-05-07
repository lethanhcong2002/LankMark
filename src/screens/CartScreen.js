/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {ScrollView, View} from 'react-native';
import {Button, Text, Card, PaperProvider} from 'react-native-paper';
import CustomDotMenu from '../components/CustomDotMenu';

function CartScreen({navigation}) {
  return (
    <View className="flex-1 p-4">
        <View className="mb-4">
          <Button
            icon="plus"
            mode="contained"
            onPress={() => navigation.navigate('Reservation')}
            className="bg-[#f4c95d]">
            Đặt bàn trước
          </Button>
        </View>
        <ScrollView className="p-2">
          <Card className="mb-2">
            <Card.Title
              title="Lịch đặt bàn"
              subtitle="Ngày: 18/4/2024"
              right={() => <CustomDotMenu navigation={navigation} />}
            />
            <Card.Content>
              <Text>Chưa thanh toán</Text>
            </Card.Content>
          </Card>
        </ScrollView>
    </View>
  );
}

export default CartScreen;
