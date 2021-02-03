import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { UserDom } from './UserDom';
import { getUser, getUsersAnimationList } from './../../store/usersReducer';
import { getAnimation } from './../../store/animationDescriptionReducer';

const User = ({ currentUserId, match, getUser, userInfo, getUsersAnimationList, usersAnimationList, getAnimation,
  restCountAnimation }) => {
  const selectedUserId = Number(match.params.userId)
  const selectedUserMine = currentUserId === selectedUserId;
  useEffect(() => {
    const fetchData = async () => {
      await getUser(selectedUserId);
      await getUsersAnimationList(selectedUserId);
    }
    fetchData()
  }, [selectedUserId, getUser, getUsersAnimationList])
  const openAnimationInfo = (info) => {
    getAnimation(info);
  }
  const openAnimationList = () => {
  }
  return (
    <UserDom userInfo={userInfo} selectedUserMine={selectedUserMine} usersAnimationList={usersAnimationList}
    openAnimationInfo={openAnimationInfo} restCountAnimation={restCountAnimation} openAnimationList={openAnimationList}/>
  )
}

const mapStatesToProps = (state) => {
  return {
    currentUserId: state.users.currentUserId,
    userInfo: state.users.userInfo,
    usersAnimationList: state.users.usersAnimationList,
    usersAllAnimationList: state.users.usersAllAnimationList,
    restCountAnimation: state.users.restCountAnimation
  }
}
export default compose(
  connect(mapStatesToProps, { getUser, getUsersAnimationList, getAnimation }),
  withRouter
)(User);