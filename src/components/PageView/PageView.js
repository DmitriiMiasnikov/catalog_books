import React, { useState } from 'react';
import { connect } from 'react-redux';
import { PageViewDom } from './PageViewDom';
import { setPageView } from './../../store/listSettingsReducer';

const PageView = ({ setPageView, pageView }) => {
  const [pageViewButtons, setPageViewButtons] = useState(['list', 'medium_list', 'tile'].map((el, i) => {
    return {
      id: i,
      type: el,
      active: el === pageView
    }
  }))
  const pageViewHandler = (type, id) => {
    setPageView(type);
    setPageViewButtons(pageViewButtons.map((el, i) => {
      if (el.id === id) {
        el.active = true;
      } else {
        el.active = false;
      }
      return el;
    }))
  }
  return (
    <PageViewDom pageViewButtons={pageViewButtons} pageViewHandler={pageViewHandler}/>
  )
}

const mapStatesToProps = (state) => {
  return {
    pageView: state.listSettings.pageView
  }
}

export default connect(mapStatesToProps, { setPageView })(PageView);