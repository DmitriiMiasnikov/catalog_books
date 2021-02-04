import React from 'react';
import { connect } from 'react-redux';
import { RegistrationDom } from './RegistrationDom';
import { userRegistration } from './../../store/usersReducer';

const Registration = ({ userRegistration }) => {
  const inputs = [
    {name: 'name', text: 'имя'},
    {name: 'password', text: 'пароль'},
    {name: 'repeatPassword', text: ' повторите пароль'},
    {name: 'email', text: 'email'}
  ]
  const validate = (data) => {
    const err = {};
    if (!data.name) err.name = 'Введите имя'
    if (!data.email) err.email = 'Введите почту'
    if (!data.password) err.password = 'Введите пароль'
    if (data.password && data.password.length > 10) err.password = 'Макс пароль 10 знаков'
    if (!data.repeatPassword) {
      err.repeatPassword = 'Повторите пароль'
    } else if (data.password !== data.repeatPassword) err.repeatPassword = 'Не совпадает пароль'
    // changeTextInput(data)
    return err
  }
  const registrationHandler = (data) => {
    userRegistration(data.name, data.password, data.email)
  }
  return (
    <RegistrationDom registrationHandler={registrationHandler} inputs={inputs} validate={validate}/>
  )
}

const mapStatesToProps = (state) => {
  return {

  }
}

export default connect(mapStatesToProps, { userRegistration })(Registration);