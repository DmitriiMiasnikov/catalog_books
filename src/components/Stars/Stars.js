import React, { useState, useEffect } from 'react';
import { StarsDom } from './StarsDom';
import { setUsersAnimation } from '../../store/usersReducer';
import { connect } from 'react-redux';

const Stars = ({ currentUserId, setUsersAnimation, list, myUserInfo, currentId }) => {
  const [userInfoAnimation, setUsersInfoAnimation] = useState(null);

  useEffect(() => {
    if (myUserInfo) {
      setUsersInfoAnimation({
        'queue': myUserInfo[list].queue.includes(currentId),
        'done': myUserInfo[list].done.includes(currentId),
        'selected': myUserInfo[list].selected.includes(currentId),
      })
    }
  }, [currentId, currentUserId, setUsersInfoAnimation, myUserInfo])

  const userInfoAnimationHandler = (type) => {
    setUsersAnimation(currentUserId, currentId, type);
  }

  return (
    <StarsDom {...{ currentUserId, userInfoAnimation, userInfoAnimationHandler }} />
  )
}

const mapStatesToProps = (state) => {
  return {
    currentUserId: state.users.currentUserId,
    myUserInfo: state.users.myUserInfo
  }
}

export default connect(mapStatesToProps, { setUsersAnimation })(Stars)