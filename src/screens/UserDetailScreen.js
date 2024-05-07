import { View, ScrollView, Image, TouchableOpacity, PermissionsAndroid } from 'react-native';
import React, { useEffect } from 'react';
import { Button, Card, IconButton, Text } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { launchImageLibrary } from 'react-native-image-picker';

export default function UserDetailScreen() {

  const user = useSelector(state => state.auth.userData);

  const requestGalleryPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Quyền truy cập thư viện ảnh',
          message: 'Ứng dụng cần quyền truy cập thư viện ảnh để chọn hình ảnh.',
          buttonPositive: 'Đồng ý',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Quyền truy cập thư viện ảnh đã được cấp');
      } else {
        console.log('Quyền truy cập thư viện ảnh bị từ chối');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    requestGalleryPermission();
  }, []);
  
  const handleChooseImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (!response.didCancel) {
        console.log(response.uri);
      }
    });
  };
  return (
    <ScrollView className="flex-1 p-4">
      <View className="items-center justify-center mb-4">
        <View className="relative">
          <Image
            source={user.photoURL ? { uri: user.photoURL } : require('../asset/BaseAvatar.png')}
            style={{ width: 100, height: 100, borderRadius: 50 }}
          />
          <TouchableOpacity
            className="absolute bottom-[-10] right-[-10]"
            onPress={handleChooseImage}
          >
            <IconButton icon="pencil"  className="bg-[#f4c95d]"/>
          </TouchableOpacity>
        </View>
      </View>

      <Card className="mb-4">
        <Card.Title title="Thông tin cá nhân" titleVariant='titleLarge'/>
        <Card.Content>
          <Text className="mb-2">Họ và tên: {user.customerName}</Text>
          <Text className="mb-2">Email: {user.email}</Text>
          <Text className="mb-2">Số điện thoại: {user.phoneNumber}</Text>
          <Text className="mb-2">Căn cước: {user.citizenID}</Text>
        </Card.Content>
      </Card>
      <Card className="mb-4">
        <Card.Title title="Liên kết ?" titleVariant='titleLarge'/>
        <Card.Content>
          <Text>1</Text>
          <Text>2</Text>
          <Text>3</Text>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}