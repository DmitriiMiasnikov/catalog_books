import React, { useState } from 'react';
import { connect } from 'react-redux';
import { PageViewDom } from './PageViewDom'

const PageView = () => {
  const [pageView, setPageView] = useState(['small','medium', 'large'].map((el, i) => {
    return {
      id: i,
      type: el,
      active: i === 2
    }
  }))
  const pageViewHandler = (id) => {
    setPageView(pageView.map((el, i) => {
      if (el.id === id) {
        el.active = true;
      } else {
        el.active = false;
      }
      return el;
    }))
  }
  return (
    <PageViewDom pageView={pageView} pageViewHandler={pageViewHandler}/>
  )
}

const mapStatesToProps = (state) => {
  return {

  }
}

export default connect(mapStatesToProps, {})(PageView);