import React from 'react';
import { connect } from 'react-redux';
import { Authors } from './Authors';

const AuthorsContainer = ({ authors }) => {
  return (
    <Authors authors={authors} />
  )
}

const mapStatesToProps = (state) => {
  return {
    authors: state.authors.authors
  }
}

export default connect(mapStatesToProps, {})(AuthorsContainer);