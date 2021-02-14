import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setSortBy, setPage } from '../../store/listSettingsReducer';
import { ListSortersDom } from './ListSortersDom';

const ListSorters = ({ setSortBy, setPage, currentPage, listName, isMobileLess }) => {
  const [showButtonsSort, setShowButtonsSort] = useState(false);
  const [buttonsSort, setButtonsSort] = useState([{
    id: 0,
    subButtons: [{
      id: 0,
      sort: 'name',
      text: 'алфавитный порядок',
      active: false
    }, 
    {
      id: 1,
      sort: 'name_reverse',
      text: 'с конца алфавита',
      active: false
    }]
  },
  {
    id: 1,
    subButtons: [{
      id: 0,
      sort: 'date_reverse',
      text: 'сначала новые',
      active: false
    }, 
    {
      id: 1,
      sort: 'date',
      text: 'сначала старые',
      active: false
    }]
  }]);
  const [showDropdowns, setShowDropdowns] = useState([false, false]);
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
    setShowDropdowns(showDropdowns.map(el => el = false));
    if (currentPage !== 1) setPage(1);
  }
  const showDropdownFunc = (index, show) => {
    setShowDropdowns(showDropdowns.map((el, i) => {
      if (i === index) {
        el = show;
      }
      return el;
    }))
  }
  const showButtonsSortHandler = (close) => {
    setShowButtonsSort(showButtonsSort => close !== undefined ? close : !showButtonsSort)
  }
  return (
    <ListSortersDom sortHandler={sortHandler} buttonsSort={buttonsSort} showDropdownFunc={showDropdownFunc} 
      showDropdowns={showDropdowns} listName={listName} isMobileLess={isMobileLess} showButtonsSort={showButtonsSort}
      showButtonsSortHandler={showButtonsSortHandler} />
  )
}
const mapStatesToProps = (state) => {
  return {
    currentPage: state.listSettings.currentPage,
    isMobileLess: state.main.isMobileLess
  }
}

export default connect(mapStatesToProps, { setSortBy, setPage })(ListSorters);