// actions/authActions.js

import AsyncStorage from "@react-native-async-storage/async-storage";

export const Init = () => {
    return async dispatch => {
        try {
            const userData = await AsyncStorage.getItem("UserData");
            if(userData !== null) {
                dispatch({
                    type: 'LOGIN',
                    payload: JSON.parse(userData),
                });
            }
        } catch (error) {
            console.error('Error initializing user data:', error);
        }
    };
}

export const loginUser = userData => {
  return async dispatch => {
        try {
            await AsyncStorage.setItem("UserData", JSON.stringify(userData));
            dispatch({
                type: 'LOGIN',
                payload: userData,
            });
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };
};

export const logoutUser = () => {
  return async dispatch => {
        try {
            await AsyncStorage.removeItem("UserData");
            dispatch({
                type: 'LOGOUT',
                payload: null,
            });
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };
};

export const updateUser = updatedUserData => {
    return async dispatch => {
        try {
            const userData = await AsyncStorage.getItem("UserData");
            if(userData !== null) {
                const parsedUserData = JSON.parse(userData);
                const newUserData = {
                    ...parsedUserData,
                    ...updatedUserData
                };
                await AsyncStorage.setItem("UserData", JSON.stringify(newUserData));
                dispatch({
                    type: 'LOGIN',
                    payload: newUserData,
                });
            }
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };
};