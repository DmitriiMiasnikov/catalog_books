import React from 'react';
import { connect } from 'react-redux';
import { ListItemDom } from './ListItemDom';
import { getDescription } from './../../store/descriptionReducer';

const ListItem = ({ view, listName, getDescription, item, myUserInfo }) => {
  const id = `${listName}Id`;

  const openInfo = (id) => {
    getDescription(listName, id);
  }

  return (
    <ListItemDom {...{ view, listName, id, openInfo, item, myUserInfo }} />
  )
}

const mapStatesToProps = (state) => {
  return {
    myUserInfo: state.users.myUserInfo
  }
}
export default connect(mapStatesToProps, { getDescription })(ListItem)