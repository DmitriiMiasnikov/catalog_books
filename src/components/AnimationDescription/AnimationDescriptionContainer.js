import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AnimationDescription } from './AnimationDescription';
import { getAnimation, getAnimationFunc } from './../../store/animationDescriptionReducer';
import { getUser } from './../../store/usersReducer';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

const AnimationDescriptionContainer = ({ getAnimation, getAnimationFunc, match, selectedAnimation,
  currentUserId, userInfo, getUser }) => {
  const currentAnimationId = Number(match.params.animationId);
  const [buttonsControl] = useState([
    {
      id: 1,
      text: 'хочу посмотреть',
      type: 'queue'
    },
    {
      id: 2,
      text: 'просмотрено',
      type: 'viewed'
    }
  ])
  const [userInfoAnimation, setUsersInfoAnimation] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      await getAnimation(currentAnimationId);
    }
    fetchData();
  }, [getAnimation, match, currentAnimationId])
  useEffect(() => {
    const fetchData = async () => {
      await getUser(currentUserId);
    }
    fetchData();
  }, [currentUserId, getUser])
  useEffect(() => {
    if (userInfo) {
      setUsersInfoAnimation({
        'queue': userInfo.animation.queue.includes(currentAnimationId),
        'viewed': userInfo.animation.done.includes(currentAnimationId),
        'selected': userInfo.animation.selected.includes(currentAnimationId),
      })
    }
  }, [currentAnimationId, currentUserId, setUsersInfoAnimation, userInfo])
  useEffect(() => {
    return () => getAnimationFunc(null)
  }, [getAnimationFunc])
  return (
    <AnimationDescription selectedAnimation={selectedAnimation} buttonsControl={buttonsControl}
      userInfoAnimation={userInfoAnimation}/>
  )
}
const mapStatesToProps = (state) => {
  return {
    selectedAnimation: state.animationDescription.selectedAnimation,
    currentUserId: state.users.currentUserId,
    userInfo: state.users.userInfo
  }
}
export default compose(
  connect(mapStatesToProps, { getAnimation, getAnimationFunc, getUser }),
  withRouter
) (AnimationDescriptionContainer);