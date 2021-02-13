import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { PagesCounterDom } from './PagesCounterDom';
import { setPage, setCountInPage } from '../../store/animationReducer';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

const PagesCounter = ({ countInPage, countAll, setPage, setCountInPage, match, listName }) => {
  const [pagesButtons, setPagesButtons] = useState([]);
  const pageRoute = Number(match.params.page) || 1;
  const [buttonsSwitchCounter, setButtonsSwitchCounter] = useState([10, 25, 100].map((el, i) => {
    return {
      id: i,
      active: !i,
      counter: el
    }
  }))
  const setPagesCounterFunc = (index) => {
    const pages = [];
    let pagesCount = Math.ceil(countAll / countInPage);
    const startWith = (index) => {
      let page;
      switch (index) {
        case (1): page = 1; break
        case (2): page = 1; break
        case (pagesCount): pagesCount < 5 ? page = 1 : page = index - 4; break
        case (pagesCount - 1): pagesCount < 5 ? page = 1 : page = index - 3; break
        default: page = index - 2; break
      }
      return page;
    }
    const endWith = (index) => {
      let page;
      switch (index) {
        case (1): pagesCount < 5 ? page = pagesCount : page = (index + 4); break
        case (2): pagesCount < 5 ? page = pagesCount : page = (index + 3); break
        case (pagesCount): pagesCount < 5 ? page = pagesCount : page = pagesCount; break
        case (pagesCount - 1): page = pagesCount; break
        default: page = (index + 2); break
      }
      return page;
    }
    for (let i = startWith(index); i <= endWith(index);
      i++) {
      pages.push({ page: i, active: i === index })
    }
    setPagesButtons(pages);
  }
  useEffect(() => {
    if (countAll) {
      setPagesCounterFunc(pageRoute);
      setButtonsSwitchCounter(buttonsSwitchCounter => buttonsSwitchCounter.map((el, i) => {
        if (el.counter === countInPage) {
          el.active = true;
        } else {
          el.active = false;
        }
        return el;
      }))
    }
  }, [countAll, countInPage, pageRoute]);
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
      currentPage={pageRoute} countAll={countAll} buttonsSwitchCounter={buttonsSwitchCounter} listName={listName}/>
  )
}

const mapStatesToProps = (state) => {
  return {
    countInPage: state.animation.countInPage,
  }
}
export default compose(
  connect(mapStatesToProps, { setPage, setCountInPage }),
  withRouter
) (PagesCounter)