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
    <DescriptionDom selectedDescription={selectedDescription} catalogName={catalogName} listNameUrl={listNameUrl}
      buttonsControl={buttonsControl}/>
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