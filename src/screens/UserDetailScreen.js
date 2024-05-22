import { View, ScrollView, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Card, IconButton, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import { changeAvatarAccount } from '../handle_code/authAccount';

export default function UserDetailScreen() {

  const user = useSelector(state => state.auth.userData);
  const dispatch = useDispatch();
  const handleChooseImage = async () => {
    try {
      const image = await ImagePicker.openPicker({
        cropping: true,
        width: 300,
        height: 400,
        mediaType: "photo",
      });
      console.log(image);
      changeAvatarAccount(user.uid, image.path, dispatch);
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <ScrollView className="flex-1 p-4">
      <View className="items-center justify-center mb-4">
        <View className="relative">
          <Image
            source={user ? { uri: user.photoURL } : require('../asset/BaseAvatar.png')}
            style={{ width: 100, height: 100, borderRadius: 50 }}
          />
          <TouchableOpacity
            className="absolute bottom-[-10] right-[-10]"
            onPress={handleChooseImage}
          >
            <IconButton icon="pencil" className="bg-[#f4c95d]" />
          </TouchableOpacity>
        </View>
      </View>

      <Card className="mb-4">
        <Card.Title title="Thông tin cá nhân" titleVariant='titleLarge' />
        <Card.Content>
          <Text className="mb-2">Họ và tên: {user.customerName}</Text>
          <Text className="mb-2">Email: {user.email}</Text>
          <Text className="mb-2">Số điện thoại: {user.phoneNumber}</Text>
          <Text className="mb-2">Căn cước: {user.citizenID}</Text>
        </Card.Content>
      </Card>
      <Card className="mb-4">
        <Card.Title title="Liên kết ?" titleVariant='titleLarge' />
        <Card.Content>
          <Text>1</Text>
          <Text>2</Text>
          <Text>3</Text>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}
