import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { DescriptionDom } from './DescriptionDom';
import { getDescription, getDescriptionFunc } from './../../store/descriptionReducer';
import { getUser } from './../../store/usersReducer';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

const Description = ({ getDescription, getDescriptionFunc, match, selectedDescription,
  currentUserId, getUser, listName }) => {
  const currentAnimationId = Number(match.params.id);
  const listNameUrl = !listName ? match.url.split('/')[2] : listName;
  const calatogName = listNameUrl === 'animation' ? 'animation' : 'manga';
  useEffect(() => {
    const fetchData = async () => {
      await getDescription(listNameUrl, currentAnimationId, currentUserId);
    }
    fetchData();
  }, [getDescription, match, currentAnimationId, currentUserId])
  useEffect(() => {
    if (currentUserId) {
      const fetchData = async () => {
        await getUser(currentUserId);
      }
      fetchData();
    }
  }, [currentUserId, getUser])
  useEffect(() => {
    return () => getDescriptionFunc(null)
  }, [getDescriptionFunc])
  return (
    <DescriptionDom selectedDescription={selectedDescription} calatogName={calatogName}/>
  )
}
const mapStatesToProps = (state) => {
  return {
    selectedDescription: state.description.selectedDescription,
    currentUserId: state.users.currentUserId,
    listName: state.list.listName
  }
}
export default compose(
  connect(mapStatesToProps, { getDescription, getDescriptionFunc, getUser }),
  withRouter
) (Description);