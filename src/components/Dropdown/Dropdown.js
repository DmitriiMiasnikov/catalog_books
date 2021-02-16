import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { DropdownDom } from './DropdownDom';
import { setFilterBy } from './../../store/filterReducer';

const Dropdown = ({ dropdown, items, listName, history, setFilterBy, filterBy }) => {
  const [dropdownState, setDropdownState] = useState(dropdown);
  const [itemsState, setItemsState] = useState(items);

  useEffect(() => {
    if (items) {
      setItemsState(itemsState => itemsState.map((el, i) => {
        if (el[dropdownState.type] !== filterBy && filterBy !== 'все') {
          el.active = false
        } else if (filterBy === 'все') {
          el.active = !i
        }
        return el
      }));
    }
  }, [filterBy, dropdownState.type, items])

  const openDropdown = (currentId) => {
    if (dropdownState.id === currentId) {
      setDropdownState({ ...dropdownState, closed: !dropdownState.closed })
    } else setDropdownState({ ...dropdownState, closed: true })
  }

  const filterHandler = (filterBy, indexButton) => {
    setFilterBy(filterBy);
    history.push(`/list/${listName}/1`);
    setItemsState(itemsState => itemsState.map((el, i) => {
      if (i === indexButton) {
        el.active = true
      } else el.active = false
      return el
    }));
  }

  return (
    <DropdownDom {...{ dropdownState, openDropdown, itemsState, filterHandler, listName }} />
  )
}

const mapStatesToProps = (state) => {
  return {
    listName: state.list.listName,
    filterBy: state.filter.filterBy
  }
}

export default compose(
  connect(mapStatesToProps, { setFilterBy }),
  withRouter
)(Dropdown)