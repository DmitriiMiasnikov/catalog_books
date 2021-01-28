import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getAnimationList, getAnimationFilter } from './../../store/animationReducer';
import { AnimationFilters } from './AnimationFilters';

const AnimationFiltersContainer = ({ animation, getAnimationFilter }) => {
  const [buttonsFilter, setButtonsFilter] = useState([]);
  const [dropdowns, setDropdowns] = useState([
    {
      id: 0,
      text: 'Аудитория',
      closed: true,
    }
  ])
  useEffect(() => {
    const auditoryItems = animation.map(el => el.auditory);
    const unique = (arr) => Array.from(new Set(arr));
    setButtonsFilter(['все'].concat(unique(auditoryItems).filter(el => el)));
  }, [animation])
  const openDropdown = (dropdownId) => {
    setDropdowns(dropdowns.map(el => {
        if (el.id === dropdownId) {
          el.closed ? el.closed = false : el.closed = true
          return el;
        } else return el;
      }))
  }
  const filterHandler = async (filterBy) => {
    getAnimationFilter(filterBy);
  }
  return (
    <AnimationFilters buttonsFilter={buttonsFilter} dropdowns={dropdowns} 
      openDropdown={openDropdown} filterHandler={filterHandler}/>
  )
}

const mapStatesToProps = (state) => {
  return {
    animation: state.animation.animation
  }
}

export default connect(mapStatesToProps, { getAnimationList, getAnimationFilter })(AnimationFiltersContainer);