import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { PagesCounterDom } from './PagesCounterDom';
import { setPage, setCountInPage } from '../../../store/animationReducer';

const PagesCounter = ({ countInPage, currentPage, countAll, setPage, setCountInPage }) => {
  const [pagesButtons, setPagesButtons] = useState([]);
  const [buttonsSwitchCounter, setButtonsSwitchCounter] = useState([10, 25, 100].map((el, i) => {
    return {
      id: i,
      active: !i,
      counter: el
    }
  }))
  const setPagesCounterFunc = (currentPage) => {
    const pages = [];
    let pagesCount = Math.ceil(countAll / countInPage);
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
    if (countAll) setPagesCounterFunc(currentPage);
  }, [currentPage, countAll, countInPage]);
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
    <PagesCounterDom openPage={openPage} pagesButtons={pagesButtons} switchCounter={switchCounter} countInPage={countInPage}
    currentPage={currentPage} countAll={countAll} buttonsSwitchCounter={buttonsSwitchCounter} />
  )
}

const mapStatesToProps = (state) => {
  return {
    currentPage: state.animation.currentPage,
    countInPage: state.animation.countInPage
  }
}
export default connect(mapStatesToProps, { setPage, setCountInPage })(PagesCounter)