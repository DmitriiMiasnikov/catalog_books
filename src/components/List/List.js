import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { getList, setFilterBy, clearStates, getDescription } from '../../store/animationReducer';
import { ListDom } from './ListDom';

const List = ({ list, listName, getList, filterBy, getDescription, clearStates,
  currentPage, sortBy, countAll, countInPage, searchValue, match, pageView,
  selectedUser, userFilter, myUserInfo }) => {
  let page = Number(match.params.page) || 1;
  const [fetching, setFetching] = useState(true);
  const [currentList, setCurrentList] = useState(list);
  const id = listName === 'animation' ? 'animationId' : 'mangaId';
  useEffect(() => {
    setCurrentList(list);
    setFetching(false);
  }, [list, setCurrentList])
  useEffect(() => {
    setFetching(true);
    const fetchData = async () => {
      await getList(listName, page, countInPage, sortBy, filterBy, searchValue, selectedUser, userFilter);
    }
    window.scroll(0, 0);
    fetchData();
  }, [listName, currentPage, filterBy, sortBy, countInPage, getList, searchValue, selectedUser, userFilter]);
  useEffect(() => {
    return () => {
      clearStates();
    }
  }, [clearStates])
  const openInfo = (id) => {
    getDescription(listName, id);
  }
  return (
    <ListDom  {...{currentList, openInfo, countAll, fetching, pageView, myUserInfo, listName, id}} />
  )
}
const mapStatesToProps = (state) => {
  return {
    filterBy: state.animation.filterBy,
    countAll: state.animation.countAll,
    countInPage: state.animation.countInPage,
    currentPage: state.animation.currentPage,
    sortBy: state.animation.sortBy,
    searchValue: state.animation.searchValue,
    pageView: state.animation.pageView,
    selectedUser: state.users.selectedUser,
    userFilter: state.animation.userFilter,
    myUserInfo: state.users.myUserInfo,
    list: state.animation.list
  }
}
export default compose(
  connect(mapStatesToProps, { getList, getDescription, setFilterBy, clearStates }),
  withRouter
)(List);