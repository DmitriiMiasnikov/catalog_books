import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { User } from './User'

const UserContainer = ({ currentUserId, users, match }) => {
  const [selectedUser] = useState(match.params.userId);
  const [currentUserInfo, setCurrentUserInfo] = useState(null)
  const [selectedUserMine] = useState(currentUserId === selectedUser);
  useEffect(() => {
    setCurrentUserInfo(users.find(el => el.userId === Number(selectedUser)))
  }, [users, selectedUser])
  return (
    <User currentUserInfo={currentUserInfo} selectedUserMine={selectedUserMine} />
  )
}

const mapStatesToProps = (state) => {
  return {
    currentUserId: state.users.currentUserId,
    users: state.users.users
  }
}
export default compose(
  connect(mapStatesToProps, {}),
  withRouter
) (UserContainer);