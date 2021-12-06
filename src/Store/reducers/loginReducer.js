import {LOGIN, LOGIN_USER, LOGOUT_USER} from '../actions/userAction';
import AsyncStorage from '@react-native-community/async-storage';

const initialState = {
  devcie_token: '',
  token: 'false',
  id: '',
  isLogedin: false,
  selectDevice: '0'
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        ...action.payload,
      };
    case LOGOUT_USER:
      return {...initialState};
    case LOGIN:
      return {...state, isLogedin: action.value};
    default:
      return state;
  }
};

export default loginReducer;
