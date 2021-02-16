import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { setUserInfoLists } from '../../store/usersReducer';
import { ButtonSwitcherDom } from './ButtonSwitcherDom';

const ButtonSwitcher = ({ currentUserId, setUserInfoLists, myUserInfo, currentId, list, buttons }) => {
  const [userInfoLists, setUsersInfoLists] = useState(null);
  const setButtonsCallback = useCallback((buttons) => {
    const newInfoButtons = {};
    buttons.forEach(el => {
      newInfoButtons[el.type] = myUserInfo[list][el.type].includes(currentId)
    })
    setUsersInfoLists(newInfoButtons)
  }, [currentId, setUsersInfoLists, myUserInfo, list])

  useEffect(() => {
    if (myUserInfo) {
      setButtonsCallback(buttons);
    }
  }, [ myUserInfo, setButtonsCallback, buttons ])

  const userInfoListsHandler = (type) => {
    setUserInfoLists(currentUserId, list, currentId, type);
  }

  return (
    <ButtonSwitcherDom {...{ userInfoLists, currentUserId, userInfoListsHandler, buttons }} />
  )
}

const mapStatesToProps = (state) => {
  return {
    currentUserId: state.users.currentUserId,
    myUserInfo: state.users.myUserInfo
  }
}

export default connect(mapStatesToProps, { setUserInfoLists })(ButtonSwitcher);