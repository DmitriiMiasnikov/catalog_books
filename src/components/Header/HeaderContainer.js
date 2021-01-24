import React from 'react';
import { connect } from 'react-redux';
import { Header } from './Header'

const HeaderContainer = (props) => {
  return (
    <Header {...props} />
  )
}

const mapStatesToProps = (state) => {
  return {
    menuItems: state.header.menuItems
  }
}
export default connect(mapStatesToProps, {})(HeaderContainer);