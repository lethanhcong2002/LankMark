import React from 'react';
import {ScrollView, View} from 'react-native';
import {Card, Text} from 'react-native-paper';
import { useSelector } from 'react-redux';
import { formatCurrency } from '../handle_code/supportingCode';

function DetailDishesScreen({navigation}) {
  const data = useSelector(state => state.data.data);
  return (
    <ScrollView className="p-2">
      <View className="p-2 mb-4">
        <Card className="p-2">
          <Card.Cover source={{uri: data.imageURL}} />
          <Card.Title title={data.foodName} titleVariant="titleLarge" subtitle={formatCurrency(data.price)}/>
        </Card>
      </View>
      <View className="p-2  mb-4">
        <Card className="p-2">
          <Card.Title title="Một vài thông tin về món ăn" titleVariant="titleLarge" subtitle={"Loại món: " + data.role}/>
          <Card.Content className="mb-2">
            <Text variant="titleLarge">Trong món ăn có</Text>
            <Text variant="bodyMedium">
              Thit, thit
            </Text>
          </Card.Content>
          <Card.Content>
            <Text variant="titleLarge">Mô tả</Text>
            <Text variant="bodyMedium">
              {data.description}
            </Text>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
}

export default DetailDishesScreen;
