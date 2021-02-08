import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { AnimationDescriptionDom } from './AnimationDescriptionDom';
import { getAnimation, getAnimationFunc } from './../../store/animationDescriptionReducer';
import { getUser } from './../../store/usersReducer';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

const AnimationDescription = ({ getAnimation, getAnimationFunc, match, selectedAnimation,
  currentUserId, getUser }) => {
  const currentAnimationId = Number(match.params.animationId);
  useEffect(() => {
    const fetchData = async () => {
      await getAnimation(currentAnimationId);
    }
    fetchData();
  }, [getAnimation, match, currentAnimationId])
  useEffect(() => {
    if (currentUserId) {
      const fetchData = async () => {
        await getUser(currentUserId);
      }
      fetchData();
    }
  }, [currentUserId, getUser])
  useEffect(() => {
    return () => getAnimationFunc(null)
  }, [getAnimationFunc])
  return (
    <AnimationDescriptionDom selectedAnimation={selectedAnimation} />
  )
}
const mapStatesToProps = (state) => {
  return {
    selectedAnimation: state.animationDescription.selectedAnimation,
    currentUserId: state.users.currentUserId,
  }
}
export default compose(
  connect(mapStatesToProps, { getAnimation, getAnimationFunc, getUser }),
  withRouter
) (AnimationDescription);