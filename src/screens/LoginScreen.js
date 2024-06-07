import React, {useState} from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {
  Button,
  Card,
  Checkbox,
  Divider,
  Text,
} from 'react-native-paper';
import CustomTextInput from '../components/CustomTextInput';
import CustomPassInput from '../components/CustomPassInput';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import {useDispatch} from 'react-redux';
import {handleLogin, handleLoginWithGoogle} from '../handle_code/authAccount';
import CustomLoading from '../components/CustomLoading';
import { loginUser } from '../actions/authAction';

function LoginScreen({navigation}) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const handleLoginButtonPress = async () => {
    try {
      setIsLoading(true);
      const userData = await handleLogin(email, password);
      dispatch(loginUser(userData, 'email-password'));
    } catch (error) {
      console.error('Login error:', error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignInButtonPress = async () => {
    try {
      setIsLoading(true);
      const userData = await handleLoginWithGoogle();
      dispatch(loginUser(userData, 'google'));
    } catch (error) {
      console.error('Google Sign In error:', error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };


  const hasErrors = () => {
    return email.trim().length > 0 && !email.includes('@');
  };

  return (
    <View className="flex-1 justify-center items-center p-3 bg-[#f4c95d] relative">
      <Card className="w-full p-2 bg-white">
        <Image
          source={require('../asset/LankMarkLogo_nobg.png')}
          style={styles.logo}
        />
        <Card.Content>
          <CustomTextInput
            label="Email"
            keyboardType="email-address"
            onChangeText={text => {
              setEmail(text);
            }}
            error={hasErrors()}
            helperText="Email không đúng định dạng!"
          />
        </Card.Content>
        <Card.Content className="mb-2">
          <CustomPassInput
            label="Password"
            onChangeText={text => setPassword(text)}
            icons={['eye', 'eye-off']}
          />
        </Card.Content>
        <Card.Content className="flex-row items-center mb-2">
          <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked(!checked);
            }}
            color="#f4c95d"
          />
          <Text>Duy trì đăng nhập</Text>
        </Card.Content>
        <Card.Content className="mb-2">
          <Button
            mode="contained"
            onPress={handleLoginButtonPress}
            className="bg-green-500">
            Đăng nhập
          </Button>
        </Card.Content>
        <Card.Content className="justify-center items-center mb-2">
          <Text>Hoặc</Text>
        </Card.Content>
        <Card.Content className="mb-2 items-center">
          <GoogleSigninButton onPress={handleGoogleSignInButtonPress} />
        </Card.Content>
        <Divider className="mb-2" />
        <Card.Content className="justify-center items-center mb-4">
          <TouchableOpacity>
            <Text className="text-blue-700">Quên mật khẩu !</Text>
          </TouchableOpacity>
        </Card.Content>
        <Card.Content className="justify-center items-center mb-2">
          <TouchableOpacity
            onPress={() => navigation.navigate('RegisterAccount')}>
            <Text className="text-blue-700">Tạo tài khoản</Text>
          </TouchableOpacity>
        </Card.Content>
      </Card>
      {isLoading && <CustomLoading />}
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: '100%',
    height: undefined,
    aspectRatio: 21 / 9,
    resizeMode: 'contain',
  },
});

export default LoginScreen;
