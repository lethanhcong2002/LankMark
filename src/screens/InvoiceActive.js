import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getInvoiceActive } from '../handle_code/reservationManage';
import { Card } from 'react-native-paper';

export default function InvoiceActive() {
  const [data, setData] = useState([]);
  const user = useSelector(state => state.auth.userData);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await getInvoiceActive(user.uid, (dishes) => {
          setData(dishes);
        });

      } catch (error) {
        console.error("Error fetching dishes:", error);
      }
    };
    fetchData();
  }, [])
  return (
    <View>
      <FlatList
        data={data}
        contentContainerStyle={{ paddingBottom: 12 }}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <Card className="mb-4">
              <Card.Title
                title="Lịch đặt bàn"
                subtitle={new Date(item.bookingDate).toLocaleString()}
              />
              <Card.Content>
                <Text>{item.status}</Text>
              </Card.Content>
            </Card>
          );
        }}
      />
    </View>
  )
}