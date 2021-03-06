import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ScrollItemsDom } from './ScrollItemsDom';

const ScrollItems = ({ name, items, title = false }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [settingsScroll, setSettingsScroll] = useState({
    itemsShown: 5,
    scroll: 203
  });
  const widthHandler = useCallback(() => {
    let newSettings = {}
    switch (true) {
      case (window.innerWidth >= 1601): {
        newSettings = { itemsShown: 6, scroll: 203 };
        break;
      }
      case (window.innerWidth <= 1600 && window.innerWidth > 1335): {
        newSettings = { itemsShown: 5, scroll: 203 };
        break;
      }
      case (window.innerWidth <= 1335 && window.innerWidth > 1135): {
        newSettings = { itemsShown: 4, scroll: 203 };
        break;
      }
      case (window.innerWidth <= 1135 && window.innerWidth > 750): {
        newSettings = { itemsShown: 3, scroll: 203 };
        break;
      }
      case (window.innerWidth <= 750): {
        newSettings = { itemsShown: 2, scroll: 203 };
        break;
      }
      default: newSettings = settingsScroll; break;
    }
    if (Object.keys(newSettings).some(el => newSettings[el] !== settingsScroll[el])) {
      setSettingsScroll(newSettings)
    }
  }, [settingsScroll])
  const subscribeResize = () => window.addEventListener('resize', widthHandler);
  const unsubscribeResize = () => window.removeEventListener('resize', widthHandler);
  useEffect(() => {
    subscribeResize()
    return () => unsubscribeResize()
  })
  useEffect(() => {
    widthHandler();
    let arrPos = [];
    for(let i = 0; i < items.length; i++) {
      arrPos.push(i * settingsScroll.scroll);
    }
    arrPos = arrPos.map((el, i) => Math.abs(el - scrollPosition));
    let newPos = arrPos.findIndex(el => el === Math.min(...arrPos));
    if (items.length - (newPos + settingsScroll.itemsShown) < 0) newPos = newPos - 1
    setScrollPosition(settingsScroll.scroll * newPos);
  }, [widthHandler, items.length, scrollPosition, settingsScroll])
  const buttonScrollHandler = (side) => {
    let newPosition = null;
    if (scrollPosition === 0 && side === 'left') {
      newPosition = settingsScroll.scroll * (items.length - settingsScroll.itemsShown);
    } else if (scrollPosition === settingsScroll.scroll * (items.length - settingsScroll.itemsShown) && side === 'right') {
      newPosition = 0
    } else {
      newPosition = side === 'left' ? scrollPosition - settingsScroll.scroll : scrollPosition + settingsScroll.scroll;
    }
    setScrollPosition(newPosition);
  }

  return (
    <ScrollItemsDom {...{ buttonScrollHandler, scrollPosition, name, items, title }} />
  )
}
const mapStatesToProps = (state) => {
  return {

  }
}

export default connect(mapStatesToProps, {})(ScrollItems);