import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { UserDom } from './UserDom';
import { getUser } from './../../store/usersReducer';

const User = ({ currentUserId, match, getUser, userInfo }) => {
  const selectedUserId = Number(match.params.userId) 
  const selectedUserMine = currentUserId === selectedUserId;
  useEffect(() => {
    const fetchData = async () => {
      await getUser(selectedUserId)
    }
    fetchData()
  }, [selectedUserId, getUser])
  return (
    <UserDom userInfo={userInfo} selectedUserMine={selectedUserMine} />
  )
}

const mapStatesToProps = (state) => {
  return {
    currentUserId: state.users.currentUserId,
    userInfo: state.users.userInfo
  }
}
export default compose(
  connect(mapStatesToProps, { getUser }),
  withRouter
) (User);