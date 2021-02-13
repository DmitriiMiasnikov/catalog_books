import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { UserDom } from './UserDom';
import { getUser, selectUser } from './../../store/usersReducer';
import { getDescription } from './../../store/descriptionReducer';
import { setUserFilter } from './../../store/filterReducer';
import { getUserListItems } from './../../store/userListItemsReducer';

const User = ({ currentUserId, match, getUser, userInfo, getDescription, selectUser, setUserFilter, 
  userListItemsFive, userListItemsRest, getUserListItems }) => {
  const selectedUserId = Number(match.params.userId);
  const [buttonsMain, setButtonsMain] = useState([
    {name: 'animation', text: 'Аниме', active: true},
    {name: 'manga', text: 'Манга', active: true},
    {name: 'ranobe', text: 'Ранобэ', active: true},
  ])
  const [buttonsSection, setButtonsSection] = useState(() => {
    let obj = {};
    buttonsMain.forEach(el => {
      obj[el.name] = [
        {name: 'done', text: 'Завершенные', active: true},
        {name: 'queue', text: 'В очереди', active: true},
      ]
    })
    return obj;
  })
  const selectedUserMine = currentUserId === selectedUserId;
  const [fetching, setFetching] = useState(true);
  useEffect(() => {
    setFetching(true);
    const fetchData = async () => {
      await getUser(selectedUserId);
      await getUserListItems(selectedUserId);
      setFetching(false);
    }
    fetchData()
  }, [selectedUserId, getUser, getUserListItems])
  const openDescription = (listName, info) => {
    getDescription(listName, info);
  }
  const openList = (userFilter) => {
    setUserFilter(userFilter);
    selectUser(selectedUserId);
  }
  const buttonsMainHandler = (target) => {
    setButtonsMain(buttonsMain.map(el => {
      if (el.name === target) el.active = !el.active
      return el
    }))
  }
  const buttonsHandler = (section, target) => {
    const newButtons = {};
    Object.keys(buttonsSection).forEach(el => {
      const newSection = buttonsSection[el];
      newSection.map(item => {
        if (el === section && item.name === target) {
          item.active = !item.active
        }
        return item
      })
      newButtons[el] = newSection;
    })
    setButtonsSection(newButtons)
  }
  return (
    <UserDom  {...{userInfo, selectedUserMine, openDescription, openList, fetching, buttonsSection, 
      buttonsMain, buttonsMainHandler, buttonsHandler, userListItemsFive, userListItemsRest}}/>
  )
}

const mapStatesToProps = (state) => {
  return {
    currentUserId: state.users.currentUserId,
    userInfo: state.users.userInfo,
    userListItems: state.userListItems.userListItems,
    userListItemsFive: state.userListItems.userListItemsFive,
    userListItemsRest: state.userListItems.userListItemsRest
  }
}
export default compose(
  connect(mapStatesToProps, { getUser, getDescription, selectUser, setUserFilter, getUserListItems }),
  withRouter
)(User);