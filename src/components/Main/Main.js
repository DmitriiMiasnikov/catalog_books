import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { MainDom } from './MainDom';
import { getAnimation } from './../../store/animationDescriptionReducer';
import { getLastViewedList } from './../../store/mainReducer';

const Main = ({ currentUserId, getAnimation, getLastViewedList, lastViewed }) => {
  const [fetching, setFetching] = useState(true);

  const openAnimationInfo = (info) => {
    getAnimation(info);
  }
  useEffect(() => {
    setFetching(true);
    const fetchData = async () => {
      await getLastViewedList(currentUserId);
      setFetching(false);
    }
    fetchData()
  }, [getLastViewedList, currentUserId])

  return (
    <MainDom {...{ fetching, openAnimationInfo, lastViewed }} />
  )
}

const mapStatesToProps = (state) => {
  return {
    lastViewed: state.main.lastViewed,
    currentUserId: state.users.currentUserId
  }
}

export default connect(mapStatesToProps, { getAnimation, getLastViewedList })(Main);