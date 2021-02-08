import React, { useState, useEffect } from 'react';
import { StarsDom } from './StarsDom';
import { setUsersAnimation } from '../../store/usersReducer';
import { connect } from 'react-redux';

const Stars = ({ currentUserId, setUsersAnimation, list, myUserInfo, currentId }) => {
  const [userInfoAnimation, setUsersInfoAnimation] = useState(null);
  const [starsVisible, setStarsVisible] = useState(false);
  let starsArr = [];
  for(let i = 1; i < 11; i++) {
    starsArr.push({number: i, active: false})
  }
  const [stars, setStars] = useState(starsArr);
  useEffect(() => {
    if (myUserInfo) {
      setUsersInfoAnimation({
        'queue': myUserInfo[list].queue.includes(currentId),
        'done': myUserInfo[list].done.includes(currentId),
        'selected': myUserInfo[list].selected.includes(currentId),
      })
    }
  }, [currentId, currentUserId, setUsersInfoAnimation, myUserInfo, list])

  const showStars = () => {
    setStarsVisible(starsVisible => !starsVisible);
  }
  const hoverStarsHandler = (number) => {
    setStars(stars.map(el => {
      if (el.number <= number) {
        el.active = true;
      } else el.active = false
      return el
    }))
  }
  const starsClickHandler = (typeButton, number) => {
    console.log(currentUserId, list, currentId, typeButton, number)
    // setUsersStars(currentUserId, list, currentId, number);
    // setUsersAnimation(currentUserId, currentId, typeButton);
  }
  return (
    <StarsDom {...{ currentUserId, userInfoAnimation, showStars, stars, hoverStarsHandler, starsClickHandler,
      starsVisible }}/>
  )
}

const mapStatesToProps = (state) => {
  return {
    currentUserId: state.users.currentUserId,
    myUserInfo: state.users.myUserInfo
  }
}

export default connect(mapStatesToProps, { setUsersAnimation })(Stars)