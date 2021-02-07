import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setSortBy, setPage } from '../../store/animationReducer';
import { ListSortersDom } from './ListSortersDom';

const ListSorters = ({ setSortBy, setPage, currentPage, buttons }) => {
  const [buttonsSort, setButtonsSort] = useState(buttons);
  const sortHandler = (buttonId, subButtonId, sort) => {
    setButtonsSort(buttonsSort.map(el => {
      if (el.id !== buttonId) {
        el.subButtons.forEach(item => item.active = false);
      } else {
        el.subButtons.forEach(item => {
          if (item.id !== subButtonId) {
            item.active = false
          } else item.active = true
        })
      }
      return el;
    }))
    setSortBy(sort);
    if (currentPage !== 1) setPage(1);
  }

  return (
    <ListSortersDom sortHandler={sortHandler} buttonsSort={buttonsSort}/>
  )
}
const mapStatesToProps = (state) => {
  return {
    currentPage: state.animation.currentPage,
  }
}

export default connect(mapStatesToProps, { setSortBy, setPage })(ListSorters);