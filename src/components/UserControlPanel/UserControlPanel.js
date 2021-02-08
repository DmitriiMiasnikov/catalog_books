import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setUsersAnimation } from './../../store/usersReducer';
import { UserControlPanelDom } from './UserControlPanelDom';

const UserControlPanel = ({ currentUserId, setUsersAnimation, myUserInfo, currentAnimationId }) => {
  const [userInfoAnimation, setUsersInfoAnimation] = useState(null);
  const buttonsControl = [{
      id: 1,
      text: 'хочу посмотреть',
      type: 'queue'
    },
    {
      id: 2,
      text: 'просмотрено',
      type: 'done'
    }];
  useEffect(() => {
    if (myUserInfo) {
      setUsersInfoAnimation({
        'queue': myUserInfo.animation.queue.includes(currentAnimationId),
        'done': myUserInfo.animation.done.includes(currentAnimationId),
        'selected': myUserInfo.animation.selected.includes(currentAnimationId),
      })
    }
  }, [currentAnimationId, currentUserId, setUsersInfoAnimation, myUserInfo])

  const userInfoAnimationHandler = (type) => {
    setUsersAnimation(currentUserId, currentAnimationId, type);
  }

  return (
    <UserControlPanelDom userInfoAnimation={userInfoAnimation} currentUserId={currentUserId} 
      userInfoAnimationHandler={userInfoAnimationHandler} buttonsControl={buttonsControl}/>
  )
}

const mapStatesToProps = (state) => {
  return {
    currentUserId: state.users.currentUserId,
    myUserInfo: state.users.myUserInfo
  }
}

export default connect(mapStatesToProps, { setUsersAnimation })(UserControlPanel);