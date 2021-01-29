import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { getAnimationList, getAnimation, setFilterBy, setPage, setSortBy } from '../../store/animationReducer';
import { Animation } from './Animation';

const AnimationContainer = ({ animation, getAnimationList, filterBy, getAnimation, setFilterBy,
  currentPage, setPage, countAllAnimation, countInPage, setSortBy, sortBy }) => {
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
    let pagesCount = Math.ceil(countAllAnimation / countInPage);
    for (let i = currentPage > 3 ? currentPage - 3 : 1;
      i >= pagesCount - 3 ? i <= pagesCount : i <= pagesCount + 3;
      i++) {
      pages.push({ page: i, active: i === 1 })
    }
    setPagesButtons(pages);
  }
  useEffect(() => {
    setAnimationList(animation);
  }, [animation, currentPage, pagesButtons.length, setPagesFunc])
  useEffect(() => {
    if (countAllAnimation) setPagesFunc(currentPage);
  }, [countAllAnimation])
  useEffect(() => {
    const fetchData = async () => {
      await getAnimationList(currentPage, sortBy, filterBy);
    }
    fetchData();
  }, [currentPage, sortBy, filterBy, getAnimationList]);
  useEffect(() => {
    return () => {
      setFilterBy('все');
      setSortBy('default');
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
  const sortHandler = (buttonId, sort) => {
    setSortBy(sort);
    if (currentPage !== 1) openPage(1);
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
      sortHandler={sortHandler} openPage={openPage} countAllAnimation={countAllAnimation} countInPage={countInPage}
      currentPage={currentPage} pagesButtons={pagesButtons} />
  )
}
const mapStatesToProps = (state) => {
  return {
    animation: state.animation.animation,
    filterBy: state.animation.filterBy,
    countInPage: state.animation.countInPage,
    currentPage: state.animation.currentPage,
    selectedAnimation: state.animation.selectedAnimation,
    countAllAnimation: state.animation.countAllAnimation,
    sortBy: state.animation.sortBy,
  }
}
export default compose(
  connect(mapStatesToProps, { getAnimationList, getAnimation, setFilterBy, setPage, setSortBy }),
  withRouter
)(AnimationContainer);