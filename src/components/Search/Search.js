import React, { useState } from 'react';
import { connect } from 'react-redux';
import { SearchDom } from './SearchDom';
import { setSearchValue } from './../../store/animationReducer';

const Search = ({ setSearchValue, searchValue }) => {
  const [value, setValue] = useState('');
  const searchHandler = (value) => {
    console.log(value);
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

export default connect(mapStatesToProps, { setSearchValue })(Search);