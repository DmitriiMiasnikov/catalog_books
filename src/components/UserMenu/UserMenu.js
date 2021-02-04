import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { UserMenuDom } from './UserMenuDom';
import { getMyUserInfo, userAuthorization } from '../../store/usersReducer';

const UserMenu = ({ currentUserId, getMyUserInfo, myUserInfo, isAuth, userAuthorization, isWrongAuthorization }) => {
  const inputs = [
    { name: 'name', text: 'имя' },
    { name: 'password', text: 'пароль' },
  ]
  const validate = (data) => {
    const err = {};
    // if (!data.name) err.name = 'Введите имя';
    // if (data.name && data.name.length < 6) err.name = 'Мин. длина имени 6 знаков';

    // if (!data.password) err.password = 'Введите пароль';
    // if (data.password && data.password.length < 6) err.password = 'Мин. пароль 6 знаков';
    // if (data.password && data.password.length > 15) err.password = 'Макс. пароль 15 знаков';

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
  return (
    <UserMenuDom myUserInfo={myUserInfo} openUserInfo={openUserInfo} isAuth={isAuth} inputs={inputs} validate={validate}
      authorizationHandler={authorizationHandler} isWrongAuthorization={isWrongAuthorization}/>
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

export default connect(mapStatesToProps, { getMyUserInfo, userAuthorization })(UserMenu)