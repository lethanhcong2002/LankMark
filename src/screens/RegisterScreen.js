import React, { useState } from 'react';
import { View, Alert, TouchableOpacity } from 'react-native';
import { Button, Card, Checkbox, Divider, Text } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import CustomTextInput from '../components/CustomTextInput';
import CustomPassInput from '../components/CustomPassInput';

function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [checked, setChecked] = useState(false);

  const handleCreateAccount = () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Vui lòng điền đầy đủ thông tin.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Mật khẩu không khớp');
      return;
    }

    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async (userCredential) => {
        await userCredential.user.sendEmailVerification();

        await firestore().collection('Customers').doc(userCredential.user.uid).set({
          customerName: name,
          customerEmail: email,
        });

        Alert.alert('Tạo tài khoản thành công! Vui lòng kiểm tra email để xác nhận.');
        navigation.goBack();
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  };

  return (
    <View className="flex-1 justify-center items-center p-3 bg-[#f4c95d] relative">
      <Card className="w-full p-2 bg-white">
        <Card.Content className="justify-center items-center py-3">
          <Text style={{ fontSize: 24 }}>Tạo tài khoản</Text>
        </Card.Content>
        <Card.Content>
          <CustomTextInput
            label="Họ & Tên"
            onChangeText={(text) => setName(text)}
          />
          <CustomTextInput
            label="Email"
            keyboardType="email-address"
            onChangeText={(text) => setEmail(text)}
          />
          <CustomPassInput
            label="Mật khẩu"
            onChangeText={(text) => setPassword(text)}
            icons={['eye', 'eye-off']}
          />
          <CustomPassInput
            label="Nhập lại mật khẩu"
            onChangeText={(text) => setConfirmPassword(text)}
            icons={['eye', 'eye-off']}
          />
        </Card.Content>
        <Card.Content className="flex-row items-center mt-3">
          <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => setChecked(!checked)}
            color="#f4c95d"
          />
          <Text>Đồng ý với chính sách của nhà hàng</Text>
        </Card.Content>
        <Card.Content className="my-3">
          <Button mode="contained" onPress={handleCreateAccount} className="bg-green-500">
            Tạo tài khoản
          </Button>
        </Card.Content>
        <Divider className="mb-3"/>
        <Card.Content className="justify-center items-center mb-3">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text className="text-blue-700">Đã có tài khoản ?</Text>
          </TouchableOpacity>
        </Card.Content>
      </Card>
    </View>
  );
}

export default RegisterScreen;
