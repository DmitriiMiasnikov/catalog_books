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
    if (!data.name) err.name = 'Введите имя';
    if (data.name && data.name.length < 6) err.name = 'Мин. длина имени 6 знаков';

    if (!data.email) err.email = 'Введите почту';
    if (data.email && !data.email.includes('@')) err.email = 'Введите корректную почту';

    if (!data.password) err.password = 'Введите пароль';
    if (data.password && data.password.length < 6) err.password = 'Мин. пароль 6 знаков';
    if (data.password && data.password.length > 15) err.password = 'Макс. пароль 15 знаков';

    if (!data.repeatPassword) {
      err.repeatPassword = 'Повторите пароль';
    } else if (data.password !== data.repeatPassword) err.repeatPassword = 'Не совпадает пароль';

    return err
  }
  const registrationHandler = (data) => {
    userRegistration(data.name, data.password, data.email);
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