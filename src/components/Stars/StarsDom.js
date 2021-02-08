import React from 'react';
import styles from './Stars.module.scss';
import classnames from 'classnames';
import cross from './../../assets/Images/plus.svg';

export const StarsDom = ({ userInfoAnimation, showStars, currentUserId, stars,
  hoverStarsHandler, starsClickHandler, starsVisible }) => {
  return (
    <>
      {userInfoAnimation && currentUserId && (
        <div className={classnames(styles.wrapper, { [styles.added]: userInfoAnimation['selected'] })}
          onClick={() => showStars()}>
          <div className={styles.button}>
            <div className={classnames(styles.buttonInner, styles.buttonOpenStars, { [styles.visible]: starsVisible })}>
              {stars.some(el => el.active) ? <span>{stars.filter(el => el.active === true).length}</span> : <img src={cross} />}
            </div>
            <div className={classnames(styles.buttonInner, { [styles.visible]: !starsVisible })}>
              {userInfoAnimation['selected'] ? <span>&#9733;</span> : <span>&#9734;</span>}
            </div>

          </div>
          <div className={classnames(styles.starsWrap, { [styles.visible]: starsVisible })}>
            {
              stars.map((el, i) => {
                return (
                  <div className={classnames(styles.star, { [styles.selected]: el.active })} key={i}
                    onMouseOver={() => hoverStarsHandler(el.number)} onMouseLeave={() => hoverStarsHandler(-1)}
                    onClick={() => starsClickHandler('selected', el.number)}>
                    {userInfoAnimation['selected'] ? <span>&#9733;</span> : <span>&#9734;</span>}
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