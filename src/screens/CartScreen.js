import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import { Button, Text, Card, PaperProvider } from 'react-native-paper';
import CustomDotMenu from '../components/CustomDotMenu';
import { getReservationList } from '../handle_code/reservationManage';
import { useSelector } from 'react-redux';

function CartScreen({ navigation }) {
  const [bodyData, setBodyData] = useState([]);
  const user = useSelector(state => state.auth.userData);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await getReservationList(user.uid, (dishes) => {
          setBodyData(dishes);
        });

      } catch (error) {
        console.error("Error fetching dishes:", error);
      }
    };
    fetchData();
  }, []
  )
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
      <FlatList
        data={bodyData}
        contentContainerStyle={{ paddingBottom: 12 }}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <Card className="mb-4">
              <Card.Title
                title="Lịch đặt bàn"
                subtitle={new Date(item.bookingDate).toLocaleString()}
                right={() => <CustomDotMenu navigation={navigation} reservationData={item} />}
              />
              <Card.Content>
                <Text>{item.status}</Text>
              </Card.Content>
            </Card>
          );
        }}
      />
    </View>
  );
}

export default CartScreen;
