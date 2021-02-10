import React, { useState } from 'react';
import { connect } from 'react-redux';
import { HeaderDom } from './HeaderDom'

const Header = ({ menuItems, animationItems }) => {
  const [showAnimation, setShowAnimation] = useState(false);
  const showAnimationHandler = async (i, show) => {
    i === 2 && setShowAnimation(show)
  }

  return (
    <HeaderDom {...{ menuItems, animationItems, showAnimation, showAnimationHandler }} />
  )
}

const mapStatesToProps = (state) => {
  return {
    menuItems: state.header.menuItems,
    animationItems: state.header.animationItems
  }
}
export default connect(mapStatesToProps, {})(Header);