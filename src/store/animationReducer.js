import { getAnimationListApi, getListApi, getDescriptionApi } from './../api/api';

const GET_ANIMATION_LIST = 'GET_ANIMATION_LIST';
const SET_FILTER_BY = 'SET_FILTER_BY';
const SET_PAGE = 'SET_PAGE';
const SET_COUNT_IN_PAGE = 'SET_COUNT_IN_PAGE';
const SET_SORT_BY = 'SET_SORT_BY';
const SET_COUNT_ALL_ANIMATION = 'SET_COUNT_ALL_ANIMATION';
const SET_FILTERS = 'SET_FILTERS';
const CLEAR_STATES = 'CLEAR_STATES';
const SET_SEARCH_VALUE = 'SET_SEARCH_VALUE';
const SET_SHOULD_REDIRECT = 'SET_SHOULD_REDIRECT';
const SET_PAGE_VIEW = 'SET_PAGE_VIEW';
const SET_USER_FILTER = 'SET_USER_FILTER';

const GET_LIST = 'GET_LIST';
const SET_COUNT_ALL = 'SET_COUNT_ALL';
const GET_DESCRIPTION = 'GET_DESCRIPTION';

let stateDefault = {
  animation: [],
  filterBy: 'все',
  sortBy: 'default',
  currentPage: 1,
  countInPage: 10,
  countAllAnimation: null,
  filters: null,
  searchValue: '',
  shouldRedirect: true,
  pageView: 'small',
  userFilter: 'all',

  list: [],
  countAll: null,
  selectedDescription: null,
}

export const animationReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case (GET_ANIMATION_LIST): {
      return { ...state, animation: action.animation }
    }
    case (SET_FILTER_BY): {
      return { ...state, filterBy: action.filterBy }
    }
    case (SET_FILTERS): {
      return { ...state, filters: action.filters }
    }
    case (SET_USER_FILTER): {
      return { ...state, userFilter: action.userFilter }
    }
    case (SET_PAGE): {
      return { ...state, currentPage: action.page }
    }
    case (SET_PAGE_VIEW): {
      return { ...state, pageView: action.pageView }
    }
    case (SET_SHOULD_REDIRECT): {
      return { ...state, shouldRedirect: !state.shouldRedirect }
    }
    case (SET_SEARCH_VALUE): {
      return { ...state, searchValue: action.searchValue }
    }
    case (SET_COUNT_IN_PAGE): {
      return { ...state, countInPage: action.countInPage }
    }
    case (SET_SORT_BY): {
      return { ...state, sortBy: action.sortBy }
    }
    case (SET_COUNT_ALL_ANIMATION): {
      return { ...state, countAllAnimation: action.count }
    }
    case (CLEAR_STATES): {
      return {
        ...state,
        filterBy: 'все',
        sortBy: 'default',
        currentPage: 1,
        countInPage: 10,
        searchValue: '',
        animation: []
      }
    }

    case (GET_LIST): {
      return { ...state, list: action.list }
    }
    case (SET_COUNT_ALL): {
      return { ...state, countAll: action.count }
    }
    case (GET_DESCRIPTION): {
      return { ...state, selectedDescription: action.selectedDescription }
    }
    default: break
  }
  return state;
}
export const setFilterBy = (filterBy) => {
  return { type: SET_FILTER_BY, filterBy }
}
const setFilters = (filters) => {
  return { type: SET_FILTERS, filters }
}
export const setUserFilter = (userFilter) => {
  return { type: SET_USER_FILTER, userFilter }
}
export const setPage = (page) => {
  return { type: SET_PAGE, page }
}
export const setPageView = (pageView) => {
  return { type: SET_PAGE_VIEW, pageView }
}
export const setSearchValue = (searchValue) => {
  return { type: SET_SEARCH_VALUE, searchValue }
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

export const getAnimationList = (page, counter, sort, filter, search, userId, userFilter) => {
  return async (dispatch) => {
    const res = await getAnimationListApi(page, counter, sort, filter, search, userId, userFilter);
    dispatch(getAnimationListFunc(res.data.animation));
    dispatch(setCounterAllAnimation(Number(res.data.countAnimation)));
    dispatch(setFilters(res.data.filters));
  }
}

const getListFunc = (list) => {
  return { type: GET_LIST, list }
}
export const setCounterAll = (count) => {
  return { type: SET_COUNT_ALL, count }
}

export const getList = (listName, page, counter, sort, filter, search, userId, userFilter) => {
  return async (dispatch) => {
    const res = await getListApi(listName, page, counter, sort, filter, search, userId, userFilter);
    dispatch(getListFunc(res.data.list));
    dispatch(setCounterAll(Number(res.data.counterAll)));
    dispatch(setFilters(res.data.filters));
  }
}

export const getDescriptionFunc = (selectedDescription) => {
  return { type: GET_DESCRIPTION, selectedDescription }
}

export const getDescription = (listName, id, userId = 0) => {
  return async (dispatch) => {
    const res = await getDescriptionApi(listName, id, userId)
    dispatch(getDescriptionFunc(res))
  }
}