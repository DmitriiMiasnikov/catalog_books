import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { AnimationDescription } from './AnimationDescription';
import { getAnimation, getAnimationFunc } from './../../store/animationReducer';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

const AnimationDescriptionContainer = ({ getAnimation, getAnimationFunc, match, selectedAnimation }) => {
  useEffect(() => {
    const fetchData = async () => {
      await getAnimation(match.params.animationId);
    }
    fetchData();
  }, [getAnimation, match])
  useEffect(() => {
    return () => getAnimationFunc(null)
  }, [])
  return (
    <AnimationDescription selectedAnimation={selectedAnimation} />
  )
}
const mapStatesToProps = (state) => {
  return {
    selectedAnimation: state.animation.selectedAnimation,
  }
}
export default compose(
  connect(mapStatesToProps, { getAnimation, getAnimationFunc }),
  withRouter
) (AnimationDescriptionContainer);