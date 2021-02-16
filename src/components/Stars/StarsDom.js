import React, { useRef, useEffect } from 'react';
import styles from './Stars.module.scss';
import classnames from 'classnames';
import cross from './../../assets/Images/plus.svg';

export const StarsDom = ({ userFavoritesState, buttonHandler, currentUserId, stars,
  hoverStarsHandler, starsClickHandler, starsVisible, direction }) => {
    const refStar = useRef(null);
    const handleMouseClick = (e) => {
      if (!e.path.includes(refStar.current)) {
        buttonHandler(false);
      }
    }
    useEffect(() => {
      document.addEventListener('click', handleMouseClick, true)
      return () => document.removeEventListener('click', handleMouseClick, true)
    })
  return (
    <>
      {currentUserId && (
        <div className={classnames(styles.wrapper, styles[direction])} ref={refStar}
          onClick={() => buttonHandler(userFavoritesState)}>
          <div className={styles.button}>
            <div className={classnames(styles.buttonInner, styles.buttonOpenStars, { [styles.visible]: starsVisible,
            [styles.green]: userFavoritesState >= 8 })}>
              {stars.some(el => el.active) ? <div className={styles.currentRating}>
                {stars.filter(el => el.active === true).length}
              </div> : <img src={cross} alt=''/>}
            </div>
            <div className={classnames(styles.buttonInner, { [styles.visible]: !starsVisible, [styles.done]: userFavoritesState,
            [styles.green]: userFavoritesState >= 8, [styles.yellow]: userFavoritesState >= 5 && userFavoritesState < 8,
            [styles.red]: userFavoritesState < 5 })}>
              {userFavoritesState ? <div className={styles.currentRating}>
                {userFavoritesState}
              </div> : <span className={styles.starInButton}>&#9733;</span>}
            </div>
          </div>
          <div className={classnames(styles.starsWrap, { [styles.visible]: starsVisible })}>
            {
              stars.map((el, i) => {
                return (
                  <div className={classnames(styles.star, { [styles.selected]: el.active })} key={i}
                    onMouseOver={() => hoverStarsHandler(el.number)} onMouseLeave={() => hoverStarsHandler(-1)}
                    onClick={() => starsClickHandler(el.number)}>
                    { i < stars.filter(el => el.active === true).length ? <span>&#9733;</span> : <span>&#9734;</span>}
                  </div>
                )
              })
            }
          </div>
        </div>
      )}
    </>
  )
}