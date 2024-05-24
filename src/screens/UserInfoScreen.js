import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ScrollView, View, TouchableOpacity, Image} from 'react-native';
import {Divider, Text} from 'react-native-paper';
import { logoutUser } from '../actions/authAction';
import auth from '@react-native-firebase/auth';

function UserInfoScreen({navigation}) {
  const user = useSelector(state => state.auth.userData);
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      //GoogleSignin.revokeAccess() logout google
      await auth().signOut();
      dispatch(logoutUser());
    } catch (error) {
      console.log('Sign out error:', error);
    }
  };

  useEffect(() => {
    console.log(user);
  })
  return (
    <ScrollView className="flex-1 px-0">
      <View className="flex-1 justify-center items-center mb-4 mt-2">
        <Image
            source={user.photoURL ? { uri: user.photoURL } : require('../asset/BaseAvatar.png')}
            className="w-28 h-28 rounded-full object-contain mb-2"
        /> 
        <Text className="text-base">{user.customerName}</Text>
      </View>
      <View className="pt-4 px-4">
        <TouchableOpacity className="flex-row items-center" onPress={() => navigation.navigate("UserDetail")}>
          <Text>Thông tin cá nhân</Text>
        </TouchableOpacity>
      </View>
      <View className="pt-4 px-4">
        <TouchableOpacity className="flex-row items-center" onPress={() => navigation.navigate("Invoice")}>
          <Text>Hóa đơn</Text>
        </TouchableOpacity>
      </View>
      <View className="pt-4 px-4">
        <TouchableOpacity className="flex-row items-center" onPress={() => navigation.navigate("Statistics")}>
          <Text>Thống kê</Text>
        </TouchableOpacity>
      </View>
      <Divider className="mt-4" />
      <View className="pt-4 px-4">
        <View className="flex-row items-center">
          <Text>Khám phá LankMark</Text>
        </View>
      </View>
      <View className="pt-4 px-4">
        <View className="flex-row items-center">
          <Text>Hỗ trợ</Text>
        </View>
      </View>
      <View className="pt-4 px-4">
        <View className="flex-row items-center">
          <Text>Cài đặt</Text>
        </View>
      </View>
      <View className="pt-4 px-4">
        <View className="flex-row items-center">
          <Text>Giới thiệu</Text>
        </View>
      </View>
      <Divider className="mt-4" />
      <View className="pt-4 px-4">
        <View className="flex-row items-center">
          <Text>Đổi mật khẩu</Text>
        </View>
      </View>
      <View className="pt-4 px-4 pb-4">
        <TouchableOpacity
          className="flex-row items-center"
          onPress={handleLogout}>
          <Text>Thoát tài khoản</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default UserInfoScreen;
