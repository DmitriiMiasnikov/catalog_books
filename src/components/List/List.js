import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { clearStates } from '../../store/listSettingsReducer';
import { setListName, getList, clearList } from './../../store/listReducer';
import { clearFilter } from './../../store/filterReducer';
import { ListDom } from './ListDom';

const List = ({ list, listName, getList, filterBy, clearStates,
  currentPage, sortBy, countAll, countInPage, searchValue, match, pageView,
  selectedUser, userFilter, setListName, clearList, clearFilter }) => {
  let page = Number(match.params.page) || 1;
  const [fetching, setFetching] = useState(true);
  useEffect(() => {
    clearStates();
    clearList();
    clearFilter();
    setFetching(true);
    setListName(listName);
  }, [setListName, listName, clearStates, clearList, clearFilter])
  useEffect(() => {
    setFetching(true);
    const fetchData = async () => {
      await getList(listName, page, countInPage, sortBy, filterBy, searchValue, selectedUser, userFilter);
      setFetching(false);
    }
    window.scroll(0, 0);
    fetchData();
  }, [listName, currentPage, filterBy, sortBy, countInPage, getList, searchValue, selectedUser, userFilter]);
  useEffect(() => {
    return () => {
      clearStates();
      clearList();
      clearFilter();
    }
  }, [clearStates, clearList, clearFilter])

  return (
    <ListDom  {...{ countAll, fetching, pageView, listName, list }} />
  )
}
const mapStatesToProps = (state) => {
  return {
    filterBy: state.filter.filterBy,
    userFilter: state.filter.userFilter,

    countInPage: state.listSettings.countInPage,
    currentPage: state.listSettings.currentPage,
    sortBy: state.listSettings.sortBy,
    searchValue: state.listSettings.searchValue,
    pageView: state.listSettings.pageView,

    selectedUser: state.users.selectedUser,

    list: state.list.list,
    countAll: state.list.countAll,
  }
}
export default compose(
  connect(mapStatesToProps, { getList, clearStates, clearList, setListName, clearFilter }),
  withRouter
)(List);