import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from 'redux-thunk';
import { booksReducer } from "./booksReducer";
import { headerReducer } from './headerReducer';
import { mainReducer } from './mainReducer';
import { userReducer } from "./userReducer";


const reducers = combineReducers({
  header: headerReducer,
  main: mainReducer,
  user: userReducer,
  books: booksReducer
})
export const store = createStore(reducers, applyMiddleware(thunkMiddleware))