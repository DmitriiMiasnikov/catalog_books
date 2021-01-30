import { getAnimationListApi, getAnimationApi } from './../api/api';

const GET_ANIMATION_LIST = 'GET_ANIMATION_LIST';
const GET_ANIMATION = 'GET_ANIMATION';
const SET_FILTER_BY = 'SET_FILTER_BY';
const SET_PAGE = 'SET_PAGE';
const SET_COUNT_IN_PAGE = 'SET_COUNT_IN_PAGE';
const SET_SORT_BY = 'SET_SORT_BY';
const SET_COUNT_ALL_ANIMATION = 'SET_COUNT_ALL_ANIMATION';
const SET_FILTERS = 'SET_FILTERS';
const CLEAR_STATES = 'CLEAR_STATES';

let stateDefault = {
  animation: [],
  selectedAnimation: null,
  filterBy: 'все',
  sortBy: 'default',
  currentPage: 1,
  countInPage: 10,
  countAllAnimation: null,
  filters: null,
}

export const animationReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case (GET_ANIMATION_LIST): {
      return {
        ...state, animation: action.animation
      }
    }
    case (SET_FILTER_BY): {
      return {
        ...state, filterBy: action.filterBy
      }
    }
    case (SET_FILTERS): {
      return {
        ...state,
        filters: action.filters
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
    case (SET_COUNT_IN_PAGE): {
      return {
        ...state,
        countInPage: action.countInPage
      }
    }
    case (SET_SORT_BY): {
      return {
        ...state,
        sortBy: action.sortBy
      }
    }
    case (SET_COUNT_ALL_ANIMATION): {
      return {
        ...state,
        countAllAnimation: action.count
      }
    }
    case (CLEAR_STATES): {
      return {
        ...state,
        filterBy: 'все',
        sortBy: 'default',
        currentPage: 1,
        countInPage: 10,
      }
    }
    default: break
  }
  return state;
}
export const getAnimationFunc = (selectedAnimation) => {
  return { type: GET_ANIMATION, selectedAnimation }
}
export const setFilterBy = (filterBy) => {
  return { type: SET_FILTER_BY, filterBy }
}
const setFilters = (filters) => {
  return { type: SET_FILTERS, filters }
}
export const setPage = (page) => {
  return { type: SET_PAGE, page }
}
export const setCountInPage = (countInPage) => {
  return { type: SET_COUNT_IN_PAGE, countInPage }
}
export const setSortBy = (sortBy) => {
  return { type: SET_SORT_BY, sortBy }
}
export const setCounterAllAnimation = (count) => {
  return { type: SET_COUNT_ALL_ANIMATION, count }
}
export const clearStates = () => {
  return { type: CLEAR_STATES }
}

const getAnimationListFunc = (animation) => {
  return { type: GET_ANIMATION_LIST, animation }
}

export const getAnimationList = (page, counter, sort, filter) => {
  return async (dispatch) => {
    const res = await getAnimationListApi(page, counter, sort, filter);
    dispatch(getAnimationListFunc(res.data.animation));
    dispatch(setPage(Number(res.data.page)));
    dispatch(setCounterAllAnimation(Number(res.data.countAnimation)));
    // dispatch(setCountInPage(Number(res.data.countInPage)));
    dispatch(setFilters(res.data.filters));
  }
}
export const getAnimation = (id) => {
  return async (dispatch) => {
    const res = await getAnimationApi(id)
    dispatch(getAnimationFunc(res))
  }
}