import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { DescriptionDom } from './DescriptionDom';
import { getDescription, getDescriptionFunc } from './../../store/descriptionReducer';
import { getUser } from './../../store/usersReducer';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

const Description = ({ getDescription, getDescriptionFunc, match, selectedDescription,
  currentUserId, getUser }) => {
  const currentAnimationId = Number(match.params.id);
  const listNameUrl = match.url.split('/')[2];
  const catalogName = listNameUrl === 'animation' ? 'animation' : 'manga';
  useEffect(() => {
    const fetchData = async () => {
      await getDescription(listNameUrl, currentAnimationId, currentUserId);
    }
    fetchData();
  }, [getDescription, match, currentAnimationId, currentUserId, listNameUrl])
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
    <DescriptionDom selectedDescription={selectedDescription} catalogName={catalogName}/>
  )
}
const mapStatesToProps = (state) => {
  return {
    selectedDescription: state.description.selectedDescription,
    currentUserId: state.users.currentUserId,
  }
}
export default compose(
  connect(mapStatesToProps, { getDescription, getDescriptionFunc, getUser }),
  withRouter
) (Description);