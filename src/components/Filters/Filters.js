import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { setFilterBy } from './../../store/filterReducer';
import { selectUser } from './../../store/usersReducer';
import { FiltersDom } from './FiltersDom';

const Filters = ({ setFilterBy, filters, filterBy, selectedUser, userInfo, selectUser,
  searchValue, setSearchValue, history, listName }) => {
  const [buttonsFilter, setButtonsFilter] = useState({});
  const [dropdowns, setDropdowns] = useState([
    {
      id: 0,
      text: 'Аудитория',
      type: 'auditory',
      closed: true,
    },
    {
      id: 1,
      text: 'Жанр',
      type: 'genre',
      closed: true,
    },
    {
      id: 2,
      text: 'Тип',
      type: 'type',
      closed: true,
    },
    {
      id: 3,
      text: 'Дата выхода',
      type: 'dateStart',
      closed: true,
    }
  ])
  useEffect(() => {
    if (filters && !Object.keys(buttonsFilter).length) {
      const filtersCopy = {};
      dropdowns.forEach((el, i) => {
        filtersCopy[el.type] = filters[el.type].map((item, j) => {
          return {
            active: !j,
            [el.type]: item
          }
        })
      })
      setButtonsFilter(filtersCopy);
    }
  }, [filters, dropdowns, buttonsFilter]);
  const openDropdown = (dropdownId) => {
    setDropdowns(dropdowns.map(el => {
      if (el.id === dropdownId) {
        el.closed ? el.closed = false : el.closed = true
      } else {
        el.closed = true;
      }
      return el;
    }))
  }
  const filterHandler = (dropdown, filterBy, indexButton) => {
    setFilterBy(filterBy);
    history.push(`/list/${listName}/1`);
    setButtonsFilter((buttons) => {
      const obj = {};
      Object.keys(buttons).forEach((el, i) => {
        obj[el] = buttons[el];
        if (dropdown === el) {
          obj[el].map((item, j) => {
            if (j === indexButton) {
              item.active = true
            } else item.active = false
            return item;
          })
        } else obj[el].map((item, j) => {
          item.active = false
          return item;
        })
      })
      return obj;
    })
  }
  const closeUsersList = () => {
    selectUser(0);
  }
  const cancelSeach = () => {
    setSearchValue('');
  }
  return (
    <FiltersDom {...{buttonsFilter, dropdowns, closeUsersList, openDropdown, filterHandler, userInfo,
      selectedUser, filterBy, cancelSeach, searchValue, listName}} />
  )
}

const mapStatesToProps = (state) => {
  return {
    animation: state.animation.animation,
    filters: state.filter.filters,
    filterBy: state.filter.filterBy,
    selectedUser: state.users.selectedUser,
    userInfo: state.users.userInfo,
    searchValue: state.animation.searchValue,
    listName: state.list.listName
  }
}

export default compose(
  connect(mapStatesToProps, { setFilterBy, selectUser }),
  withRouter
) (Filters);