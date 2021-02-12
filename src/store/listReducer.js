// import { getLastViewedListApi } from './../api/api';

const SET_LIST_NAME = 'SET_LIST_NAME';


const stateDefault = {
  listName: null
}

export const listReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case (SET_LIST_NAME): {
      return { ...state, listName: action.listName }
    }
    default: break
  }
  return state;
}

export const setListName = (listName) => {
  return { type: SET_LIST_NAME, listName }
}
