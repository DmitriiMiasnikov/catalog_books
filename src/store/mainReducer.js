import { getLastViewedListApi } from './../api/api';

const GET_LAST_VIEWED = 'GET_LAST_VIEWED';
const SET_IS_MOBILE = 'SET_IS_MOBILE';


const stateDefault = {
  theme: 'black',
  lastViewed: null,
  isMobile: false,
}

export const mainReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case (GET_LAST_VIEWED): {
      return { ...state, lastViewed: action.lastViewed }
    }
    case (SET_IS_MOBILE): {
      return { ...state, isMobile: action.windowWidth < 950 }
    }
    default: break
  }
  return state;
}

export const setIsMobile = (windowWidth) => {
  return { type: SET_IS_MOBILE, windowWidth }
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