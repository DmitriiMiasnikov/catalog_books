import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { MainDom } from './MainDom';
import { getLastViewedList, getRandomItemsByGenre } from './../../store/mainReducer';

const Main = ({ currentUserId, getLastViewedList, lastViewed, randomItemsByGenre, getRandomItemsByGenre }) => {
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
  useEffect(() => {
    setFetching(true);
    const fetchData = async () => {
      await getRandomItemsByGenre();
      setFetching(false);
    }
    fetchData()
  }, [getRandomItemsByGenre])

  return (
    <MainDom {...{ fetching, lastViewed, listNames, currentUserId, randomItemsByGenre }} />
  )
}

const mapStatesToProps = (state) => {
  return {
    lastViewed: state.main.lastViewed,
    currentUserId: state.users.currentUserId,
    randomItemsByGenre: state.main.randomItemsByGenre
  }
}

export default connect(mapStatesToProps, { getLastViewedList, getRandomItemsByGenre })(Main);