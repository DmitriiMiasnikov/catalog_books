import React from 'react';
import styles from './Animation.module.scss';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';

export const Animation = ({ animationList, openAnimationInfo, buttonsSort, sortHandler, openPage,
  countAllAnimation, countInPage, currentPage, pagesButtons }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.sort}>
        <div className={classnames(styles.button, styles.sortBy)}>
          Сортировать по:
        </div>
        {
          buttonsSort.map((el, i) => {
            return (
              <div className={classnames(styles.button, { [styles.active]: el.active })}
                onClick={() => sortHandler(el.id, el.sort)} key={i}>
                {el.text}
              </div>
            )
          })
        }
      </div>
      <div className={styles.pages}>
        {
          pagesButtons.map((el, i) => {
            return (
              <div key={i} onClick={() => openPage(el.page)}
                className={classnames(styles.pageButton, { [styles.active]: el.active })}>
                {el.page}
              </div>
            )
          })
        }
        <div className={styles.pagesCounter}>
          {countInPage * currentPage - 9}-{countAllAnimation < (countInPage * currentPage) ?
            countAllAnimation : (countInPage * currentPage)} из {countAllAnimation} ({Math.ceil(countAllAnimation
              / countInPage )} стр.)
        </div>
      </div>
      {
        animationList && animationList.map((el, i) => {
          return (
            <div key={i} className={styles.item}>
              <NavLink to={`/animation/id/${el.animeId}`} onClick={() => openAnimationInfo(el.animeId)} className={styles.imgLink}>
                <img src={`/img/anime_cover_${el.animeId}.jpg`} alt='img' className={styles.image} />
              </NavLink>
              <div className={styles.infoWrapper}>
                {el.nameRu && <div className={styles.title}>
                  <NavLink to={`/animation/id/${el.animeId}`} onClick={() => openAnimationInfo(el.animeId)}>{el.nameRu}</NavLink></div>}
                {el.nameEng && !el.nameRu && <div className={classnames(styles.nameEng, { [styles.title]: !el.nameRu })}>
                  <NavLink to={`/animation/id/${el.animeId}`} onClick={() => openAnimationInfo(el.animeId)}>{el.nameEng}</NavLink>
                </div>}
                {el.date && <div className={styles.date}>
                  {el.date.map((dateEl, j) => {
                    return (
                      <span key={j}>
                        {j === 3 && <span> - </span>}
                        <span className={styles.n}>{dateEl}</span>
                        {j !== el.date.length - 1 && j !== 2 && <span>.</span>}
                      </span>
                    )
                  })}
                </div>}
                {el.author && <div className={styles.line}>автор: <span className={styles.lineInfo}>{el.author}</span></div>}
                {el.genre && <div className={styles.line}>жанр:
                <span className={styles.lineInfo}>
                    {el.genre.map((genreEl, j) => {
                      return (
                        <span className={styles.info} key={j}>
                          <span className={styles.n}>{genreEl}</span>
                          {j !== el.genre.length - 1 && <span>, </span>}
                        </span>
                      )
                    })}
                  </span>
                </div>}
                {el.type && <div className={styles.line}>тип: <span className={styles.lineInfo}>{el.type}</span></div>}
                {el.auditory && <div className={styles.line}>аудитория: <span className={styles.lineInfo}>{el.auditory}</span></div>}
              </div>
            </div>
          )
        })
      }
    </div>
  )
}