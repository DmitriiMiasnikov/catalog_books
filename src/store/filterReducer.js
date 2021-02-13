
const SET_FILTER_BY = 'SET_FILTER_BY';
const SET_FILTERS = 'SET_FILTERS';
const SET_USER_FILTER = 'SET_USER_FILTER';
const CLEAR_FILTER = 'CLEAR_FILTER';


const stateDefault = {
  filters: null,
  filterBy: 'все',
  userFilter: 'all',
  dropdownsAll: [
    {
      text: 'Аудитория',
      type: 'auditory',
    },
    {
      text: 'Жанр',
      type: 'genre',
    },
    {
      text: 'Тип',
      type: 'type',
    },
    {
      text: 'Дата выхода',
      type: 'dateStart',
    },
    {
      text: 'Дата выхода',
      type: 'date',
    },
    {
      text: 'Язык оригинала',
      type: 'language',
    }
  ],
  filtersAll: null
}

export const filterReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case (SET_FILTER_BY): {
      return { ...state, filterBy: action.filterBy }
    }
    case (SET_FILTERS): {
      return { ...state, filtersAll: action.filtersAll }
    }
    case (SET_USER_FILTER): {
      return { ...state, userFilter: action.userFilter }
    }
    case (CLEAR_FILTER): {
      return { ...state, filterBy: 'все' }
    }
    default: break
  }
  return state;
}

export const setFilterBy = (filterBy) => {
  return { type: SET_FILTER_BY, filterBy }
}
export const setFilters = (filtersAll) => {
  return { type: SET_FILTERS, filtersAll }
}
export const setUserFilter = (userFilter) => {
  return { type: SET_USER_FILTER, userFilter }
}
export const clearFilter = () => {
  return { type: CLEAR_FILTER }
}