import { getListApi } from './../api/api';
import { setFilters } from './filterReducer';

const SET_LIST_NAME = 'SET_LIST_NAME';
const GET_LIST = 'GET_LIST';
const SET_COUNT_ALL = 'SET_COUNT_ALL';
const CLEAR_LIST = 'CLEAR_LIST';


const stateDefault = {
  listName: null,
  list: null, 
  countAll: null
}

export const listReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case (SET_LIST_NAME): {
      return { ...state, listName: action.listName }
    }
    case (GET_LIST): {
      return { ...state, list: action.list }
    }
    case (SET_COUNT_ALL): {
      return { ...state, countAll: action.count }
    }
    case (CLEAR_LIST): {
      return { ...state, list: null }
    }
    default: break
  }
  return state;
}

export const setListName = (listName) => {
  return { type: SET_LIST_NAME, listName }
}

const getListFunc = (list) => {
  return { type: GET_LIST, list }
}
export const setCounterAll = (count) => {
  return { type: SET_COUNT_ALL, count }
}
export const clearList = () => {
  return { type: CLEAR_LIST }
}

export const getList = (listName, page, counter, sort, filter, search, userId, userFilter) => {
  return async (dispatch) => {
    const res = await getListApi(listName, page, counter, sort, filter, search, userId, userFilter);
    dispatch(getListFunc(res.data.list));
    dispatch(setCounterAll(Number(res.data.counterAll)));
    dispatch(setFilters(res.data.filters));
  }
}