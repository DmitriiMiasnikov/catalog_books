import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { UserDom } from './UserDom';
import { getUser, getUsersAnimationList, selectUser } from './../../store/usersReducer';
import { getAnimation } from './../../store/animationDescriptionReducer';

const User = ({ currentUserId, match, getUser, userInfo, getUsersAnimationList, usersAnimationList, getAnimation,
  restCountAnimation, selectUser }) => {
  const selectedUserId = Number(match.params.userId);
  const [buttonsMain, setButtonsMain] = useState([
    {name: 'books', text: 'Книги', active: true},
    {name: 'animation', text: 'Аниме', active: true},
  ])
  const [buttonsAnimation, setButtonsAnimation] = useState([
    {name: 'done', text: 'Просмотренное', active: true},
    {name: 'queue', text: 'В очереди', active: true},
    {name: 'selected', text: 'Избранное', active: true}
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
  const openAnimationInfo = (info) => {
    getAnimation(info);
  }
  const openAnimationList = () => {
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
    openAnimationInfo={openAnimationInfo} restCountAnimation={restCountAnimation} openAnimationList={openAnimationList}
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
  connect(mapStatesToProps, { getUser, getUsersAnimationList, getAnimation, selectUser }),
  withRouter
)(User);