import React from 'react';
import { connect } from 'react-redux';
import { LoginBlockDom } from './LoginBlockDom';
import { userAuthorization, setShowRegistration } from '../../store/usersReducer';

const LoginBlock = ({ setShowRegistration, userAuthorization }) => {
  const inputs = [
    { name: 'name', text: 'имя' },
    { name: 'password', text: 'пароль' },
  ]
  const validate = (data) => {
    const err = {};
    // if (!data.name) err.name = 'Введите имя';
    // if (!data.password) err.password = 'Введите пароль';
    return err
  }
  const authorizationHandler = (data) => {
    userAuthorization(data.name, data.password);
  }
  const showRegistrationHandler = () => {
    setShowRegistration(true);
  }
  return (
    <LoginBlockDom {...{ validate, authorizationHandler, showRegistrationHandler, inputs }} />
  )
}

const mapStatesToProps = (state) => {
  return {

  }
}
export default connect(mapStatesToProps, { userAuthorization, setShowRegistration })(LoginBlock)