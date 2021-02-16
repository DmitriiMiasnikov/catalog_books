import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { setFilterBy } from './../../store/filterReducer';
import { selectUser } from './../../store/usersReducer';
import { FiltersDom } from './FiltersDom';

const Filters = ({ setFilterBy, filtersAll, filterBy, selectedUser, userInfo, selectUser,
  searchValue, setSearchValue, history, listName, dropdownsAll, isMobile }) => {
  const [buttonsFilter, setButtonsFilter] = useState({});
  const [dropdowns, setDropdowns] = useState(dropdownsAll);
  useEffect(() => {
    if (filtersAll) {
      const dropdownsUpdate = [];
      dropdownsAll.forEach(el => {
        if (Object.keys(filtersAll).includes(el.type)) dropdownsUpdate.push(el);
      })
      dropdownsUpdate.filter(el => el).map((el, i) => {
        el.id = i
        el.closed = true;
        return el
      })
      setDropdowns(dropdownsUpdate)
    }
  }, [filtersAll, dropdownsAll])
  useEffect(() => {
    if (filtersAll) {
      const filtersCopy = {};
      dropdowns.forEach((el, i) => {
        if (filtersAll[el.type]) {
          filtersCopy[el.type] = filtersAll[el.type].map((item, j) => {
            return {
              active: !j,
              [el.type]: item
            }
          })
        }
      })
      setButtonsFilter(filtersCopy);
    }
  }, [filtersAll, dropdowns]);
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
    <FiltersDom {...{
      buttonsFilter, dropdowns, closeUsersList, filterHandler, userInfo,
      selectedUser, filterBy, cancelSeach, searchValue, isMobile }} />
  )
}

const mapStatesToProps = (state) => {
  return {
    filtersAll: state.filter.filtersAll,
    filterBy: state.filter.filterBy,
    selectedUser: state.users.selectedUser,
    userInfo: state.users.userInfo,
    searchValue: state.listSettings.searchValue,
    listName: state.list.listName,
    dropdownsAll: state.filter.dropdownsAll,
    isMobile: state.main.isMobile
  }
}

export default compose(
  connect(mapStatesToProps, { setFilterBy, selectUser }),
  withRouter
)(Filters);