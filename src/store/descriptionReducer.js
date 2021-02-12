import { getDescriptionApi, getRandomOneApi } from './../api/api';
import { setListName } from './listReducer';

const GET_RANDOM_ONE = 'GET_RANDOM_ONE';
const GET_DESCRIPTION = 'GET_DESCRIPTION';

const stateDefault = {
  selectedDescription: null,
  randomItems: null,
}

export const descriptionReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case (GET_DESCRIPTION): {
      return { ...state, selectedDescription: action.selectedDescription }
    }
    case (GET_RANDOM_ONE): {
      return { ...state, randomItems: action.randomItems }
    }
    default: break
  }
  return state;
}

export const getRandomOneFunc = (randomItems) => {
  return { type: GET_RANDOM_ONE, randomItems }
}

export const getDescriptionFunc = (selectedDescription) => {
  return { type: GET_DESCRIPTION, selectedDescription }
}

export const getDescription = (listName, id, userId = 0) => {
  return async (dispatch) => {
    const res = await getDescriptionApi(listName, id, userId)
    dispatch(setListName(listName));
    dispatch(getDescriptionFunc(res))
  }
}

export const getRandomOne = () => {
  return async (dispatch) => {
    const res = await getRandomOneApi()
    dispatch(getRandomOneFunc(res))
  }
}