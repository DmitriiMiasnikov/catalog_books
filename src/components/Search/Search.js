import React, { useState } from 'react';
import { connect } from 'react-redux';
import { SearchDom } from './SearchDom';
import { setSearchValue } from './../../store/animationReducer';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

const Search = ({ setSearchValue, searchValue, history }) => {
  const [value, setValue] = useState('');
  const maxLength = 25;
  const searchHandler = (value, event) => {
    event.preventDefault();
    setSearchValue(value);
    setValue('');
    history.push(`/animation/list/1`);
  }
  const setValueFunc = (value) => {
    if (value.length <= maxLength) {
      setValue(value);
    }
  }
  const cancelSeach = () => {
    setSearchValue('');
  }
  return (
    <SearchDom searchHandler={searchHandler} value={value} setValueFunc={setValueFunc} searchValue={searchValue} 
    cancelSeach={cancelSeach} />
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