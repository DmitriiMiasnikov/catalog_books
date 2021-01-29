import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getAnimationList, setFilterBy } from './../../store/animationReducer';
import { AnimationFilters } from './AnimationFilters';

const AnimationFiltersContainer = ({ setFilterBy, filters }) => {
  const [buttonsFilter, setButtonsFilter] = useState([]);
  const [dropdowns, setDropdowns] = useState([
    {
      id: 0,
      text: 'Аудитория',
      closed: true,
    }
  ])
  useEffect(() => {
    if (filters) {
      setButtonsFilter(filters.auditory.map((el, i) => {
        return {
          active: !i,
          auditory: el
        }
      }));
    }
  }, [])
  const openDropdown = (dropdownId) => {
    setDropdowns(dropdowns.map(el => {
      if (el.id === dropdownId) {
        el.closed ? el.closed = false : el.closed = true
        return el;
      } else return el;
    }))
  }
  const filterHandler = (filterBy, indexButton) => {
    setFilterBy(filterBy);
    setButtonsFilter((buttons) => {
      return buttons.map((el, i) => {
        if (i === indexButton) {
          el.active = true
        } else el.active = false
        return el
      })
    })
  }
  return (
    <AnimationFilters buttonsFilter={buttonsFilter} dropdowns={dropdowns}
      openDropdown={openDropdown} filterHandler={filterHandler} />
  )
}

const mapStatesToProps = (state) => {
  return {
    animation: state.animation.animation,
    filters: state.animation.filters
  }
}

export default connect(mapStatesToProps, { getAnimationList, setFilterBy })(AnimationFiltersContainer);