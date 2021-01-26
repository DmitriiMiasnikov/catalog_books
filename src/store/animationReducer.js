import { getAnimationApi } from './../api/api';

const GET_ANIMATION = 'GET_ANIMATION';

let stateDefault = {
  animation: []
}

export const animationReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case (GET_ANIMATION): {
      return {
        ...state, animation: action.animation
      }
    }
    default: break
  }
  return state;
}

const getAnimationFunc = (animation) => {
  return { type: GET_ANIMATION, animation }
}

export const getAnimation = () => {
  return async (dispatch) => {
    const res = await getAnimationApi()
    dispatch(getAnimationFunc(res))
  }
}