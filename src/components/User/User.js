import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { UserDom } from './UserDom';
import { getUser, getUsersAnimationList } from './../../store/usersReducer';

const User = ({ currentUserId, match, getUser, userInfo, getUsersAnimationList, usersAnimationList }) => {
  const selectedUserId = Number(match.params.userId)
  const selectedUserMine = currentUserId === selectedUserId;
  useEffect(() => {
    const fetchData = async () => {
      await getUser(selectedUserId);
      await getUsersAnimationList(selectedUserId);
    }
    fetchData()
  }, [selectedUserId, getUser, getUsersAnimationList])
  return (
    <UserDom userInfo={userInfo} selectedUserMine={selectedUserMine} usersAnimationList={usersAnimationList}/>
  )
}

const mapStatesToProps = (state) => {
  return {
    currentUserId: state.users.currentUserId,
    userInfo: state.users.userInfo,
    usersAnimationList: state.users.usersAnimationList
  }
}
export default compose(
  connect(mapStatesToProps, { getUser, getUsersAnimationList }),
  withRouter
)(User);