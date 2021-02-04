import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { UserMenuDom } from './UserMenuDom';
import { getMyUserInfo, userAuthorization, clearCurrentUserInfo } from '../../store/usersReducer';

const UserMenu = ({ currentUserId, getMyUserInfo, myUserInfo, isAuth, userAuthorization, isWrongAuthorization }) => {
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
  useEffect(() => {
    if (currentUserId) {
      const fetchData = async () => {
        await getMyUserInfo(currentUserId)
      }
      fetchData()
    }
  }, [currentUserId, getMyUserInfo])
  const openUserInfo = () => {
  }
  const authorizationHandler = (data) => {
    userAuthorization(data.name, data.password);
  }
  const leftUser = () => {
    clearCurrentUserInfo();
  }
  return (
    <UserMenuDom myUserInfo={myUserInfo} openUserInfo={openUserInfo} isAuth={isAuth} inputs={inputs} validate={validate}
      authorizationHandler={authorizationHandler} isWrongAuthorization={isWrongAuthorization} leftUser={leftUser}/>
  )
}

const mapStatesToProps = (state) => {
  return {
    currentUserId: state.users.currentUserId,
    myUserInfo: state.users.myUserInfo,
    isAuth: state.users.isAuth,
    isWrongAuthorization: state.users.isWrongAuthorization
  }
}

export default connect(mapStatesToProps, { getMyUserInfo, userAuthorization, clearCurrentUserInfo })(UserMenu)