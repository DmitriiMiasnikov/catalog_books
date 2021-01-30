import { getAnimationApi } from './../api/api';

const GET_ANIMATION = 'GET_ANIMATION';

const stateDefault = {
  selectedAnimation: null,
}

export const animationDescriptionReducer = (state = stateDefault, action) => {
  switch(action.type) {
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

export const getAnimation = (id) => {
  return async (dispatch) => {
    const res = await getAnimationApi(id)
    dispatch(getAnimationFunc(res))
  }
}