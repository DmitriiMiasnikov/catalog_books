import React from 'react';
import { connect } from 'react-redux';
import { ListItemDom } from './ListItemDom';
import { getDescription } from './../../store/descriptionReducer';

const ListItem = ({ view, listName, getDescription, item, myUserInfo, descriptionOnHover = true }) => {
  const id = `${listName}Id`;
  const buttonsControl = [{
    id: 1,
    text: 'отложить',
    textDone: 'в очереди',
    type: 'queue'
  },
  {
    id: 2,
    text: 'завершил',
    textDone: 'завершил',
    type: 'done'
  }];
  const openInfo = (id) => {
    getDescription(listName, id);
  }

  return (
    <ListItemDom {...{ view, listName, id, openInfo, item, myUserInfo, descriptionOnHover, buttonsControl }} />
  )
}

const mapStatesToProps = (state) => {
  return {
    myUserInfo: state.users.myUserInfo
  }
}
export default connect(mapStatesToProps, { getDescription })(ListItem)