import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { UsersDom } from './UsersDom';

const Users = () => {
  return (
    <UsersDom />
  )
}

const mapStatesToProps = (state) => {
  return {
    
  }
}

export default compose(
  connect(mapStatesToProps, {})
)(Users)