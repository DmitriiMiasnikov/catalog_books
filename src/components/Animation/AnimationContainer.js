import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { getAnimationList, setFilterBy, clearStates, setShouldRedirect } from '../../store/animationReducer';
import { getAnimation } from './../../store/animationDescriptionReducer';
import { selectUser } from './../../store/usersReducer';
import { Animation } from './Animation';

const AnimationContainer = ({ animation, getAnimationList, filterBy, getAnimation, clearStates,
  currentPage, sortBy, countAllAnimation, countInPage, searchValue, match, setShouldRedirect, pageView,
  selectedUser, selectUser, userInfo }) => {
  const page = Number(match.params.page) || 1;
  const [fetching, setFetching] = useState(true);
  const [animationList, setAnimationList] = useState(animation);
  const buttonsSortAnimation = [
    {
      text: 'названию',
      sort: 'name',
      direction: 'direct'
    },
    {
      text: 'дате',
      sort: 'date',
      direction: 'direct'
    }];
  useEffect(() => {
    setAnimationList(animation);
    setFetching(false);
  }, [animation, setAnimationList])
  useEffect(() => {
    setFetching(true);
    const fetchData = async () => {
      await getAnimationList(page, countInPage, sortBy, filterBy, searchValue, selectedUser);
    }
    window.scroll(0, 0);
    fetchData();
  }, [currentPage, filterBy, sortBy, countInPage, getAnimationList, searchValue, selectedUser]);
  useEffect(() => {
    return () => {
      clearStates();
    }
  }, [clearStates])
  useEffect(() => {
    setShouldRedirect(false);
  }, [setShouldRedirect])
  const openAnimationInfo = (info) => {
    getAnimation(info);
  }
  const closeUsersList = () => {
    selectUser(0);
  }
  return (
    <Animation animationList={animationList} openAnimationInfo={openAnimationInfo} countAllAnimation={countAllAnimation}
      buttonsSortAnimation={buttonsSortAnimation} currentPage={page} fetching={fetching} pageView={pageView} 
      closeUsersList={closeUsersList} userInfo={userInfo} selectedUser={selectedUser}/>
  )
}
const mapStatesToProps = (state) => {
  return {
    animation: state.animation.animation,
    filterBy: state.animation.filterBy,
    countAllAnimation: state.animation.countAllAnimation,
    countInPage: state.animation.countInPage,
    currentPage: state.animation.currentPage,
    sortBy: state.animation.sortBy,
    searchValue: state.animation.searchValue,
    pageView: state.animation.pageView,
    selectedUser: state.users.selectedUser,
    userInfo: state.users.userInfo
  }
}
export default compose(
  connect(mapStatesToProps, { getAnimationList, getAnimation, setFilterBy, clearStates, setShouldRedirect, selectUser }),
  withRouter
)(AnimationContainer);