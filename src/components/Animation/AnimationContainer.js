import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { getAnimationList, getAnimation, getAnimationFilter, setPage } from '../../store/animationReducer';
import { Animation } from './Animation';

const AnimationContainer = ({ animation, getAnimationList, filterBy, getAnimation, getAnimationFilter,
  currentPage, setPage, countAllAnimation, showBy }) => {
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
  const [pagesButtons, setPagesButtons] = useState([]);
  const setPagesFunc = (currentPage) => {
    const pages = [];
    let pagesCount = Math.ceil(countAllAnimation / showBy);
    for (let i = currentPage > 3 ? currentPage - 3 : 1;
      i >= pagesCount - 3 ? i <= pagesCount : i <= pagesCount + 3;
      i++) {
      pages.push({ page: i, active: i === 1 })
    }
    setPagesButtons(pages);
  }
  useEffect(() => {
    setAnimationList(animation);
  }, [animation])
  const loadAnimation = useCallback(async () => {
    await getAnimationList(currentPage);
  }, [getAnimationList, currentPage])
  useEffect(() => {
    loadAnimation();
  }, [currentPage]);
  useEffect(() => {
    if (filterBy) {
      loadAnimation();
      if (filterBy === 'все') {
        setAnimationList(animation);
      } else setAnimationList(animation.filter(el => el.auditory === filterBy));
    }
    setPagesFunc(currentPage);
  }, [filterBy])
  useEffect(() => {
    return () => {
      getAnimationFilter('');
    }
  }, [])
  const openPage = async (page) => {
    setPage(page);
    setPagesButtons(pagesButtons.map((el, i) => {
      if (el.page === page) {
        el.active = true;
        return el;
      } else {
        el.active = false;
        return el;
      }
    }))
  }
  const openAnimationInfo = (info) => {
    getAnimation(info);
  }
  const sortHandler = (buttonId, sortType) => {
    const fetchData = async () => {
      await getAnimationList(currentPage, sortType);
    }
    fetchData();
    openPage(1);
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
      sortHandler={sortHandler} openPage={openPage} countAllAnimation={countAllAnimation} showBy={showBy}
      currentPage={currentPage} pagesButtons={pagesButtons} />
  )
}
const mapStatesToProps = (state) => {
  return {
    animation: state.animation.animation,
    filterBy: state.animation.filterBy,
    showBy: state.animation.showBy,
    currentPage: state.animation.currentPage,
    selectedAnimation: state.animation.selectedAnimation,
    countAllAnimation: state.animation.countAllAnimation
  }
}
export default compose(
  connect(mapStatesToProps, { getAnimationList, getAnimation, getAnimationFilter, setPage }),
  withRouter
)(AnimationContainer);