import { getUserApi, getUsersAnimationListApi } from './../api/api'

const SELECT_USER = 'SELECT_USER';
const GET_USER = 'GET_USER';
const GET_USERS_ANIMATION_LIST = 'GET_USERS_ANIMATION_LIST';

const stateDefault = {
  usersList: [],
  userInfo: null,
  currentUserId: 1,
  selectedUser: 1,
  isAuth: true,
  usersAnimationList: []
}

export const usersReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case (GET_USER): {
      return { ...state, userInfo: action.userInfo }
    }
    case (SELECT_USER): {
      return { ...state, selectedUser: action.id }
    }
    case (GET_USERS_ANIMATION_LIST): {
      return { ...state, usersAnimationList: action.animation }
    }
    default: break
  }
  return state;
}

export const selectUser = (id) => {
  return { type: SELECT_USER, id }
}

const getUserFunc = (userInfo) => {
  return { type: GET_USER, userInfo }
}

const getUsersAnimationListFunc = (animation) => {
  return { type: GET_USERS_ANIMATION_LIST, animation }
}

export const getUsersAnimationList = (id) => {
  return async (dispatch) => {
    const res = await getUsersAnimationListApi(id);
    dispatch(getUsersAnimationListFunc(res.data.animation));
  }
}

export const getUser = (id) => {
  return async (dispatch) => {
    const res = await getUserApi(id);
    dispatch(getUserFunc(res.data.user));
  }
}