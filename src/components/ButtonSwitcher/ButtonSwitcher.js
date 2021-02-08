import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setUsersAnimation } from '../../store/usersReducer';
import { ButtonSwitcherDom } from './ButtonSwitcherDom';

const ButtonSwitcher = ({ currentUserId, setUsersAnimation, myUserInfo, currentId, list }) => {
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
        'queue': myUserInfo[list].queue.includes(currentId),
        'done': myUserInfo[list].done.includes(currentId),
      })
    }
  }, [currentId, currentUserId, setUsersInfoAnimation, myUserInfo, list])

  const userInfoAnimationHandler = (type) => {
    setUsersAnimation(currentUserId, currentId, type);
  }

  return (
    <ButtonSwitcherDom {...{ userInfoAnimation, currentUserId, userInfoAnimationHandler, buttonsControl }} />
  )
}

const mapStatesToProps = (state) => {
  return {
    currentUserId: state.users.currentUserId,
    myUserInfo: state.users.myUserInfo
  }
}

export default connect(mapStatesToProps, { setUsersAnimation })(ButtonSwitcher);