import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { MainDom } from './MainDom';
import { getLastViewedList } from './../../store/mainReducer';

const Main = ({ currentUserId, getLastViewedList, lastViewed }) => {
  const [fetching, setFetching] = useState(true);
  const listNames = [
    { name: 'animation', text: 'аниме' },
    { name: 'manga', text: 'манга' },
    { name: 'ranobe', text: 'ранобэ' },
  ];
  useEffect(() => {
    if (currentUserId) {
      setFetching(true);
      const fetchData = async () => {
        await getLastViewedList(currentUserId);
        setFetching(false);
      }
      fetchData()
    }
  }, [getLastViewedList, currentUserId])

  return (
    <MainDom {...{ fetching, lastViewed, listNames, currentUserId }} />
  )
}

const mapStatesToProps = (state) => {
  return {
    lastViewed: state.main.lastViewed,
    currentUserId: state.users.currentUserId
  }
}

export default connect(mapStatesToProps, { getLastViewedList })(Main);