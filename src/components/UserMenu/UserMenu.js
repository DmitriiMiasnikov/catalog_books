import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { UserMenuDom } from './UserMenuDom';
import { getUser, selectUser } from '../../store/usersReducer';

const UserMenu = ({ currentUserId, getUser, userInfo, selectUser }) => {
  useEffect(() => {
    const fetchData = async () => {
      await getUser(currentUserId)
    }
    fetchData()
  }, [currentUserId, getUser])
  const openUserInfo = (id) => {
    selectUser(id);
  }
  return (
    <UserMenuDom userInfo={userInfo} openUserInfo={openUserInfo} />
  )
}

const mapStatesToProps = (state) => {
  return {
    currentUserId: state.users.currentUserId,
    userInfo: state.users.userInfo
  }
}

export default connect(mapStatesToProps, { getUser, selectUser })(UserMenu)