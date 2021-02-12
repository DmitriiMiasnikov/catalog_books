import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { clearStates, getDescription } from '../../store/animationReducer';
import { setListName, getList, clearList } from './../../store/listReducer';
import { setFilterBy, clearFilter } from './../../store/filterReducer';
import { ListDom } from './ListDom';

const List = ({ list, listName, getList, filterBy, getDescription, clearStates,
  currentPage, sortBy, countAll, countInPage, searchValue, match, pageView,
  selectedUser, userFilter, myUserInfo, setListName, clearList, clearFilter }) => {
  let page = Number(match.params.page) || 1;
  const [fetching, setFetching] = useState(true);
  const id = listName === 'animation' ? 'animationId' : 'mangaId';
  useEffect(() => {
    clearStates();
    clearList();
    clearFilter();
    setFetching(true);
    setListName(listName);
  }, [setListName, listName])
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
  }, [clearStates])
  const openInfo = (id) => {
    getDescription(listName, id);
  }
  return (
    <ListDom  {...{openInfo, countAll, fetching, pageView, myUserInfo, listName, id, list}} />
  )
}
const mapStatesToProps = (state) => {
  return {
    filterBy: state.filter.filterBy,
    userFilter: state.filter.userFilter,

    countInPage: state.animation.countInPage,
    currentPage: state.animation.currentPage,
    sortBy: state.animation.sortBy,
    searchValue: state.animation.searchValue,
    pageView: state.animation.pageView,

    selectedUser: state.users.selectedUser,
    myUserInfo: state.users.myUserInfo,

    list: state.list.list,
    countAll: state.list.countAll,
  }
}
export default compose(
  connect(mapStatesToProps, { getList, getDescription, setFilterBy, clearStates, clearList, setListName, clearFilter }),
  withRouter
)(List);