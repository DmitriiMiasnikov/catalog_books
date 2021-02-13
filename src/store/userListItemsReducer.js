import { getUserListItemsApi } from './../api/api';


const GET_USER_LIST_ITEMS_REST_COUNT = 'GET_USER_LIST_ITEMS_REST_COUNT';
const GET_USER_LIST_ITEMS_FIVE = 'GET_USER_LIST_ITEMS_FIVE';
const GET_USER_LIST_ITEMS_ALL_LIST = 'GET_USER_LIST_ITEMS_ALL_LIST';

const stateDefault = {
  userListItems: null,
  userListItemsFive: null,
  userListItemsRest: null
}

export const userListItemsReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case (GET_USER_LIST_ITEMS_REST_COUNT): {
      return { ...state, userListItemsRest: action.userListItemsRest }
    }
    case (GET_USER_LIST_ITEMS_FIVE): {
      return { ...state, userListItemsFive: action.userListItemsFive }
    }
    case (GET_USER_LIST_ITEMS_ALL_LIST): {
      return { ...state, userListItems: action.userListItems }
    }
    default: break
  }
  return state;
}

const getUserListItemsRestCount = (userListItemsRest) => {
  return { type: GET_USER_LIST_ITEMS_REST_COUNT, userListItemsRest }
}
const getUserListItemsFunc = (userListItemsFive) => {
  return { type: GET_USER_LIST_ITEMS_FIVE, userListItemsFive }
}
const getUserListItemsAllListFunc = (userListItems) => {
  return { type: GET_USER_LIST_ITEMS_ALL_LIST, userListItems }
}
export const getUserListItems = (id) => {
  return async (dispatch) => {
    const res = await getUserListItemsApi(id);
    dispatch(getUserListItemsAllListFunc(res.data.userListItems));
    dispatch(getUserListItemsFunc(res.data.userListItemsFive));
    dispatch(getUserListItemsRestCount(res.data.userListItemsRest));
  }
}