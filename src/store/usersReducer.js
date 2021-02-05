import {
  getUserApi, getUsersAnimationListApi, setUsersAnimationApi,
  userRegistrationApi, userAuthorizationApi
} from './../api/api';
import { setCounterAllAnimation } from './animationReducer';

const SELECT_USER = 'SELECT_USER';
const GET_MY_USER_INFO = 'GET_MY_USER_INFO';
const GET_USER_INFO = 'GET_USER_INFO';
const GET_USERS_ANIMATION_LIST = 'GET_USERS_ANIMATION_LIST';
const GET_REST_COUNT_ANIMATION = 'GET_REST_COUNT_ANIMATION';
const GET_USERS_ALL_ANIMATION_LIST = 'GET_USERS_ALL_ANIMATION_LIST';
const IS_AUTH = 'IS_AUTH';
const SET_CURRENT_USER_ID = 'SET_CURRENT_USER_ID';
const SET_IS_WRONG_AUTHORIZATION = 'SET_IS_WRONG_AUTHORIZATION';
const CLEAR_CURRENT_USER_INFO = 'CLEAR_CURRENT_USER_INFO';

const stateDefault = {
  usersList: [],
  myUserInfo: null,
  userInfo: null,
  currentUserId: null,
  selectedUser: 0,
  isAuth: false,
  usersAnimationList: [],
  usersAllAnimationList: [],
  restCountAnimation: 0,
  isWrongAuthorization: false,

}

export const usersReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case (GET_MY_USER_INFO): {
      return { ...state, myUserInfo: action.myUserInfo }
    }
    case (GET_USER_INFO): {
      return { ...state, userInfo: action.userInfo }
    }
    case (SELECT_USER): {
      return { ...state, selectedUser: action.id }
    }
    case (IS_AUTH): {
      return { ...state, isAuth: action.isAuth }
    }
    case (CLEAR_CURRENT_USER_INFO): {
      return { ...state, isAuth: false, myUserInfo: null, currentUserId: null }
    }
    case (SET_IS_WRONG_AUTHORIZATION): {
      return { ...state, isWrongAuthorization: action.isWrongAuthorization }
    }
    case (SET_CURRENT_USER_ID): {
      return { ...state, currentUserId: action.id }
    }
    case (GET_REST_COUNT_ANIMATION): {
      return { ...state, restCountAnimation: action.rest }
    }
    case (GET_USERS_ANIMATION_LIST): {
      return { ...state, usersAnimationList: action.animation }
    }
    case (GET_USERS_ALL_ANIMATION_LIST): {
      return { ...state, usersAllAnimationList: action.animation }
    }
    default: break
  }
  return state;
}

export const selectUser = (id) => {
  return { type: SELECT_USER, id }
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
  return { type: GET_MY_USER_INFO, myUserInfo }
}
const setUserInfoFunc = (userInfo) => {
  return { type: GET_USER_INFO, userInfo }
}
const getRestCountAnimation = (rest) => {
  return { type: GET_REST_COUNT_ANIMATION, rest }
}
const getUsersAnimationListFunc = (animation) => {
  return { type: GET_USERS_ANIMATION_LIST, animation }
}
const getUsersAllAnimationListFunc = (animation) => {
  return { type: GET_USERS_ALL_ANIMATION_LIST, animation }
}
export const getUsersAnimationList = (id) => {
  return async (dispatch) => {
    const res = await getUsersAnimationListApi(id);
    dispatch(getUsersAllAnimationListFunc(res.data.animation));
    dispatch(getUsersAnimationListFunc(res.data.animationFive));
    dispatch(getRestCountAnimation(res.data.rest));
    dispatch(setCounterAllAnimation(Number(res.data.countAnimation)));
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

export const setUsersAnimation = (userId, animationId, type) => {
  return async dispatch => {
    const res = await setUsersAnimationApi(userId, animationId, type);
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