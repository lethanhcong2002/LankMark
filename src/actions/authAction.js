// actions/authActions.js
import {persistor} from '../reducers/rootReducer';

export const loginUser = userData => {
  return {
    type: 'LOGIN',
    payload: userData,
  };
};

export const logoutUser = () => {
  persistor.purge();
  return {
    type: 'LOGOUT',
  };
};

export const updateUser = updatedUserData => {  
  return {
    type: 'UPDATE_DETAIL',
    payload: updatedUserData,
  };
};

export const updateAvatarUrl = (url) => ({
  type: 'UPDATE_AVATAR_URL',
  payload: url,
})