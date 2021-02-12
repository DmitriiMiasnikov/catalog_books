import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import { RandomItemsMenuDom } from './RandomItemsMenuDom';
import { getRandomOne, getDescription } from './../../store/descriptionReducer';

const RandomItemsMenu = ({ getRandomOne, randomItems, getDescription }) => {
  useEffect(() => {
    if (!randomItems) {
      getRandomOne()
    }
    const interval = setInterval(() => {
      getRandomOne()
    }, 300000);
    return () => clearInterval(interval);
  }, [getRandomOne, randomItems])

  const openAnimationInfo = (info) => {
    getDescription(info);
  }

  return (
    <RandomItemsMenuDom {...{ randomItems, openAnimationInfo }} />
  )
}

const mapStatesToProps = (state) => {
  return {
    randomItems: state.description.randomItems
  }
}
export default connect(mapStatesToProps, { getRandomOne, getDescription })(RandomItemsMenu);