import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { UserMenu } from './UserMenu'

const UserMenuContainer = ({ currentUserId, users }) => {
  const [currentUserInfo, setCurrentUserInfo] = useState(null)
  useEffect(() => {
    setCurrentUserInfo(users.find(el => el.userId === currentUserId))
  }, [])
  return (
    <UserMenu currentUserInfo={currentUserInfo} />
  )
}

const mapStatesToProps = (state) => {
  return {
    currentUserId: state.user.currentUserId,
    users: state.user.users
  }
}

export default connect(mapStatesToProps, {})(UserMenuContainer)