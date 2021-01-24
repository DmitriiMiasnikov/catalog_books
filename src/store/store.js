import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from 'redux-thunk';
import { headerReducer } from './headerReducer';
import { mainReducer } from './mainReducer';


const reducers = combineReducers({
  header: headerReducer,
  main: mainReducer,
})
export const store = createStore(reducers, applyMiddleware(thunkMiddleware))