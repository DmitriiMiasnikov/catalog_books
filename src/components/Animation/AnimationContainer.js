import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Route } from 'react-router-dom'
import { compose } from 'redux';
import { getAnimationList, getAnimation, getAnimationFilter } from '../../store/animationReducer';
import { Animation } from './Animation';
import AnimationDescription from './../AnimationDescription/AnimationDescriptionContainer';

const AnimationContainer = ({ animation, getAnimationList, match, filterBy, getAnimation, getAnimationFilter }) => {
  const [animationList, setAnimationList] = useState([]);
  const [buttonsSort, setButtonsSort] = useState([
    {
      id: 0,
      text: 'по названию',
      active: false,
    },
    {
      id: 1,
      text: 'по дате (сначала старые)',
      active: false,
    }])
  const loadAnimation = useCallback(async () => {
    await getAnimationList();
  }, [getAnimationList])
  useEffect(() => {
    loadAnimation();
    setAnimationList(animation);
  }, [])
  useEffect(() => {
    if (filterBy) {
      loadAnimation();
      if (filterBy === 'все') {
        setAnimationList(animation);
      } else setAnimationList(animation.filter(el => el.auditory === filterBy));
    }
  }, [filterBy])
  useEffect(() => {
    return () => {
      getAnimationFilter('');
    }
  }, [])
  const openAnimationInfo = (info) => {
    getAnimation(info);
  }
  const sortHandler = (buttonId) => {
    loadAnimation();
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
        return list.sort((a, b) => {
          if (a.nameRu === b.nameRu) {
            return 0
          } else if (a.nameRu > b.nameRu || !a.nameRu) {
            return 1
          } else return -1
        })
      })
    } else if (buttonId === 1) {
      setAnimationList(list => {
        return list.sort((a, b) => {
          if (a.date[a.date.length - 1] === b.date[b.date.length - 1]) {
            return 0
          } else if (a.date[a.date.length - 1] > b.date[b.date.length - 1] || !a.date) {
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
    filterBy: state.animation.filterBy
  }
}
export default compose(
  connect(mapStatesToProps, { getAnimationList, getAnimation, getAnimationFilter }),
  withRouter
)(AnimationContainer);