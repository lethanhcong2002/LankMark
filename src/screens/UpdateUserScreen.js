import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import CustomTextInput from '../components/CustomTextInput';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserInfo } from '../handle_code/authAccount';
import { updateUser } from '../actions/authAction';

function UpdateUserScreen({navigation}) {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [citizenID, setCitizenID] = useState('');

  const dispatch = useDispatch();

  const userData = useSelector(state => state.auth.userData);

  useEffect(() => {
    setFullName(userData.displayName);
    setPhoneNumber(userData.phoneNumber);
    setCitizenID(userData.citizenID);
  }, [userData]);

  function handleUpdateInfo() {
    const updatedUserData = {
      customerName: fullName,
      phoneNumber: phoneNumber,
      citizenID: citizenID
    };
    updateUserInfo(userData.uid ,updatedUserData);
    dispatch(updateUser(updatedUserData));
    navigation.goBack();
  }
  return (
    <ScrollView className="p-4">
      <View className="mb-4 justify-center items-center">
        <Text className="text-2xl">Thông tin đặt bàn</Text>
      </View>
      <View className="mb-4">
        <CustomTextInput
          label="Họ và Tên"
          value={fullName}
          onChangeText={setFullName}
        />
      </View>
      <View className="mb-4">
        <CustomTextInput
          label="Số điện thoại"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
      </View>
      <View className="mb-4">
        <CustomTextInput
          label="Căn cước công dân"
          keyboardType="phone-pad"
          value={citizenID}
          onChangeText={setCitizenID}
        />
      </View>
      <View className="mt-6">
        <Button mode="contained" className="bg-green-500" onPress={() => handleUpdateInfo()}>
          Xác nhận
        </Button>
      </View>
    </ScrollView>
  );
}

export default UpdateUserScreen;
