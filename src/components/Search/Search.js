import React, { useState } from 'react';
import { connect } from 'react-redux';
import { SearchDom } from './SearchDom';
import { setSearchValue } from './../../store/animationReducer';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

const Search = ({ setSearchValue, history }) => {
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
  return (
    <SearchDom searchHandler={searchHandler} value={value} setValueFunc={setValueFunc}/>
  )
}

const mapStatesToProps = (state) => {
  return {
    
  }
}

export default compose(
  connect(mapStatesToProps, { setSearchValue }),
  withRouter
) (Search);