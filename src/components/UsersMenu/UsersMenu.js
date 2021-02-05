import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { UsersMenuDom } from './UsersMenuDom';
import { getUsersListMenu } from './../../store/usersReducer';

const UsersMenu = ({ usersListMenu, getUsersListMenu }) => {
  useEffect(() => {
    getUsersListMenu()
  }, [getUsersListMenu])

  return (
    <UsersMenuDom usersListMenu={usersListMenu}/>
  )
}

const mapStatesToProps = (state) => {
  return {
    usersListMenu: state.users.usersListMenu
  }
}

export default compose(
  connect(mapStatesToProps, { getUsersListMenu })
)(UsersMenu)