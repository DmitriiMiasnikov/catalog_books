import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { getAnimationList, setFilterBy, setPage, setSortBy, clearStates } from '../../store/animationReducer';
import { getAnimation } from './../../store/animationDescriptionReducer';
import { Animation } from './Animation';

const AnimationContainer = ({ animation, getAnimationList, filterBy, getAnimation, clearStates,
  currentPage, setPage, countInPage, setSortBy, sortBy }) => {
  const [animationList, setAnimationList] = useState([]);
  const [buttonsSort, setButtonsSort] = useState([
    {
      id: 0,
      text: 'по названию',
      sort: 'name',
      active: false,
    },
    {
      id: 1,
      text: 'по дате (сначала старые)',
      sort: 'date',
      active: false,
    }])
  useEffect(() => {
    setAnimationList(animation);
  }, [animation, currentPage])
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
  }, [])
  const openAnimationInfo = (info) => {
    getAnimation(info);
  }
  const sortHandler = (buttonId, sort) => {
    setSortBy(sort);
    if (currentPage !== 1) setPage(1);
    setButtonsSort(buttons => {
      return buttons.map(el => {
        if (el.id !== buttonId) {
          el.active = false
        } else {
          el.active = true
        }
        return el
      })
    })
  }
  return (
    <Animation animationList={animationList} openAnimationInfo={openAnimationInfo} buttonsSort={buttonsSort}
      sortHandler={sortHandler} countInPage={countInPage} currentPage={currentPage} />
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
  connect(mapStatesToProps, { getAnimationList, getAnimation, setFilterBy, setPage, setSortBy, clearStates }),
  withRouter
)(AnimationContainer);