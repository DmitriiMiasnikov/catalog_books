import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getAnimationList, setFilterBy, setPage } from './../../store/animationReducer';
import { AnimationFilters } from './AnimationFilters';

const AnimationFiltersContainer = ({ setFilterBy, filters, filterBy,setPage }) => {
  const [buttonsFilter, setButtonsFilter] = useState({});
  const [dropdowns, setDropdowns] = useState([
    {
      id: 0,
      text: 'Аудитория',
      type: 'auditory',
      closed: true,
    },
    {
      id: 1,
      text: 'Жанр',
      type: 'genre',
      closed: true,
    }
  ])
  const parametres = useLocation().search;
  useEffect(() => {
    if (filters && filterBy === 'все') {
      const filtersCopy = {};
      dropdowns.forEach((el, i) => {
        filtersCopy[el.type] = filters[el.type].map((item, j) => {
          return {
            active: !j,
            [el.type]: item
          }
        })
      })
      setButtonsFilter(filtersCopy);
    }
  }, [filters, dropdowns, filterBy])
  const openDropdown = (dropdownId) => {
    setDropdowns(dropdowns.map(el => {
      if (el.id === dropdownId) {
        el.closed ? el.closed = false : el.closed = true
      } else {
        el.closed = true;
      }
      return el;
    }))
  }
  const filterHandler = (dropdown, filterBy, indexButton) => {
    setFilterBy(filterBy);
    setPage(1);
    setButtonsFilter((buttons) => {
      const obj = {};
      Object.keys(buttons).forEach((el, i) => {
        obj[el] = buttons[el];
        if (dropdown === el) {
          obj[el].map((item, j) => {
            if (j === indexButton) {
              item.active = true
            } else item.active = false
            return item;
          })
        } else obj[el].map((item, j) => {
          item.active = false
          return item;
        })
      })
      
      return obj;
    })
  }
  return (
    <AnimationFilters buttonsFilter={buttonsFilter} dropdowns={dropdowns}
      openDropdown={openDropdown} filterHandler={filterHandler} parametres={parametres}/>
  )
}

const mapStatesToProps = (state) => {
  return {
    animation: state.animation.animation,
    filters: state.animation.filters,
    filterBy: state.animation.filterBy,
  }
}

export default connect(mapStatesToProps, { getAnimationList, setFilterBy, setPage })(AnimationFiltersContainer);