import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from 'redux-thunk';
import { animationReducer } from "./animationReducer";
import { authorsReducer } from "./authorsReducer";
import { booksReducer } from "./booksReducer";
import { headerReducer } from './headerReducer';
import { mainReducer } from './mainReducer';
import { usersReducer } from "./usersReducer";
import { animationDescriptionReducer } from './animationDescriptionReducer';
import { listReducer } from './listReducer';


const reducers = combineReducers({
  header: headerReducer,
  main: mainReducer,
  users: usersReducer,
  books: booksReducer,
  authors: authorsReducer,
  animation: animationReducer,
  animationDescription: animationDescriptionReducer,
  list: listReducer
})
export const store = createStore(reducers, applyMiddleware(thunkMiddleware))