import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from 'redux-thunk';
import { listSettingsReducer } from "./listSettingsReducer";
import { authorsReducer } from "./authorsReducer";
import { booksReducer } from "./booksReducer";
import { headerReducer } from './headerReducer';
import { mainReducer } from './mainReducer';
import { usersReducer } from "./usersReducer";
import { descriptionReducer } from './descriptionReducer';
import { listReducer } from './listReducer';
import { filterReducer } from './filterReducer';
import { userListItemsReducer } from './userListItemsReducer';


const reducers = combineReducers({
  header: headerReducer,
  main: mainReducer,
  users: usersReducer,
  books: booksReducer,
  authors: authorsReducer,
  listSettings: listSettingsReducer,
  description: descriptionReducer,
  list: listReducer,
  filter: filterReducer,
  userListItems: userListItemsReducer, 
})
export const store = createStore(reducers, applyMiddleware(thunkMiddleware))