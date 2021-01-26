import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getAnimation } from '../../store/animationReducer';
import { Animation } from './Animation'

const AnimationContainer = ({ animation, getAnimation }) => {
  useEffect(() => {
    getAnimation()
  }, [getAnimation])
  return (
    <Animation animation={animation} />
  )
}
const mapStatesToProps = (state) => {
  return {
    animation: state.animation.animation,
  }
}
export default connect (mapStatesToProps, { getAnimation })(AnimationContainer);