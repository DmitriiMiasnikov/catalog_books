import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { MainDom } from './MainDom';
import { getDescription } from './../../store/descriptionReducer';
import { getLastViewedList } from './../../store/mainReducer';

const Main = ({ currentUserId, getDescription, getLastViewedList, lastViewed }) => {
  const [fetching, setFetching] = useState(true);
  const [scrollViewed, setSCrollViewed] = useState(null);
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
    if (lastViewed) {
      let obj = {};
      listNames.forEach(el => {
        obj[el.name] = {
          left: 0,
          right: lastViewed[el.name].length - 5,
          scroll: 0
        }
      })
      setSCrollViewed(obj);
    }
  }, [lastViewed])
  const openInfo = (listName, id) => {
    getDescription(listName, id);
  }
  const buttonScrollHandler = (listName, side) => {
    setSCrollViewed(scrollViewed => {
      let obj = {};
      Object.keys(scrollViewed).forEach(el => {
        if (listName === el) {
          obj[el] = {
            left: side === 'left' ? scrollViewed[el].left - 1 : scrollViewed[el].left + 1,
            right: side === 'left' ? scrollViewed[el].right + 1 : scrollViewed[el].right - 1,
            scroll: side === 'left' ? scrollViewed[el].scroll - 185 : scrollViewed[el].scroll + 185
          }
        } else obj[el] = scrollViewed[el];
      })
      return obj;
    });
  }

  return (
    <MainDom {...{ fetching, openInfo, lastViewed, buttonScrollHandler, scrollViewed, listNames }} />
  )
}

const mapStatesToProps = (state) => {
  return {
    lastViewed: state.main.lastViewed,
    currentUserId: state.users.currentUserId
  }
}

export default connect(mapStatesToProps, { getDescription, getLastViewedList })(Main);