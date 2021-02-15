import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setUserInfoLists } from '../../store/usersReducer';
import { ButtonSwitcherDom } from './ButtonSwitcherDom';

const ButtonSwitcher = ({ currentUserId, setUserInfoLists, myUserInfo, currentId, list }) => {
  const [userInfoLists, setUsersInfoLists] = useState(null);
  const buttonsControl = [{
    id: 1,
    text: 'в очередь',
    type: 'queue'
  },
  {
    id: 2,
    text: 'завершил',
    type: 'done'
  }];
  useEffect(() => {
    if (myUserInfo) {
      setUsersInfoLists({
        'queue': myUserInfo[list].queue.includes(currentId),
        'done': myUserInfo[list].done.includes(currentId),
      })
    }
  }, [currentId, currentUserId, setUsersInfoLists, myUserInfo, list])

  const userInfoListsHandler = (type) => {
    setUserInfoLists(currentUserId, list, currentId, type);
  }

  return (
    <ButtonSwitcherDom {...{ userInfoLists, currentUserId, userInfoListsHandler, buttonsControl }} />
  )
}

const mapStatesToProps = (state) => {
  return {
    currentUserId: state.users.currentUserId,
    myUserInfo: state.users.myUserInfo
  }
}

export default connect(mapStatesToProps, { setUserInfoLists })(ButtonSwitcher);