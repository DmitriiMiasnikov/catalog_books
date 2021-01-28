import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { AnimationDescription } from './AnimationDescription';
import { getAnimation } from './../../store/animationReducer';

const AnimationDescriptionContainer = ({ animationId, selectedAnimation, getAnimation }) => {
  useEffect(() => {
    const fetchData = async () => {
      await getAnimation(animationId);
    }
    fetchData();
  }, [animationId, getAnimation])
  return (
    <AnimationDescription selectedAnimation={selectedAnimation} />
  )
}
const mapStatesToProps = (state) => {
  return {
    selectedAnimation: state.animation.selectedAnimation,
  }
}
export default connect(mapStatesToProps, { getAnimation })(AnimationDescriptionContainer);