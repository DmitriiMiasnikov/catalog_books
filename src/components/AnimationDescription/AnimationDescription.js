import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AnimationDescriptionDom } from './AnimationDescriptionDom';
import { getAnimation, getAnimationFunc } from './../../store/animationDescriptionReducer';
import { getUser, setUsersAnimation } from './../../store/usersReducer';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

const AnimationDescription = ({ getAnimation, getAnimationFunc, match, selectedAnimation,
  currentUserId, userInfo, getUser, setUsersAnimation }) => {
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
      type: 'done'
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
        'done': userInfo.animation.done.includes(currentAnimationId),
        'selected': userInfo.animation.selected.includes(currentAnimationId),
      })
    }
  }, [currentAnimationId, currentUserId, setUsersInfoAnimation, userInfo])
  useEffect(() => {
    return () => getAnimationFunc(null)
  }, [getAnimationFunc])
  const userInfoAnimationHandler = (type) => {
    setUsersAnimation(currentUserId, currentAnimationId, type);
  }
  return (
    <AnimationDescriptionDom selectedAnimation={selectedAnimation} buttonsControl={buttonsControl}
      userInfoAnimation={userInfoAnimation} userInfoAnimationHandler={userInfoAnimationHandler}/>
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
  connect(mapStatesToProps, { getAnimation, getAnimationFunc, getUser, setUsersAnimation }),
  withRouter
) (AnimationDescription);