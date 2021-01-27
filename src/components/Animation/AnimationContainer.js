import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Route } from 'react-router-dom'
import { compose } from 'redux';
import { getAnimationList, getAnimation } from '../../store/animationReducer';
import { Animation } from './Animation';
import AnimationDescription from './../AnimationDescription/AnimationDescriptionContainer';

const AnimationContainer = ({ animation, getAnimationList, match }) => {
  const [buttonsSort, setButtonsSort] = useState([
    {
      id: 0,
      text: 'по названию',
      active: true,
    },
    {
      id: 1,
      text: 'по дате',
      active: false,
    }])
  useEffect(() => {
    getAnimationList()
  }, [getAnimationList])
  const openAnimationInfo = (info) => {
    getAnimation(info);
  }
  const sortHandler = (buttonId) => {
    setButtonsSort(buttons => {
      return buttons.map(el => {
        if (el.id !== buttonId) {
          el.active = false
          return el
         } else {
          el.active = true
          return el
         }
      })
    })
  }
  if (match.params.animationId) {
    return (
      <Route exact path={`/animation/${match.params.animationId}`}
        render={() => <AnimationDescription animationId={match.params.animationId} />} />
    )
  }
  return (
    <Animation animation={animation} openAnimationInfo={openAnimationInfo} 
      buttonsSort={buttonsSort} sortHandler={sortHandler} />
  )
}
const mapStatesToProps = (state) => {
  return {
    animation: state.animation.animation,
  }
}
export default compose(
  connect(mapStatesToProps, { getAnimationList, getAnimation }),
  withRouter
)(AnimationContainer);