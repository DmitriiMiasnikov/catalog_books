import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ScrollItemsDom } from './ScrollItemsDom';
import { getDescription } from './../../store/descriptionReducer';

const ScrollItems = ({ name, items, getDescription }) => {
  const [scrollPosition, setScrollPosition] = useState(null);
  useEffect(() => {
    if (items) {
      setScrollPosition({
        left: 0,
        right: items.length - 5,
        scroll: 0
      });
    }
  }, [items])
  const openInfo = (id) => {
    getDescription(name, id);
  }
  const buttonScrollHandler = (side) => {
    setScrollPosition({
      left: side === 'left' ? scrollPosition.left - 1 : scrollPosition.left + 1,
      right: side === 'left' ? scrollPosition.right + 1 : scrollPosition.right - 1,
      scroll: side === 'left' ? scrollPosition.scroll - 185 : scrollPosition.scroll + 185
    });
  }

  return (
    <ScrollItemsDom {...{ openInfo, buttonScrollHandler, scrollPosition, name, items }} />
  )
}
const mapStatesToProps = (state) => {
  return {

  }
}

export default connect(mapStatesToProps, { getDescription })(ScrollItems);