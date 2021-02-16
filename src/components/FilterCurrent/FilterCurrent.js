import React from 'react';
import { connect } from 'react-redux';
import { FilterCurrentDom } from './FilterCurrentDom';
import { selectUser } from './../../store/usersReducer';
import { setSearchValue } from './../../store/listSettingsReducer';
import { setFilterBy } from './../../store/filterReducer';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

const FilterCurrent = ({ selectedUser, userInfo, searchValue, setSearchValue, filterBy, setFilterBy, selectUser }) => {

  const closeUsersList = () => {
    selectUser(0);
  }
  const cancelSeach = () => {
    setSearchValue('');
  }
  const cancelFilter = () => {
    setFilterBy('все');
  }
  return (
    <FilterCurrentDom {...{ selectedUser, userInfo, closeUsersList, searchValue, cancelSeach,
      filterBy, cancelFilter }}/>
  )
}
const mapStatesToProps = (state) => {
  return {
    selectedUser: state.users.selectedUser,
    userInfo: state.users.userInfo,
    searchValue: state.listSettings.searchValue,
    filterBy: state.filter.filterBy,
    listName: state.list.listName,
  }
}

export default compose(
  connect(mapStatesToProps, { selectUser, setSearchValue, setFilterBy }),
  withRouter
)(FilterCurrent)