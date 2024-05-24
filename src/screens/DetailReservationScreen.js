import React from 'react';
import {ScrollView, View} from 'react-native';
import {Button, Card, Text} from 'react-native-paper';

function DetailReservationScreen({route}) {
  const {reservationData} = route.params;
  return (
    <ScrollView>
      <View className="p-4">
        <Card className="p-2">
          <Card.Title
            title="Thông tin lịch đặt"
            titleVariant="titleLarge"
            titleStyle={{textAlign: 'center'}}
          />
          <Card.Content className="mb-2">
            <Text variant="titleMedium" className="mb-1">
              Thông tin khách hàng:
            </Text>
            <View className="ml-3">
              <Text variant="bodyMedium">
                <Text variant="titleSmall">Tên khách hàng: </Text>
                {reservationData.customerName}
              </Text>
              <Text variant="bodyMedium">
                <Text variant="titleSmall">Số điện thoại: </Text>
                {reservationData.phoneNumber}
              </Text>
              <Text variant="bodyMedium">
                <Text variant="titleSmall">Căn cước: </Text>
                {reservationData.idCard}
              </Text>
            </View>
          </Card.Content>
        </Card>
        <Card className="p-2 mt-4">
          <Card.Content>
            <Text variant="titleMedium" className="mb-1">
              Thông tin lịch đặt:
            </Text>
            <View className="ml-3">
              <Text variant="bodyMedium">
                <Text variant="titleSmall">Thời gian: </Text>
                {new Date(reservationData.bookingDate).toLocaleString()}
              </Text>
              <Text variant="bodyMedium">
                <Text variant="titleSmall">Số người: </Text>
                {reservationData.numberOfPeople}
              </Text>
              <Text variant="bodyMedium">
                <Text variant="titleSmall">Trạng thái: </Text>
                {reservationData.status}
              </Text>
            </View>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
}

export default DetailReservationScreen;
