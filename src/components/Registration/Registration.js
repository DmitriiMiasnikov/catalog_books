import React from 'react';
import { connect } from 'react-redux';
import { RegistrationDom } from './RegistrationDom';
import { userRegistration } from './../../store/usersReducer';

const Registration = ({ userRegistration }) => {

  const registrationHandler = (event) => {
    event.preventDefault();
    userRegistration('asda', 'asdasd', 'asdasd')
  }
  return (
    <RegistrationDom registrationHandler={registrationHandler}/>
  )
}

const mapStatesToProps = (state) => {
  return {

  }
}

export default connect(mapStatesToProps, { userRegistration })(Registration);