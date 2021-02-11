import { getLastViewedListApi } from './../api/api';

const GET_LAST_VIEWED = 'GET_LAST_VIEWED';


const stateDefault = {
  theme: 'black',
  lastViewed: null,
}

export const mainReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case (GET_LAST_VIEWED): {
      return { ...state, lastViewed: action.lastViewed }
    }
    default: break
  }
  return state;
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