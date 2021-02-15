import React, { useState } from 'react';
import { connect } from 'react-redux';
import { HeaderDom } from './HeaderDom';
import { setPage } from './../../store/listSettingsReducer';
import { setFilterBy } from './../../store/filterReducer';
import { clearList } from './../../store/listReducer';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

const Header = ({ menuItems, animationItems, setFilterBy, setPage, history, clearList, listName, isMobile }) => {
  const [showAnimation, setShowAnimation] = useState(false);
  const showAnimationHandler = async (page, show) => {
    if (page === 'animationListPage') {
      setShowAnimation(show)
    }
  }
  const openListAnimationFiltered = (filter) => {
    setFilterBy(filter);
    setPage(1);
    history.push(`/list/animation/1`);
  }
  const clearListHandler = (target) => {
    if (listName !== target) clearList()
  }
  return (
    <HeaderDom {...{ menuItems, animationItems, showAnimation, showAnimationHandler, openListAnimationFiltered,
      clearListHandler, isMobile }} />
  )
}

const mapStatesToProps = (state) => {
  return {
    menuItems: state.header.menuItems,
    animationItems: state.header.animationItems,
    listName: state.list.listName,
    isMobile: state.main.isMobile
  }
}
export default compose(
  connect(mapStatesToProps, { setFilterBy, setPage, clearList }),
  withRouter
) (Header);