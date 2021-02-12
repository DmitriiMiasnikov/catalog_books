import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { MainDom } from './MainDom';
import { getDescription } from './../../store/descriptionReducer';
import { getLastViewedList } from './../../store/mainReducer';

const Main = ({ currentUserId, getDescription, getLastViewedList, lastViewed }) => {
  const [fetching, setFetching] = useState(true);
  const [scrollViewed, setSCrollViewed] = useState(null);
  useEffect(() => {
    setFetching(true);
    const fetchData = async () => {
      await getLastViewedList(currentUserId);
      setFetching(false);
    }
    fetchData()
  }, [getLastViewedList, currentUserId])
  useEffect(() => {
    if (lastViewed) setSCrollViewed({
      left: 0,
      right: lastViewed.length - 5,
      scroll: 0
    })
  }, [lastViewed])
  const openAnimationInfo = (listName, id) => {
    getDescription(listName, id);
  }
  const buttonScrollHandler = (side) => {
    setSCrollViewed({
      left: side === 'left' ? scrollViewed.left - 1 : scrollViewed.left + 1,
      right: side === 'left' ? scrollViewed.right + 1 : scrollViewed.right - 1,
      scroll: side === 'left' ? scrollViewed.scroll - 185 : scrollViewed.scroll + 185
    });
  }
  return (
    <MainDom {...{ fetching, openAnimationInfo, lastViewed, buttonScrollHandler, scrollViewed }} />
  )
}

const mapStatesToProps = (state) => {
  return {
    lastViewed: state.main.lastViewed,
    currentUserId: state.users.currentUserId
  }
}

export default connect(mapStatesToProps, { getDescription, getLastViewedList })(Main);