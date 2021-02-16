import React, { useState, useEffect } from 'react';
import { StarsDom } from './StarsDom';
import { setUserFavorites } from '../../store/usersReducer';
import { connect } from 'react-redux';

const Stars = ({ currentUserId, setUserFavorites, list, myUserInfo, currentId, direction = 'left' }) => {
  const [userFavoritesState, setUserFavoritesState] = useState(null);
  const [starsVisible, setStarsVisible] = useState(false);
  let starsArr = [];
  for(let i = 1; i <= 10; i++) {
    starsArr.push({number: i, active: false})
  }
  const [stars, setStars] = useState(starsArr);
  useEffect(() => {
    if (myUserInfo) {
      setUserFavoritesState(myUserInfo[`${list}Rating`] ? myUserInfo[`${list}Rating`][currentId] : null)
    }
  }, [currentId, currentUserId, setUserFavoritesState, myUserInfo, list])

  const buttonHandler = (rating) => {
    if (rating) {
      setUserFavorites(currentUserId, list, currentId, 0);
    } else if (rating === false) {
      setStarsVisible(false)
    } else setStarsVisible(starsVisible => !starsVisible);
  }
  const hoverStarsHandler = (number) => {
    setStars(stars.map(el => {
      if (el.number <= number) {
        el.active = true;
      } else el.active = false
      return el
    }))
  }
  const starsClickHandler = (rating) => {
    setUserFavorites(currentUserId, list, currentId, rating);
  }
  return (
    <StarsDom {...{ currentUserId, userFavoritesState, buttonHandler, stars, hoverStarsHandler, starsClickHandler,
      starsVisible, direction }}/>
  )
}

const mapStatesToProps = (state) => {
  return {
    currentUserId: state.users.currentUserId,
    myUserInfo: state.users.myUserInfo
  }
}

export default connect(mapStatesToProps, { setUserFavorites })(Stars)