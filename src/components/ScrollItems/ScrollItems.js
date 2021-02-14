import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ScrollItemsDom } from './ScrollItemsDom';

const ScrollItems = ({ name, items }) => {
  const [scrollPosition, setScrollPosition] = useState(null);
  const [settingsScroll, setSettingsScroll] = useState({
    itemsShown: 5,
    scroll: 185
  });
  const widthHandler = () => {
    let newSettings = {}
    switch (true) {
      case (window.innerWidth > 1452): {
        newSettings = { itemsShown: 5, scroll: 207 };
        break;
      }
      case (window.innerWidth <= 1452 && window.innerWidth > 1300): {
        newSettings = { itemsShown: 5, scroll: 185 };
        break;
      }
      case (window.innerWidth <= 1300 && window.innerWidth > 1135): {
        newSettings = { itemsShown: 4, scroll: 190 };
        break;
      }
      case (window.innerWidth <= 1135 && window.innerWidth > 750): {
        newSettings = { itemsShown: 3, scroll: 202 };
        break;
      }
      case (window.innerWidth <= 750): {
        newSettings = { itemsShown: 2, scroll: 202 };
        break;
      }
      default: newSettings = settingsScroll; break;
    }
    if (Object.keys(newSettings).some(el => newSettings[el] !== settingsScroll[el])) {
      setSettingsScroll(newSettings)
    }
  }
  const subscribeResize = () => window.addEventListener('resize', widthHandler);
  const unsubscribeResize = () => window.removeEventListener('resize', widthHandler);
  useEffect(() => {
    subscribeResize()
    return () => unsubscribeResize()
  }, [subscribeResize, unsubscribeResize])
  useEffect(() => {
    widthHandler()
    if (items) {
      setScrollPosition({
        left: 0,
        right: items.length - settingsScroll.itemsShown,
        scroll: 0
      });
    }
  }, [settingsScroll, items])
  const buttonScrollHandler = (side) => {
    setScrollPosition({
      left: side === 'left' ? scrollPosition.left - 1 : scrollPosition.left + 1,
      right: side === 'left' ? scrollPosition.right + 1 : scrollPosition.right - 1,
      scroll: side === 'left' ? scrollPosition.scroll - settingsScroll.scroll : scrollPosition.scroll + settingsScroll.scroll
    });
  }

  return (
    <ScrollItemsDom {...{ buttonScrollHandler, scrollPosition, name, items }} />
  )
}
const mapStatesToProps = (state) => {
  return {

  }
}

export default connect(mapStatesToProps, {})(ScrollItems);