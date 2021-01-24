import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { User } from './User'

const UserContainer = ({ currentUserId, users, selectedUser }) => {
  const [currentUserInfo, setCurrentUserInfo] = useState(null)
  const [selectedUserMine] = useState(currentUserId === selectedUser);
  useEffect(() => {
    setCurrentUserInfo(users.find(el => el.userId === selectedUser))
  }, [users, selectedUser])
  return (
    <User currentUserInfo={currentUserInfo} selectedUserMine={selectedUserMine}/>
  )
}

const mapStatesToProps = (state) => {
  return {
    currentUserId: state.user.currentUserId,
    selectedUser: state.user.selectedUser,
    users: state.user.users
  }
}
export default connect(mapStatesToProps, {})(UserContainer);