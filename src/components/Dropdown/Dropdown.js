import React from 'react';
import { connect } from 'react-redux';
import { DropdownDom } from './DropdownDom';

const Dropdown = ({ dropdown, openDropdown, buttonsFilter, filterHandler, listName }) => {

  return (
    <DropdownDom {...{ dropdown, openDropdown, buttonsFilter, filterHandler, listName }}/>
  )
}

const mapStatesToProps = (state) => {
  return {
    listName: state.list.listName,
  }
}

export default connect(mapStatesToProps, {})(Dropdown)