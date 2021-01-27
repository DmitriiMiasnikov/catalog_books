import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Route } from 'react-router-dom'
import { compose } from 'redux';
import { getAnimationList, getAnimation } from '../../store/animationReducer';
import { Animation } from './Animation';
import AnimationDescription from './../AnimationDescription/AnimationDescriptionContainer';

const AnimationContainer = ({ animation, getAnimationList, match }) => {
  const [animationList, setAnimationList] = useState([]);
  const [buttonsSort, setButtonsSort] = useState([
    {
      id: 0,
      text: 'по названию',
      active: true,
    },
    {
      id: 1,
      text: 'по дате (сначала старые)',
      active: false,
    }])
  useEffect(() => {
    const fetchData = async () => {
      await getAnimationList();
    }
    fetchData();
    setAnimationList(animation);
  }, [getAnimationList, animation])
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
    if (buttonId === 0) {
      setAnimationList(list => {
        return list.sort((a, b) => (a.nameRu === b.nameRu) ? 0 : a.nameRu > b.nameRu ? 1 : -1)
      })
    } else if (buttonId === 1) {
      setAnimationList(list => {
        return list.sort((a, b) => {
          if (a.date[a.date.length - 1] === b.date[b.date.length - 1]) {
            return 0
          } else if (a.date[a.date.length - 1] > b.date[b.date.length - 1]) {
            return 1
          } else return -1
        })
      })
    }

  }
  if (match.params.animationId) {
    return (
      <Route exact path={`/animation/${match.params.animationId}`}
        render={() => <AnimationDescription animationId={match.params.animationId} />} />
    )
  }
  return (
    <Animation animationList={animationList} openAnimationInfo={openAnimationInfo}
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