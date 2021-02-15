import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { UserMenuDom } from './UserMenuDom';
import { getMyUserInfo, clearCurrentUserInfo } from '../../store/usersReducer';

const UserMenu = ({ currentUserId, getMyUserInfo, myUserInfo, isAuth, 
    isWrongAuthorization, clearCurrentUserInfo, isMobile }) => {
  const [showLoginBlockMobile, setShowLoginBlockMobile] = useState(false);
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
  const leftUser = () => {
    clearCurrentUserInfo();
  }
  const showLoginBlockHandler = (close) => {
    setShowLoginBlockMobile(showLoginBlockMobile => close !== undefined ? close : !showLoginBlockMobile)
  }
  return (
    <UserMenuDom {...{myUserInfo, openUserInfo, isAuth, isWrongAuthorization, 
      leftUser, isMobile, showLoginBlockHandler, showLoginBlockMobile }} />
  )
}

const mapStatesToProps = (state) => {
  return {
    currentUserId: state.users.currentUserId,
    myUserInfo: state.users.myUserInfo,
    isAuth: state.users.isAuth,
    isWrongAuthorization: state.users.isWrongAuthorization,
    isMobile: state.main.isMobile,
  }
}

export default connect(mapStatesToProps, { getMyUserInfo, clearCurrentUserInfo })(UserMenu)