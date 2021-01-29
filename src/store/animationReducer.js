import { getAnimationListApi, getAnimationApi } from './../api/api';

const GET_ANIMATION_LIST = 'GET_ANIMATION_LIST';
const GET_ANIMATION = 'GET_ANIMATION';
const GET_ANIMATION_FILTERED = 'GET_ANIMATION_FILTERED';
const SET_PAGE = 'SET_PAGE';
const SET_SHOWBY = 'SET_SHOWBY';
const SET_COUNT_ALL_ANIMATION = 'SET_COUNT_ALL_ANIMATION';

let stateDefault = {
  animation: [],
  selectedAnimation: null,
  filterBy: '',
  currentPage: 1,
  showBy: 10,
  countAllAnimation: null
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
    case (SET_PAGE): {
      return {
        ...state,
        currentPage: action.page
      }
    }
    case (SET_SHOWBY): {
      return {
        ...state,
        showBy: action.showBy
      }
    }
    case (SET_COUNT_ALL_ANIMATION): {
      return {
        ...state,
        countAllAnimation: action.count
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
export const setPage = (page) => {
  return { type: SET_PAGE, page }
}
export const setShowBy = (showBy) => {
  return { type: SET_SHOWBY, showBy }
}
export const setCounterAllAnimation = (count) => {
  return { type: SET_COUNT_ALL_ANIMATION, count }
}

const getAnimationListFunc = (animation) => {
  return { type: GET_ANIMATION_LIST, animation }
}

export const getAnimationList = (page) => {
  return async (dispatch) => {
    const res = await getAnimationListApi(page)
    dispatch(getAnimationListFunc(res.data.animation));
    dispatch(setPage(res.data.page));
    dispatch(setCounterAllAnimation(res.data.countAnimation));
    dispatch(setShowBy(res.data.showBy));
  }
}

export const getAnimation = (id) => {
  return async (dispatch) => {
    const res = await getAnimationApi(id)
    dispatch(getAnimationFunc(res))
  }
}