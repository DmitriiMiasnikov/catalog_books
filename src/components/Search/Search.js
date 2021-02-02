import React, { useState } from 'react';
import { connect } from 'react-redux';
import { SearchDom } from './SearchDom';
import { setSearchValue } from './../../store/animationReducer';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

const Search = ({ setSearchValue, searchValue }) => {
  const [value, setValue] = useState('');
  const searchHandler = (value, event) => {
    event.preventDefault();
    setSearchValue(value);
    setValue('');
  }
  const setValueFunc = (value) => {
    setValue(value);
  }
  return (
    <SearchDom searchHandler={searchHandler} value={value} setValueFunc={setValueFunc} />
  )
}

const mapStatesToProps = (state) => {
  return {
    searchValue: state.animation.searchValue
  }
}

export default compose(
  connect(mapStatesToProps, { setSearchValue }),
  withRouter
) (Search);