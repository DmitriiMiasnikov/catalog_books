import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { UsersMenuDom } from './UsersMenuDom';
import { getUsersListMenu } from './../../store/usersReducer';

const UsersMenu = ({ usersListMenu, getUsersListMenu }) => {
  const [stars, setStars] = useState([]); 
  useEffect(() => {
    getUsersListMenu()
  }, [getUsersListMenu])
  useEffect(() => {
    setStars(usersListMenu.map(el => {
      const stars = el.animation.done.length * 5 + el.animation.selected.length * 3 + el.animation.queue.length * 1;
      return stars;
    }))
  }, [usersListMenu])
  return (
    <UsersMenuDom usersListMenu={usersListMenu} stars={stars}/>
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