const SET_PAGE = 'SET_PAGE';
const SET_COUNT_IN_PAGE = 'SET_COUNT_IN_PAGE';
const SET_SORT_BY = 'SET_SORT_BY';
const CLEAR_STATES = 'CLEAR_STATES';
const SET_SEARCH_VALUE = 'SET_SEARCH_VALUE';
const SET_PAGE_VIEW = 'SET_PAGE_VIEW';

let stateDefault = {
  sortBy: 'default',
  currentPage: 1,
  countInPage: 10,
  countAllAnimation: null,
  searchValue: '',
  pageView: 'small',
}

export const animationReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case (SET_PAGE): {
      return { ...state, currentPage: action.page }
    }
    case (SET_PAGE_VIEW): {
      return { ...state, pageView: action.pageView }
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
    case (CLEAR_STATES): {
      return {
        ...state,
        sortBy: 'default',
        currentPage: 1,
        countInPage: 10,
        searchValue: '',
      }
    }
    default: break
  }
  return state;
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

export const clearStates = () => {
  return { type: CLEAR_STATES }
}
