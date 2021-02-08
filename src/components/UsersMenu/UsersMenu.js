import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { UsersMenuDom } from './UsersMenuDom';
import { getUsersListMenu } from './../../store/usersReducer';

const UsersMenu = ({ usersListMenu, getUsersListMenu, currentUserId }) => {
  const [stars, setStars] = useState([]);
  useEffect(() => {
    getUsersListMenu()
  }, [getUsersListMenu])
  useEffect(() => {
    if (usersListMenu) {
      setStars(usersListMenu.map(el => {
        const stars = el.animation.done.length * 5 + el.animation.queue.length * 1;
        return stars;
      }))
    }
  }, [usersListMenu])
  return (
    <UsersMenuDom usersListMenu={usersListMenu} stars={stars} currentUserId = {currentUserId}/>
  )
}

const mapStatesToProps = (state) => {
  return {
    usersListMenu: state.users.usersListMenu,
    currentUserId: state.users.currentUserId
  }
}

export default compose(
  connect(mapStatesToProps, { getUsersListMenu })
)(UsersMenu)