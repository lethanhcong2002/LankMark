import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import {Button, Text} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomTextInput from '../components/CustomTextInput';

function ReservationScreen() {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedTextInput, setSelectedTextInput] = useState('');

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
    if (selectedTextInput) {
      console.log(currentDate);
    }
  };

  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(false);
    setTime(currentTime);
    if (selectedTextInput) {
      console.log(currentTime);
    }
  };

  const formatTime = time => {
    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return (
    <ScrollView className="p-4">
      <View className="mb-4 justify-center items-center">
        <Text className="text-2xl">Thông tin đặt bàn</Text>
      </View>
      <View className="mb-4">
        <CustomTextInput label="Họ và Tên" />
      </View>
      <View className="mb-4">
        <CustomTextInput label="Số điện thoại" keyboardType="phone-pad" />
      </View>
      <View className="mb-4">
        <CustomTextInput label="Căn cước công dân" keyboardType="phone-pad" />
      </View>
      <View className="mb-4">
        <CustomTextInput label="Số người" keyboardType="phone-pad" />
      </View>
      <View className="mb-4">
        <CustomTextInput
          label="Ngày"
          value={date.toLocaleDateString()}
          onPressIn={() => {
            setShowDatePicker(true);
            setSelectedTextInput('Ngày');
          }}
        />
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            onChange={handleDateChange}
          />
        )}
      </View>
      <View>
        <CustomTextInput
          label="Thời gian"
          value={formatTime(time)}
          onPressIn={() => {
            setShowTimePicker(true);
            setSelectedTextInput('Thời gian');
          }}
        />
        {showTimePicker && (
          <DateTimePicker
            value={time}
            mode="time"
            display="spinner"
            onChange={handleTimeChange}
          />
        )}
      </View>
      <View className="mt-6">
        <Button mode="contained" className="bg-green-500">
          Xác nhận
        </Button>
      </View>
    </ScrollView>
  );
}

export default ReservationScreen;
