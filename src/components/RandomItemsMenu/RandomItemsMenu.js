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

  const openInfo = (listName, id) => {
    getDescription(listName, id);
  }

  return (
    <RandomItemsMenuDom {...{ randomItems, openInfo }} />
  )
}

const mapStatesToProps = (state) => {
  return {
    randomItems: state.description.randomItems
  }
}
export default connect(mapStatesToProps, { getRandomOne, getDescription })(RandomItemsMenu);