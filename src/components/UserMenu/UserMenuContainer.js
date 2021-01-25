import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { UserMenu } from './UserMenu';
import { getUserId } from '../../store/usersReducer';

const UserMenuContainer = ({ currentUserId, users, getUserId }) => {
  const [currentUserInfo, setCurrentUserInfo] = useState(null)
  useEffect(() => {
    setCurrentUserInfo(users.find(el => el.userId === currentUserId))
  }, [users, currentUserId])

  const openUserInfo = (id) => {
    getUserId(id);
  }

  return (
    <UserMenu currentUserInfo={currentUserInfo} openUserInfo={openUserInfo} />
  )
}

const mapStatesToProps = (state) => {
  return {
    currentUserId: state.user.currentUserId,
    users: state.user.users
  }
}

export default connect(mapStatesToProps, { getUserId })(UserMenuContainer)