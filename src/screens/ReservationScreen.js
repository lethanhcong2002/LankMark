import React, {useState} from 'react';
import {Alert, ScrollView, View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import {useSelector} from 'react-redux';
import CustomTextInput from '../components/CustomTextInput';
import {addNewReservation} from '../handle_code/reservationManage';

function ReservationScreen({navigation}) {
  const user = useSelector(state => state.auth.userData);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [numberOfPeople, setNumberOfPeople] = useState('1');

  async function handleSubmit() {
    if (parseFloat(numberOfPeople) < 1 || numberOfPeople === '') {
      Alert.alert('Vui lòng nhập số người tham dự');
      return;
    }
    await addNewReservation({
      customerId: user.uid,
      customerName: user.customerName,
      idCard: Number(user.citizenID),
      phoneNumber: Number(user.phoneNumber),
      numberOfPeople: Number(numberOfPeople),
      bookingDate: date.toISOString(),
      bookingTime: new Date().toISOString(),
      status: 'Chờ xác nhận',
    });
    navigation.goBack();
  }
  return (
    <ScrollView className="p-4">
      <View className="mb-4 justify-center items-center">
        <Text className="text-3xl font-bold">Thông tin đặt bàn</Text>
      </View>
      <View className="my-2">
        <Text className="text-lg my-2 font-bold">Thông tin khách hàng</Text>
        <Text className="my-2">
          <Text className="font-bold">Tên khách hàng: </Text>
          {user ? user.customerName : ''}
        </Text>
        <Text className="my-2">
          <Text className="font-bold">Email: </Text>
          {user ? user.email : ''}
        </Text>
        <Text className="my-2">
          <Text className="font-bold">Số điện thoại: </Text>
          {user ? user.phoneNumber : ''}
        </Text>
        <Text className="my-2">
          <Text className="font-bold">Căn cước công dân: </Text>
          {user ? user.citizenID : ''}
        </Text>
      </View>
      <View className="mb-4">
        <CustomTextInput
          label="Số người tham dự"
          value={numberOfPeople}
          keyboardType='decimal-pad'
          onChangeText={number => {
            setNumberOfPeople(number);
          }}
        />
      </View>
      <View className="my-2">
        <TextInput
          label="Hẹn ngày"
          mode="outlined"
          value={date.toLocaleString()}
          right={
            <TextInput.Icon icon="calendar" onPress={() => setOpen(true)} />
          }
          editable={false}
        />
      </View>
      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <View className="mt-6">
        <Button mode="contained" className="bg-green-500" onPress={handleSubmit}>
          Xác nhận
        </Button>
      </View>
    </ScrollView>
  );
}

export default ReservationScreen;
