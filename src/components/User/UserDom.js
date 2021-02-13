import React from 'react';
import styles from './User.module.scss';
import { NavLink } from 'react-router-dom';
import loading from './../../assets/Images/loading.svg';
import classnames from 'classnames';
import angle from './../../assets/Images/angle.svg';

export const UserDom = ({ userInfo, selectedUserMine, openDescription, fetching, buttonsSection,
  buttonsMain, buttonsMainHandler, buttonsHandler, userListItemsFive, userListItemsRest, openList }) => {
  return (
    <div>
      {userInfo &&
        <div className={styles.wrapper}>
          <div className={styles.name}>{userInfo.userName} {selectedUserMine && <span>(Мой профиль)</span>}</div>
          {
            buttonsMain.map((section, index) => {
              return <div key={index}>
                <div className={styles.sectionTitle} onClick={() => buttonsMainHandler(section.name)}>
                  <span>{section.text}</span>
                  <img src={angle} className={classnames(styles.angle, {
                    [styles.reverse]: section.active
                  })} alt='' />
                </div>
                <div className={classnames(styles.block, {
                  [styles.hide]: !section.active
                })}>
                  {
                    userInfo && Object.keys(userInfo[section.name]).map((listName, j) => {
                      return (
                        <div key={j} className={styles.blockInner}>
                          <div className={styles.subTitle} onClick={() => buttonsHandler(section.name, listName)}>
                            <span>{buttonsSection[section.name].find(el => el.name === listName).text}</span>
                            <img src={angle} className={classnames(styles.angle, {
                              [styles.reverse]: !buttonsSection[section.name].find(el => el.name === listName).active
                            })} alt='' />
                          </div>
                          <div className={classnames(styles.sectionWrap, {
                            [styles.hide]: !buttonsSection[section.name].find(el => el.name === listName).active,
                            [styles.empty]: !userInfo[section.name][listName].length
                          })}>
                            {
                              fetching && !userListItemsFive && (
                                <div className={styles.loading}>
                                  <img src={loading} alt='' />
                                </div>
                              )
                            }
                            {
                              !fetching && userListItemsFive && Boolean(userListItemsFive[section.name][listName].length) && (
                                <div className={styles.listWrap}>
                                  {
                                    userListItemsFive[section.name][listName].map((el, i) => {
                                      const catalogName = section.name === 'animation' ? 'animation' : 'manga';
                                      const id = `${catalogName}Id`;
                                      return (
                                        <NavLink to={`/description/${section.name}/${el[id]}`}
                                          onClick={() => openDescription(section.name, el[id])}
                                          className={styles.item} key={i} >
                                          <img src={`https://anime.amyasnikov.pro/${catalogName}_small/${catalogName}_cover_${el[id]}_small.jpg`}
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
                                  {Boolean(userListItemsRest[section.name][listName]) && <NavLink to={`/list/${section.name}`}
                                    onClick={() => openList(listName)}
                                    className={styles.restItems}>
                                    еще {userListItemsRest[section.name][listName]} <span>показать все</span>
                                  </NavLink>}
                                </div>
                              )
                            }
                            {
                              userInfo && !Boolean(userInfo[section.name][listName].length) && (
                                <div className={styles.noItems}>
                                  список пуст
                                </div>
                              )
                            }
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            })
          }
        </div>}
    </div >
  )
}