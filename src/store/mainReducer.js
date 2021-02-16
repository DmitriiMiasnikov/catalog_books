import { getLastViewedListApi, getRandomItemsByGenreApi } from './../api/api';

const GET_LAST_VIEWED = 'GET_LAST_VIEWED';
const SET_IS_MOBILE = 'SET_IS_MOBILE';
const GET_RANDOM_ITEMS_BY_GENRE = 'GET_RANDOM_ITEMS_BY_GENRE';

const stateDefault = {
  theme: 'black',
  lastViewed: null,
  isMobile: false,
  isMobileLess: false,
  randomItemsByGenre: null,
}

export const mainReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case (GET_LAST_VIEWED): {
      return { ...state, lastViewed: action.lastViewed }
    }
    case (SET_IS_MOBILE): {
      return { ...state, isMobile: action.windowWidth <= 950, isMobileLess: action.windowWidth <= 700 }
    }
    case (GET_RANDOM_ITEMS_BY_GENRE): {
      return { ...state, randomItemsByGenre: { animation: action.animation, manga: action.manga } }
    }
    default: break
  }
  return state;
}

export const setIsMobile = (windowWidth) => {
  return { type: SET_IS_MOBILE, windowWidth }
}
const getRandomItemsByGenreFunc = (animation, manga) => {
  return { type: GET_RANDOM_ITEMS_BY_GENRE, animation, manga }
}
const getLastViewedListFunc = (lastViewed) => {
  return { type: GET_LAST_VIEWED, lastViewed }
}
export const getLastViewedList = (id) => {
  return async (dispatch) => {
    const res = await getLastViewedListApi(id);
    dispatch(getLastViewedListFunc(res.data.lastViewed));
  }
}

export const getRandomItemsByGenre = () => {
  return async (dispatch) => {
    const res = await getRandomItemsByGenreApi();
    dispatch(getRandomItemsByGenreFunc(res.data.animation, res.data.manga));
  }
}