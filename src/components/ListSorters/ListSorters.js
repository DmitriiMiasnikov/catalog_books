import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setSortBy, setPage } from '../../store/animationReducer';
import { ListSortersDom } from './ListSortersDom';

const ListSorters = ({ setSortBy, setPage, currentPage, buttons }) => {
  const [buttonsSort, setButtonsSort] = useState(buttons.map((el, i) => {
    return { ...el, id: i, active: false}
  }))
  const sortHandler = (buttonId, sort) => {
    setButtonsSort(buttonsSort.map(el => {
      if (el.id !== buttonId) {
        el.active = false
        el.direction = 'direct'
        el.sort = el.sort.split('_')[0]
      } else {
        el.sort = el.sort.split('_').length === 1 && el.active ? `${el.sort}_reverse` : el.sort.split('_')[0]
        el.direction = el.direction === 'direct' && el.active ? 'reverse' : 'direct'
        el.active = true
      }
      return el
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