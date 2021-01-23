import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from 'redux-thunk';
import { menuReducer } from './menuReducer';


const reducers = combineReducers({
  menu: menuReducer,
})
export const store = createStore(reducers, applyMiddleware(thunkMiddleware))