import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { getAnimationList, setFilterBy, clearStates } from '../../store/animationReducer';
import { getAnimation } from './../../store/animationDescriptionReducer';
import { Animation } from './Animation';

const AnimationContainer = ({ animation, getAnimationList, filterBy, getAnimation, clearStates,
  currentPage, sortBy, countAllAnimation, countInPage, searchValue, match }) => {
  const page = Number(match.params.page) || 1;
  const [animationList, setAnimationList] = useState([]);
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
  }, [animation, setAnimationList])
  useEffect(() => {
    const fetchData = async () => {
      await getAnimationList(page, countInPage, sortBy, filterBy, searchValue);
    }
    window.scroll(0, 0);
    fetchData();
  }, [currentPage, filterBy, sortBy, countInPage, getAnimationList, searchValue]);
  useEffect(() => {
    return () => {
      clearStates()
    }
  }, [clearStates])
  const openAnimationInfo = (info) => {
    getAnimation(info);
  }
  return (
    <Animation animationList={animationList} openAnimationInfo={openAnimationInfo} countAllAnimation={countAllAnimation}
      buttonsSortAnimation={buttonsSortAnimation} currentPage={page} />
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
    searchValue: state.animation.searchValue
  }
}
export default compose(
  connect(mapStatesToProps, { getAnimationList, getAnimation, setFilterBy, clearStates }),
  withRouter
)(AnimationContainer);