import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { UserDom } from './UserDom';
import { getUser, getUsersAnimationList, selectUser } from './../../store/usersReducer';
import { getDescription } from './../../store/descriptionReducer';
import { setUserFilter } from './../../store/filterReducer';

const User = ({ currentUserId, match, getUser, userInfo, getUsersAnimationList, usersAnimationList, getDescription,
  restCountAnimation, selectUser, setUserFilter }) => {
  const selectedUserId = Number(match.params.userId);
  const [buttonsMain, setButtonsMain] = useState([
    {name: 'books', text: 'Книги', active: true},
    {name: 'animation', text: 'Аниме', active: true},
  ])
  const [buttonsAnimation, setButtonsAnimation] = useState([
    {name: 'done', text: 'Просмотренное', active: true},
    {name: 'queue', text: 'В очереди', active: true},
])
  const selectedUserMine = currentUserId === selectedUserId;
  const [fetching, setFetching] = useState(true);
  useEffect(() => {
    setFetching(true);
    const fetchData = async () => {
      await getUser(selectedUserId);
      await getUsersAnimationList(selectedUserId);
      setFetching(false);
    }
    fetchData()
  }, [selectedUserId, getUser, getUsersAnimationList])
  const openDescription = (listName, info) => {
    getDescription(listName, info);
  }
  const openAnimationList = (userFilter) => {
    setUserFilter(userFilter)
    selectUser(selectedUserId);
  }
  const ButtonsMainHandler = (target) => {
    setButtonsMain(buttonsMain.map(el => {
      if (el.name === target) el.active = !el.active
      return el
    }))
  }
  const ButtonsAnimationHandler = (target) => {
    setButtonsAnimation(buttonsAnimation.map(el => {
      if (el.name === target) el.active = !el.active
      return el
    }))
  }
  return (
    <UserDom userInfo={userInfo} selectedUserMine={selectedUserMine} usersAnimationList={usersAnimationList}
    openDescription={openDescription} restCountAnimation={restCountAnimation} openAnimationList={openAnimationList}
    fetching={fetching} buttonsAnimation={buttonsAnimation} buttonsMain={buttonsMain} ButtonsMainHandler={ButtonsMainHandler}
    ButtonsAnimationHandler={ButtonsAnimationHandler}/>
  )
}

const mapStatesToProps = (state) => {
  return {
    currentUserId: state.users.currentUserId,
    userInfo: state.users.userInfo,
    usersAnimationList: state.users.usersAnimationList,
    usersAllAnimationList: state.users.usersAllAnimationList,
    restCountAnimation: state.users.restCountAnimation
  }
}
export default compose(
  connect(mapStatesToProps, { getUser, getUsersAnimationList, getDescription, selectUser, setUserFilter }),
  withRouter
)(User);