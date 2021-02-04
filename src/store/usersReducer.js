import { getUserApi, getUsersAnimationListApi, setUsersAnimationApi, userRegistrationApi } from './../api/api';
import { setCounterAllAnimation } from './animationReducer';

const SELECT_USER = 'SELECT_USER';
const GET_MY_USER_INFO = 'GET_MY_USER_INFO';
const GET_USER_INFO = 'GET_USER_INFO';
const GET_USERS_ANIMATION_LIST = 'GET_USERS_ANIMATION_LIST';
const GET_REST_COUNT_ANIMATION = 'GET_REST_COUNT_ANIMATION';
const GET_USERS_ALL_ANIMATION_LIST = 'GET_USERS_ALL_ANIMATION_LIST';

const stateDefault = {
  usersList: [],
  myUserInfo: null,
  userInfo: null,
  currentUserId: 1,
  selectedUser: 0,
  isAuth: true,
  usersAnimationList: [],
  usersAllAnimationList: [],
  restCountAnimation: 0,
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
const getMyUserInfoFunc = (myUserInfo) => {
  return { type: GET_MY_USER_INFO, myUserInfo }
}
const getUserInfoFunc = (userInfo) => {
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
    dispatch(getMyUserInfoFunc(res.data.user));
  }
}
export const getUser = (id) => {
  return async (dispatch) => {
    const res = await getUserApi(id);
    dispatch(getUserInfoFunc(res.data.user));
  }
}

export const setUsersAnimation = (userId, animationId, type) => {
  return async dispatch => {
    const res = await setUsersAnimationApi(userId, animationId, type);
    dispatch(getMyUserInfoFunc(res.data.user));
    dispatch(getUserInfoFunc(res.data.user));
  }
}

export const userRegistration = (userName, password, email) => {
  return async dispatch => {
    const res = await userRegistrationApi(userName, password, email);
  }
}