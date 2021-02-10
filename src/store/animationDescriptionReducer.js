import { getAnimationApi, getRandomAnimationApi } from './../api/api';

const GET_ANIMATION = 'GET_ANIMATION';
const GET_RANDOM_ANIMATION = 'GET_RANDOM_ANIMATION';

const stateDefault = {
  selectedAnimation: null,
  randomAnimation: null,
}

export const animationDescriptionReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case (GET_ANIMATION): {
      return { ...state, selectedAnimation: action.selectedAnimation }
    }
    case (GET_RANDOM_ANIMATION): {
      return { ...state, randomAnimation: action.randomAnimation }
    }
    default: break
  }
  return state;
}

export const getAnimationFunc = (selectedAnimation) => {
  return { type: GET_ANIMATION, selectedAnimation }
}

export const getRandomAnimationFunc = (randomAnimation) => {
  return { type: GET_RANDOM_ANIMATION, randomAnimation }
}


export const getAnimation = (id, userId = 0) => {
  return async (dispatch) => {
    const res = await getAnimationApi(id, userId)
    dispatch(getAnimationFunc(res))
  }
}

export const getRandomAnimation = () => {
  return async (dispatch) => {
    const res = await getRandomAnimationApi()
    dispatch(getRandomAnimationFunc(res))
  }
}