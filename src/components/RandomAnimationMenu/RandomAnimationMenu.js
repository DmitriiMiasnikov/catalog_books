import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import { RandomAnimationMenuDom } from './RandomAnimationMenuDom';
import { getRandomAnimation, getAnimation } from './../../store/animationDescriptionReducer';

const RandomAnimationMenu = ({ getRandomAnimation, randomAnimation, getAnimation }) => {


  useEffect(() => {
    if (!randomAnimation) {
      getRandomAnimation()
    }
    const interval = setInterval(() => {
      getRandomAnimation()
    }, 300000);
    return () => clearInterval(interval);
  }, [getRandomAnimation, randomAnimation])

  const openAnimationInfo = (info) => {
    getAnimation(info);
  }

  return (
    <RandomAnimationMenuDom {...{randomAnimation, openAnimationInfo}}/>
  )
}

const mapStatesToProps = (state) => {
  return {
    randomAnimation: state.animationDescription.randomAnimation
  }
}
export default connect(mapStatesToProps, { getRandomAnimation, getAnimation })(RandomAnimationMenu);