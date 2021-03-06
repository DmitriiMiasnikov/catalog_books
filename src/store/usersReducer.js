import {
  getUserApi, setUserInfoListsApi, userRegistrationApi, userAuthorizationApi, getUsersListApi, getUsersListMenuApi,
  setUserFavoritesApi
} from './../api/api';

const SELECT_USER = 'SELECT_USER';
const SET_MY_USER_INFO = 'SET_MY_USER_INFO';
const SET_USER_INFO = 'SET_USER_INFO';
const IS_AUTH = 'IS_AUTH';
const SET_CURRENT_USER_ID = 'SET_CURRENT_USER_ID';
const SET_IS_WRONG_AUTHORIZATION = 'SET_IS_WRONG_AUTHORIZATION';
const CLEAR_CURRENT_USER_INFO = 'CLEAR_CURRENT_USER_INFO';
const GET_USERS_LIST = 'GET_USERS_LIST';
const GET_USERS_LIST_MENU = 'GET_USERS_LIST_MENU';
const SHOW_REGISTRATION = 'SHOW_REGISTRATION';

const stateDefault = {
  usersList: null,
  usersListMenu: null,
  myUserInfo: null,
  userInfo: null,
  currentUserId: null,
  selectedUser: 0,
  isAuth: false,
  isWrongAuthorization: false,
  showRegistration: false,
}

export const usersReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case (GET_USERS_LIST): {
      return { ...state, usersList: action.users }
    }
    case (GET_USERS_LIST_MENU): {
      return { ...state, usersListMenu: action.users }
    }
    case (SET_MY_USER_INFO): {
      return { ...state, myUserInfo: action.myUserInfo }
    }
    case (SET_USER_INFO): {
      return { ...state, userInfo: action.userInfo }
    }
    case (SELECT_USER): {
      return { ...state, selectedUser: action.id }
    }
    case (SHOW_REGISTRATION): {
      return { ...state, showRegistration: action.show }
    }
    case (IS_AUTH): {
      return { ...state, isAuth: action.isAuth }
    }
    case (CLEAR_CURRENT_USER_INFO): {
      return { ...state, isAuth: false, myUserInfo: null, currentUserId: null, myFavorites: null }
    }
    case (SET_IS_WRONG_AUTHORIZATION): {
      return { ...state, isWrongAuthorization: action.isWrongAuthorization }
    }
    case (SET_CURRENT_USER_ID): {
      return { ...state, currentUserId: action.id }
    }
    default: break
  }
  return state;
}

const getUsersListFunc = (users) => {
  return { type: GET_USERS_LIST, users }
}
const getUsersListMenuFunc = (users) => {
  return { type: GET_USERS_LIST_MENU, users }
}
export const selectUser = (id) => {
  return { type: SELECT_USER, id }
}
export const setShowRegistration = (show) => {
  return { type: SHOW_REGISTRATION, show }
}
export const setIsAuth = (isAuth) => {
  return { type: IS_AUTH, isAuth }
}
export const clearCurrentUserInfo = () => {
  return { type: CLEAR_CURRENT_USER_INFO }
}
export const setIsWrongAuthorization = (isWrongAuthorization) => {
  return { type: SET_IS_WRONG_AUTHORIZATION, isWrongAuthorization }
}
export const setCurrentUserId = (id) => {
  return { type: SET_CURRENT_USER_ID, id }
}

const setMyUserInfoFunc = (myUserInfo) => {
  return { type: SET_MY_USER_INFO, myUserInfo }
}
const setUserInfoFunc = (userInfo) => {
  return { type: SET_USER_INFO, userInfo }
}

export const getUsersList = () => {
  return async (dispatch) => {
    const res = await getUsersListApi();
    dispatch(getUsersListFunc(res.data.users));
  }
}

export const getUsersListMenu = () => {
  return async (dispatch) => {
    const res = await getUsersListMenuApi();
    dispatch(getUsersListMenuFunc(res.data.users));
  }
}

export const getMyUserInfo = (id) => {
  return async (dispatch) => {
    const res = await getUserApi(id);
    dispatch(setMyUserInfoFunc(res.data.user));
  }
}
export const getUser = (id) => {
  return async (dispatch) => {
    const res = await getUserApi(id);
    dispatch(setUserInfoFunc(res.data.user));
  }
}

export const setUserInfoLists = (userId, list, id, type) => {
  return async dispatch => {
    const res = await setUserInfoListsApi(userId, list, id, type);
    dispatch(setMyUserInfoFunc(res.data.user));
    dispatch(setUserInfoFunc(res.data.user));
  }
}

export const setUserFavorites = (userId, list, id, rating) => {
  return async dispatch => {
    const res = await setUserFavoritesApi(userId, list, id, rating);
    dispatch(setMyUserInfoFunc(res.data.user));
    dispatch(setUserInfoFunc(res.data.user));
  }
}

export const userRegistration = (userName, password, email) => {
  return async dispatch => {
    const res = await userRegistrationApi(userName, password, email);
    dispatch(setIsAuth(res.data.isAuth));
    dispatch(setCurrentUserId(res.data.user.userId))
  }
}

export const userAuthorization = (userName, password) => {
  return async dispatch => {
    dispatch(setIsWrongAuthorization(false));
    const res = await userAuthorizationApi(userName, password);
    dispatch(setIsAuth(res.data.isAuth));
    if (res.data.isAuth) {
      dispatch(setCurrentUserId(res.data.user.userId));
      dispatch(setMyUserInfoFunc(res.data.user));
    } else {
      dispatch(setIsWrongAuthorization(true));
    }
  }
}