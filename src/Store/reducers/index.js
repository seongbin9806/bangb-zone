import {createStore, combineReducers} from 'redux';
import loginReducer from './loginReducer';

const rootReducer = combineReducers({
  loginReducer,
});

const store = createStore(rootReducer);

export default store;
