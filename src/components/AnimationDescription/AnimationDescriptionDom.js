import React from 'react';
import styles from './AnimationDescription.module.scss';
import classnames from 'classnames';

export const AnimationDescriptionDom = ({ selectedAnimation, buttonsControl, userInfoAnimation, userInfoAnimationHandler }) => {
  return (
    <div className={styles.wrapper}>
      {selectedAnimation && <div className={styles.infoWrap}>
        <div className={styles.info}>
          {selectedAnimation.nameRu && <div className={styles.title}>
            {selectedAnimation.nameRu}</div>}
          {selectedAnimation.nameEng && <div className={classnames(styles.nameEng, {
            [styles.title]: !selectedAnimation.nameRu,
            [styles.line]: selectedAnimation.nameRu
          })}>
            {selectedAnimation.nameRu && <span>на английском: </span>}
            <span className={styles.lineInfo}>
              {selectedAnimation.nameEng}
            </span>
          </div>}
          {selectedAnimation.date && <div className={styles.date}>
            {selectedAnimation.date.map((dateEl, j) => {
              return (
                <span key={j}>
                  {j === 3 && <span> - </span>}
                  <span className={styles.n}>{dateEl}</span>
                  {j !== selectedAnimation.date.length - 1 && j !== 2 && <span>.</span>}
                </span>
              )
            })}
          </div>}
          {selectedAnimation.author && <div className={styles.line}>автор: <span className={styles.lineInfo}>{selectedAnimation.author}</span></div>}
          {selectedAnimation.genre && <div className={styles.line}>жанр:
                <span className={styles.lineInfo}>
              {selectedAnimation.genre.map((genreEl, j) => {
                return (
                  <span className={styles.lineInfoGenre} key={j}>
                    <span className={styles.n}>{genreEl}</span>
                    {j !== selectedAnimation.genre.length - 1 && <span>, </span>}
                  </span>
                )
              })}
            </span>
          </div>}
          {selectedAnimation.type && <div className={styles.line}>тип: <span className={styles.lineInfo}>
            {selectedAnimation.type}
          </span></div>}
          {selectedAnimation.auditory && <div className={styles.line}>аудитория: <span className={styles.lineInfo}>
            {selectedAnimation.auditory}
          </span></div>}
        </div>
        <div className={styles.imageWrap}>
          <img src={`/img/animation_cover_${selectedAnimation.animeId}.jpg`} alt='img' className={styles.image} />
          {userInfoAnimation && <div className={styles.buttons}>
            <div className={classnames(styles.star, styles.button, { [styles.added]: userInfoAnimation['selected'] })}
              onClick={() => userInfoAnimationHandler('selected')}>
              {userInfoAnimation['selected'] ? <span>&#9733;</span> : <span>&#9734;</span>}
            </div>
            {
              buttonsControl.map((el, i) => {
                return (
                  <div key={i} className={classnames(styles.button, { [styles.added]: userInfoAnimation[el.type] })}
                    onClick={() => userInfoAnimationHandler(el.type)}>
                    {el.text}
                  </div>
                )
              })
            }
          </div>}
        </div>
        <div className={styles.descriptionWrap}>
          <div className={styles.title}>
            Описание:
          </div>
          <div className={styles.text}>
            {selectedAnimation.description}
          </div>
        </div>
      </div>}
    </div>
  )
}