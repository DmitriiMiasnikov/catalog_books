import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Route } from 'react-router-dom'
import { compose } from 'redux';
import { getAnimationList, getAnimation } from '../../store/animationReducer';
import { Animation } from './Animation';
import AnimationDescription from './../AnimationDescription/AnimationDescriptionContainer';

const AnimationContainer = ({ animation, getAnimationList, match }) => {
  useEffect(() => {
    getAnimationList()
  }, [getAnimationList])
  const openAnimationInfo = (info) => {
    getAnimation(info);
  }
  if (match.params.animationId) {
    return (
      <Route exact path={`/animation/${match.params.animationId}`} 
        render={() => <AnimationDescription animationId={match.params.animationId}/>} />
    )
  }
  return (
    <Animation animation={animation} openAnimationInfo={openAnimationInfo}/>
  )
}
const mapStatesToProps = (state) => {
  return {
    animation: state.animation.animation,
  }
}
export default compose(
  connect (mapStatesToProps, { getAnimationList, getAnimation }),
  withRouter
)(AnimationContainer);