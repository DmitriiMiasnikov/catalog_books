import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Search } from './Search'

const SearchContainer = ({  }) => {
  const [searchValue, setSearchValue] = useState('');
  const searchHandler = (value) => {
    setSearchValue(value);
  }
  return (
    <Search searchHandler={searchHandler} searchValue={searchValue} />
  )
}

const mapStatesToProps = (state) => {
  return {

  }
}

export default connect(mapStatesToProps, {})(SearchContainer);