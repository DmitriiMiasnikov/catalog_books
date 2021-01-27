import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AnimationDescription } from './AnimationDescription'

const AnimationDescriptionContainer = ({ animationId, animation }) => {
  const [currentAnimationInfo, setCurrentAnimationInfo] = useState(null);
  useEffect(() => {
    setCurrentAnimationInfo(animation.find(el => el.animeId === Number(animationId)))
  }, [animation, animationId])
  return (
    <AnimationDescription currentAnimationInfo={currentAnimationInfo}/>
  )
}
const mapStatesToProps = (state) => {
  return {
    animation: state.animation.animation,
  }
}
export default connect (mapStatesToProps, {  })(AnimationDescriptionContainer);