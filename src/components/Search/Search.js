import React, { useState } from 'react';
import { connect } from 'react-redux';
import { SearchDom } from './SearchDom';
import { setSearchValue } from './../../store/listSettingsReducer';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

const Search = ({ setSearchValue, history, listName }) => {
  const [value, setValue] = useState('');
  const maxLength = 25;
  const searchHandler = (value, event) => {
    event.preventDefault();
    setSearchValue(value);
    setValue('');
    history.push(`/list/${listName}/1`);
  }
  const setValueFunc = (value) => {
    if (value.length <= maxLength) {
      setValue(value);
    }
  }
  return (
    <SearchDom {...{ searchHandler, value, setValueFunc, listName }} />
  )
}

const mapStatesToProps = (state) => {
  return {
    listName: state.list.listName
  }
}

export default compose(
  connect(mapStatesToProps, { setSearchValue }),
  withRouter
)(Search);