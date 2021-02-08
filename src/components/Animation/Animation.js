import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { getAnimationList, setFilterBy, clearStates } from '../../store/animationReducer';
import { getAnimation } from './../../store/animationDescriptionReducer';
import { AnimationDom } from './AnimationDom';

const Animation = ({ animation, getAnimationList, filterBy, getAnimation, clearStates,
  currentPage, sortBy, countAllAnimation, countInPage, searchValue, match, pageView,
  selectedUser, userFilter, myUserInfo }) => {
  let page = Number(match.params.page) || 1;
  const [fetching, setFetching] = useState(true);
  const [animationList, setAnimationList] = useState(animation);
  const buttonsSortAnimation = [{
      id: 0,
      subButtons: [{
        id: 0,
        sort: 'name',
        text: 'алфавитный порядок',
        active: false
      }, 
      {
        id: 1,
        sort: 'name_reverse',
        text: 'с конца алфавита',
        active: false
      }]
    },
    {
      id: 1,
      subButtons: [{
        id: 0,
        sort: 'date_reverse',
        text: 'сначала новые',
        active: false
      }, 
      {
        id: 1,
        sort: 'date',
        text: 'сначала старые',
        active: false
      }]
    }];
  useEffect(() => {
    setAnimationList(animation);
    setFetching(false);
  }, [animation, setAnimationList])
  useEffect(() => {
    setFetching(true);
    const fetchData = async () => {
      await getAnimationList(page, countInPage, sortBy, filterBy, searchValue, selectedUser, userFilter);
    }
    window.scroll(0, 0);
    fetchData();
  }, [currentPage, filterBy, sortBy, countInPage, getAnimationList, searchValue, selectedUser, userFilter]);
  useEffect(() => {
    return () => {
      clearStates();
    }
  }, [clearStates])
  const openAnimationInfo = (info) => {
    getAnimation(info);
  }
  return (
    <AnimationDom animationList={animationList} openAnimationInfo={openAnimationInfo} countAllAnimation={countAllAnimation}
      buttonsSortAnimation={buttonsSortAnimation} currentPage={page} fetching={fetching} pageView={pageView} myUserInfo={myUserInfo}/>
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
    userFilter: state.animation.userFilter,
    myUserInfo: state.users.myUserInfo
  }
}
export default compose(
  connect(mapStatesToProps, { getAnimationList, getAnimation, setFilterBy, clearStates }),
  withRouter
)(Animation);