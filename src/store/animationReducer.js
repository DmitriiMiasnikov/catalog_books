import { getAnimationListApi } from './../api/api';

const GET_ANIMATION_LIST = 'GET_ANIMATION_LIST';
const GET_ANIMATION = 'GET_ANIMATION';

let stateDefault = {
  animation: [],
  selectedAnimationId: 1,
  selectedAnimation: null,
}

export const animationReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case (GET_ANIMATION_LIST): {
      return {
        ...state, animation: action.animation
      }
    }
    case (GET_ANIMATION): {
      return {
        ...state,
        selectedAnimation: action.selectedAnimation,
        selectedAnimationId: action.selectedAnimationId
      }
    }
    default: break
  }
  return state;
}
export const getAnimation = (selectedAnimation, selectedAnimationId) => {
  return { type: GET_ANIMATION, selectedAnimation, selectedAnimationId }
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