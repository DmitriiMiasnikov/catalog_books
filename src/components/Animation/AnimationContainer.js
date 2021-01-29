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
      active: false,
    },
    {
      id: 1,
      text: 'по дате (сначала старые)',
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
  const sortHandler = (buttonId) => {
    loadAnimation();
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
    if (buttonId === 0) {
      setAnimationList(list => {
        return list.sort((a, b) => {
          if (a.nameRu === b.nameRu) {
            return 0
          } else if (a.nameRu > b.nameRu || !a.nameRu) {
            return 1
          } else return -1
        })
      })
    } else if (buttonId === 1) {
      setAnimationList(list => {
        return list.sort((a, b) => {
          if (a.date[a.date.length - 1] === b.date[b.date.length - 1]) {
            return 0
          } else if (a.date[a.date.length - 1] > b.date[b.date.length - 1] || !a.date) {
            return 1
          } else return -1
        })
      })
    }
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