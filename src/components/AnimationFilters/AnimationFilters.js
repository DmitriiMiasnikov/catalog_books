import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getAnimationList, setFilterBy, setPage, setSearchValue } from './../../store/animationReducer';
import { selectUser } from './../../store/usersReducer';
import { AnimationFiltersDom } from './AnimationFiltersDom';

const AnimationFilters = ({ setFilterBy, filters, filterBy, setPage, selectedUser, userInfo, selectUser,
  searchValue, setSearchValue }) => {
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
    setPage(1);
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
    <AnimationFiltersDom buttonsFilter={buttonsFilter} dropdowns={dropdowns} closeUsersList={closeUsersList}
      openDropdown={openDropdown} filterHandler={filterHandler} userInfo={userInfo} selectedUser={selectedUser} 
      filterBy={filterBy} cancelSeach={cancelSeach} searchValue={searchValue}/>
  )
}

const mapStatesToProps = (state) => {
  return {
    animation: state.animation.animation,
    filters: state.animation.filters,
    filterBy: state.animation.filterBy,
    selectedUser: state.users.selectedUser,
    userInfo: state.users.userInfo,
    searchValue: state.animation.searchValue
  }
}

export default connect(mapStatesToProps, { getAnimationList, setFilterBy, setPage, selectUser, setSearchValue })(AnimationFilters);