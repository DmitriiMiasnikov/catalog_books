import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { getAnimationList, setFilterBy, clearStates } from '../../store/animationReducer';
import { getAnimation } from './../../store/animationDescriptionReducer';
import { Animation } from './Animation';

const AnimationContainer = ({ animation, getAnimationList, filterBy, getAnimation, clearStates,
  currentPage, countInPage, sortBy }) => {
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
  }, [animation, currentPage, setAnimationList])
  useEffect(() => {
    const fetchData = async () => {
      await getAnimationList(currentPage, countInPage, sortBy, filterBy);
    }
    window.scroll(0, 0);
    fetchData();
  }, [currentPage, filterBy, sortBy, countInPage, getAnimationList]);
  useEffect(() => {
    return () => {
      clearStates()
    }
  }, [clearStates])
  const openAnimationInfo = (info) => {
    getAnimation(info);
  }
  return (
    <Animation animationList={animationList} openAnimationInfo={openAnimationInfo} 
      buttonsSortAnimation={buttonsSortAnimation} countInPage={countInPage} currentPage={currentPage} />
  )
}
const mapStatesToProps = (state) => {
  return {
    animation: state.animation.animation,
    filterBy: state.animation.filterBy,
    countInPage: state.animation.countInPage,
    currentPage: state.animation.currentPage,
    sortBy: state.animation.sortBy,
  }
}
export default compose(
  connect(mapStatesToProps, { getAnimationList, getAnimation, setFilterBy, clearStates }),
  withRouter
)(AnimationContainer);