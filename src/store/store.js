import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from 'redux-thunk';
import { authorsReducer } from "./authorsReducer";
import { booksReducer } from "./booksReducer";
import { headerReducer } from './headerReducer';
import { mainReducer } from './mainReducer';
import { usersReducer } from "./usersReducer";


const reducers = combineReducers({
  header: headerReducer,
  main: mainReducer,
  user: usersReducer,
  books: booksReducer,
  authors: authorsReducer
})
export const store = createStore(reducers, applyMiddleware(thunkMiddleware))