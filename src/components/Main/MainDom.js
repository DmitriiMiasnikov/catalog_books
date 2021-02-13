import React from 'react';
import styles from './Main.module.scss';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import angleLeft from './../../assets/Images/angle-circle-arrow-left.svg';
import angleRight from './../../assets/Images/angle-circle-arrow-right.svg';

export const MainDom = ({ fetching, openInfo, lastViewed, buttonScrollHandler, scrollViewed, listNames }) => {
  return (
    <div className={styles.wrapper}>
      {
        !fetching && lastViewed && (
          <div>
            {
              listNames.map((listName, index) => {
                return (
                  <div key={index} className={styles.lastViewed}>
                    <div className={styles.title}>
                      Последние просмотренные {listName.text}
                    </div>
                    <div className={styles.lastViewedWrap}>
                      <div className={classnames(styles.buttonLeft)} >
                        <img src={angleLeft} alt='' onClick={() => buttonScrollHandler(listName.name, 'left')}
                          className={classnames({ [styles.disabled]: scrollViewed[listName.name].left <= 0 })} />
                      </div>
                      <div className={styles.scrollBlock}>
                        <div className={styles.listWrap} style={{ left: 0, transform: `translateX(-${scrollViewed[listName.name].scroll}px)` }}>
                          {
                            lastViewed[listName.name].map((el, i) => {
                              console.log(lastViewed);
                              const id = `${listName.name}Id`;
                              return (
                                <NavLink to={`description/${listName.name}/${el[id]}`} onClick={() => openInfo(listName.name, el[id])}
                                  className={styles.item} key={i} >
                                  <img src={`https://anime.amyasnikov.pro/${listName.name}_small/${listName.name}_cover_${el[id]}_small.jpg`} 
                                    alt='img' className={styles.image} />
                                  <div className={styles.text}>
                                    <div className={styles.title}>
                                      {el.nameRu || el.nameEng}
                                    </div>
                                    {el.dateStart && <div className={styles.description}>
                                      {el.dateStart.split('-').reverse().join('.')} {el.dateEnd && '- '}
                                      {el.dateEnd && el.dateEnd.split('-').reverse().join('.')}
                                    </div>}
                                    {el.type && <div className={styles.description}>
                                      {el.type}
                                    </div>}
                                  </div>
                                </NavLink>
                              )
                            })
                          }
                        </div>
                      </div>
                      <div className={classnames(styles.buttonRight)} >
                        <img src={angleRight} alt='' onClick={() => buttonScrollHandler(listName.name, 'right')}
                          className={classnames({ [styles.disabled]: scrollViewed[listName.name].right <= 0 })} />
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        )
      }
    </div>
  )
}