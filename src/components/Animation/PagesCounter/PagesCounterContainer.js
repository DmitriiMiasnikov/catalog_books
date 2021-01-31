import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { PagesCounter } from './PagesCounter';
import { setPage, setCountInPage } from './../../../store/animationReducer';

const PagesCounterContainer = ({ countInPage, currentPage, countAllAnimation, setPage, setCountInPage }) => {
  const [pagesButtons, setPagesButtons] = useState([]);
  const [buttonsSwitchCounter, setButtonsSwitchCounter] = useState([
    {
      id: 0,
      counter: 10,
      active: true,
    },
    {
      id: 1,
      counter: 25,
      active: false,
    },
    {
      id: 2,
      counter: 100,
      active: false,
    }
  ])
  const setPagesCounterFunc = (currentPage) => {
    const pages = [];
    let pagesCount = Math.ceil(countAllAnimation / countInPage);
    const startWith = (currentPage) => {
      let page;
      switch(currentPage) {
        case (1): page = 1; break
        case (2): page = 1; break
        case (pagesCount): pagesCount < 5 ? page = 1 : page = currentPage - 4; break
        case (pagesCount - 1): pagesCount < 5 ? page = 1 : page = currentPage - 3; break
        default: page = currentPage - 2; break
      }
      return page;
    }
    const endWith = (currentPage) => {
      let page;
      switch(currentPage) {
        case (1): pagesCount < 5 ? page = pagesCount : page = (currentPage + 4); break
        case (2): pagesCount < 5 ? page = pagesCount : page = (currentPage + 3); break
        case (pagesCount): pagesCount < 5 ? page = pagesCount : page = pagesCount; break
        case (pagesCount - 1): page = pagesCount; break
        default: page = (currentPage + 2); break
      }
      return page;
    }
    for (let i = startWith(currentPage); i <= endWith(currentPage);
      i++) {
      pages.push({ page: i, active: i === currentPage })
    }
    setPagesButtons(pages);
  }
  useEffect(() => {
    if (countAllAnimation) setPagesCounterFunc(currentPage);
  }, [currentPage, countAllAnimation, countInPage]);
  const openPage = async (page) => {
    setPage(page);
    setPagesButtons(pagesButtons.map((el, i) => {
      if (el.page === page) {
        el.active = true;
      } else {
        el.active = false;
      }
      return el;
    }))
  }
  const switchCounter = (counter, id) => {
    setCountInPage(counter);
    setPage(1);
    setButtonsSwitchCounter(buttonsSwitchCounter.map((el, i) => {
      if (el.id === id) {
        el.active = true;
      } else {
        el.active = false;
      }
      return el;
    }))
  }

  return (
    <PagesCounter openPage={openPage} pagesButtons={pagesButtons} switchCounter={switchCounter} countInPage={countInPage}
    currentPage={currentPage} countAllAnimation={countAllAnimation} buttonsSwitchCounter={buttonsSwitchCounter} />
  )
}

const mapStatesToProps = (state) => {
  return {
    countInPage: state.animation.countInPage,
    currentPage: state.animation.currentPage,
    countAllAnimation: state.animation.countAllAnimation,
  }
}
export default connect(mapStatesToProps, { setPage, setCountInPage })(PagesCounterContainer)