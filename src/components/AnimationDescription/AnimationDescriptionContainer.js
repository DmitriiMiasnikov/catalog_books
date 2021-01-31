import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AnimationDescription } from './AnimationDescription';
import { getAnimation, getAnimationFunc } from './../../store/animationDescriptionReducer';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

const AnimationDescriptionContainer = ({ getAnimation, getAnimationFunc, match, selectedAnimation,
  currentUserId, users }) => {
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
    setUsersInfoAnimation({
      'queue': users[currentUserId].animation.queue.includes(currentAnimationId),
      'viewed': users[currentUserId].animation.viewed.includes(currentAnimationId),
      'selected': users[currentUserId].animation.selected.includes(currentAnimationId),
    })
    return () => getAnimationFunc(null)
  }, [currentAnimationId, currentUserId, setUsersInfoAnimation, getAnimationFunc, users])
  return (
    <AnimationDescription selectedAnimation={selectedAnimation} buttonsControl={buttonsControl}
      userInfoAnimation={userInfoAnimation}/>
  )
}
const mapStatesToProps = (state) => {
  return {
    selectedAnimation: state.animationDescription.selectedAnimation,
    users: state.users.users,
    currentUserId: state.users.currentUserId,
  }
}
export default compose(
  connect(mapStatesToProps, { getAnimation, getAnimationFunc }),
  withRouter
) (AnimationDescriptionContainer);