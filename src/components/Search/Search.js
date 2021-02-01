import React, { useState } from 'react';
import { connect } from 'react-redux';
import { SearchDom } from './SearchDom';
import { setSearchValue } from './../../store/animationReducer';

const Search = ({ setSearchValue }) => {
  const [value, setValue] = useState('');
  const searchHandler = (value) => {
    setSearchValue(value);
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

  }
}

export default connect(mapStatesToProps, { setSearchValue })(Search);