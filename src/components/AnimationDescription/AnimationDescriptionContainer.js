import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AnimationDescription } from './AnimationDescription';
import { getAnimation, getAnimationFunc } from './../../store/animationDescriptionReducer';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

const AnimationDescriptionContainer = ({ getAnimation, getAnimationFunc, match, selectedAnimation }) => {
  const [buttonsControl, setButtonsControl] = useState([
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
    <AnimationDescription selectedAnimation={selectedAnimation} buttonsControl={buttonsControl}/>
  )
}
const mapStatesToProps = (state) => {
  return {
    selectedAnimation: state.animationDescription.selectedAnimation,
    users: state.users.users,
    currentUserId: state.users.users,
  }
}
export default compose(
  connect(mapStatesToProps, { getAnimation, getAnimationFunc }),
  withRouter
) (AnimationDescriptionContainer);