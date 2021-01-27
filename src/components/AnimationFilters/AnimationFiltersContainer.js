import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getAnimationList } from './../../store/animationReducer';
import { AnimationFilters } from './AnimationFilters';

const AnimationFiltersContainer = ({ animation, getAnimationList }) => {
  // const [animationList, setAnimationList] = useState([]);
  const [buttonsFilter, setButtonsFilter] = useState([]);
  const [dropdowns, setDropdowns] = useState([
    {
      id: 0,
      text: 'Аудитория',
      closed: true,
    }
  ])
  useEffect(() => {
    // const fetchData = async () => {
    //   !animation && await getAnimationList();
    // }
    // fetchData();
    // setAnimationList(animation);
    const auditoryItems = animation.map(el => el.auditory);
    const unique = (arr) => Array.from(new Set(arr));
    setButtonsFilter(unique(auditoryItems).filter(el => el));
  }, [getAnimationList, animation])
  const openDropdown = (dropdownId) => {
    setDropdowns(dropdowns.map(el => {
        if (el.id === dropdownId) {
          el.closed ? el.closed = false : el.closed = true
          return el;
        } else return el;
      }))
  }
  return (
    <AnimationFilters buttonsFilter={buttonsFilter} dropdowns={dropdowns} openDropdown={openDropdown} />
  )
}

const mapStatesToProps = (state) => {
  return {
    animation: state.animation.animation
  }
}

export default connect(mapStatesToProps, { getAnimationList })(AnimationFiltersContainer);