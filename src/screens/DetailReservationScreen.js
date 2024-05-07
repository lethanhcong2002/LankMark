import React from 'react';
import {ScrollView, View} from 'react-native';
import {Card, Text} from 'react-native-paper';

function DetailReservationScreen() {
  return (
    <ScrollView className="p-4">
      <View className="p-2 mb-4">
        <Card className="p-2">
          <Card.Title title="Su hào chả lụa" titleVariant="titleLarge" />
          <Card.Content>
            <Text>Thông tin liên quan</Text>
          </Card.Content>
        </Card>
      </View>
      <View className="p-2  mb-4">
        <Card className="p-2">
          <Card.Content className="mb-2">
            <Text variant="titleLarge">Trong món ăn có</Text>
            <Text variant="bodyMedium">
              AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
            </Text>
          </Card.Content>
          <Card.Content>
            <Text variant="titleLarge">Mô tả</Text>
            <Text variant="bodyMedium">
              AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
            </Text>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
}

export default DetailReservationScreen;
