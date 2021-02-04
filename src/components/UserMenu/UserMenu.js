import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { UserMenuDom } from './UserMenuDom';
import { getMyUserInfo } from '../../store/usersReducer';

const UserMenu = ({ currentUserId, getMyUserInfo, myUserInfo, isAuth }) => {
  useEffect(() => {
    const fetchData = async () => {
      await getMyUserInfo(currentUserId)
    }
    fetchData()
  }, [currentUserId, getMyUserInfo])
  const openUserInfo = () => {
  }
  return (
    <UserMenuDom myUserInfo={myUserInfo} openUserInfo={openUserInfo} isAuth={isAuth} />
  )
}

const mapStatesToProps = (state) => {
  return {
    currentUserId: state.users.currentUserId,
    myUserInfo: state.users.myUserInfo,
    isAuth: state.users.isAuth
  }
}

export default connect(mapStatesToProps, { getMyUserInfo })(UserMenu)