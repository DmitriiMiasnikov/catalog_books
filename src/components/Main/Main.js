import React from 'react';
import { connect } from 'react-redux';
import { MainDom } from './MainDom';

const Main = () => {

  return (
    <MainDom />
  )
}

const mapStatesToProps = (state) => {
  return {

  }
}

export default connect(mapStatesToProps, {})(Main);