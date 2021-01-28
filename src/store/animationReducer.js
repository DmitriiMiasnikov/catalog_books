import { getAnimationListApi, getAnimationApi } from './../api/api';

const GET_ANIMATION_LIST = 'GET_ANIMATION_LIST';
const GET_ANIMATION = 'GET_ANIMATION';
const GET_ANIMATION_FILTERED = 'GET_ANIMATION_FILTERED';

let stateDefault = {
  animation: [],
  selectedAnimation: null,
  filterBy: ''
}

export const animationReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case (GET_ANIMATION_LIST): {
      return {
        ...state, animation: action.animation
      }
    }
    case (GET_ANIMATION_FILTERED): {
      return {
        ...state, filterBy: action.filterBy
      }
    }
    case (GET_ANIMATION): {
      return {
        ...state,
        selectedAnimation: action.selectedAnimation
      }
    }
    default: break
  }
  return state;
}
export const getAnimationFunc = (selectedAnimation) => {
  return { type: GET_ANIMATION, selectedAnimation }
}
export const getAnimationFilter = (filterBy) => {
  return { type: GET_ANIMATION_FILTERED, filterBy }
}

const getAnimationListFunc = (animation) => {
  return { type: GET_ANIMATION_LIST, animation }
}

export const getAnimationList = () => {
  return async (dispatch) => {
    const res = await getAnimationListApi()
    dispatch(getAnimationListFunc(res))
  }
}

export const getAnimation = (id) => {
  return async (dispatch) => {
    const res = await getAnimationApi(id)
    dispatch(getAnimationFunc(res))
  }
}