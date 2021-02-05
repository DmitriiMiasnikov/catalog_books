import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getUsersList } from '../../store/usersReducer';
import { UsersDom } from './UsersDom';

const Users = ({ getUsersList, usersList }) => {

  useEffect(() => {
    getUsersList()
  }, [getUsersList])

  return (
    <UsersDom usersList={usersList}/>
  )
}

const mapStatesToProps = (state) => {
  return {
    usersList: state.users.usersList
  }
}

export default compose(
  connect(mapStatesToProps, { getUsersList })
)(Users)