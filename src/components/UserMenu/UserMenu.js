import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { UserMenuDom } from './UserMenuDom';
import { getUserId } from '../../store/usersReducer';

const UserMenu = ({ currentUserId, users, getUserId }) => {
  const [currentUserInfo, setCurrentUserInfo] = useState(null)
  useEffect(() => {
    setCurrentUserInfo(users.find(el => el.userId === currentUserId))
  }, [users, currentUserId])

  const openUserInfo = (id) => {
    getUserId(id);
  }

  return (
    <UserMenuDom currentUserInfo={currentUserInfo} openUserInfo={openUserInfo} />
  )
}

const mapStatesToProps = (state) => {
  return {
    currentUserId: state.users.currentUserId,
    users: state.users.users
  }
}

export default connect(mapStatesToProps, { getUserId })(UserMenu)