import React, { useState } from 'react';
import { connect } from 'react-redux';
import { HeaderDom } from './HeaderDom';
import { setFilterBy, setPage } from './../../store/animationReducer';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

const Header = ({ menuItems, animationItems, setFilterBy, setPage, history }) => {
  const [showAnimation, setShowAnimation] = useState(false);
  const showAnimationHandler = async (i, show) => {
    if (i === 2) {
      setShowAnimation(show)
    }
  }
  const openListAnimationFiltered = (filter) => {
    setFilterBy(filter);
    setPage(1);
    history.push(`/list/animation/1`);
  }

  return (
    <HeaderDom {...{ menuItems, animationItems, showAnimation, showAnimationHandler, openListAnimationFiltered }} />
  )
}

const mapStatesToProps = (state) => {
  return {
    menuItems: state.header.menuItems,
    animationItems: state.header.animationItems
  }
}
export default compose(
  connect(mapStatesToProps, { setFilterBy, setPage }),
  withRouter
) (Header);