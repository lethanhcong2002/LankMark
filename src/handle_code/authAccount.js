import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { Alert } from 'react-native';
import { updateAvatarUrl } from '../actions/authAction';

const CUSTOMER = firestore().collection('Customers');
GoogleSignin.configure({
  webClientId:
    '341241663453-qg43r8k99d0810m3tr81e50e6l9hrbb6.apps.googleusercontent.com',
});

export const handleLogin = (email, password) => {
  return new Promise((resolve, reject) => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        if (!user.emailVerified) {
          const errorMessage = 'Email của bạn chưa được xác thực. Vui lòng kiểm tra email và xác thực tài khoản trước khi đăng nhập.';
          Alert.alert('Lỗi', errorMessage);
          reject(errorMessage);
        } else {
          try {
            const userData = await getUserData(user.uid);
            const combinedUserData = {
              uid: user.uid,
              customerName: userData.customerName || user.displayName || '',
              email: userData.customerEmail || user.email || '',
              phoneNumber: userData.phoneNumber || '',
              citizenID: userData.citizenID || '',
              photoURL: userData.avatarUrl || user.photoURL || '',
            };
            resolve(combinedUserData);
          } catch (error) {
            console.error('Error getting user data:', error);
            Alert.alert('Lỗi', 'Đã xảy ra lỗi khi lấy dữ liệu người dùng từ Firestore.');
            reject(error);
          }
        }
      })
      .catch(error => {
        console.error('Login error:', error);
        Alert.alert('Lỗi', 'Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại sau.');
        reject(error);
      });
  });
};



export const handleLoginWithGoogle = () => {
  return new Promise((resolve, reject) => {
    GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
      .then(() => GoogleSignin.signIn())
      .then(({ idToken }) => {
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        return auth().signInWithCredential(googleCredential);
      })
      .then(userCredential => {
        const user = userCredential.user;
        console.log(user);
        const userData = {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        };
        resolve(userData);
      })
      .catch(error => {
        console.error(error);
        reject(error);
      });
  });
};

export const getUserData = (uid) => {
  return new Promise((resolve, reject) => {
    CUSTOMER
      .doc(uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const userData = doc.data();
          resolve(userData);
        } else {
          reject('Không tìm thấy thông tin người dùng');
        }
      })
      .catch((error) => {
        console.error('Error getting user data:', error);
        reject('Đã xảy ra lỗi khi lấy dữ liệu người dùng');
      });
  });
};

export const updateUserInfo = async (uid, newData) => {
  try {
    await CUSTOMER.doc(uid).update(newData);
    return true;
  } catch (error) {
    return false;
  }
};

export const changeAvatarAccount = async (uid, imagePath, dispatch) => {
  try {
    if (imagePath) {
      const storageRef = storage().ref(`/customer_avatar/${uid}.png`);
      await storageRef.putFile(imagePath);
      console.log('File uploaded to Firebase Storage');

      const imageUrl = await storageRef.getDownloadURL();
      console.log('Image URL:', imageUrl);

      await firestore().collection('Customers').doc(uid).update({
        avatarUrl: imageUrl,
      });
      Alert.alert("Vui lòng chờ đợi hình ảnh cập nhật");

      dispatch(updateAvatarUrl(imageUrl));
    }
  } catch (error) {
    console.error('Error updating avatar:', error);
  }
};