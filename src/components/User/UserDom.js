import React from 'react';
import styles from './User.module.scss';
import { NavLink } from 'react-router-dom';
import loading from './../../assets/Images/loading.svg';
import classnames from 'classnames';
import angle from './../../assets/Images/angle.svg';
import ListItem from './../ListItem/ListItem';

export const UserDom = ({ userInfo, selectedUserMine, fetching, buttonsSection,
  buttonsMain, buttonsMainHandler, buttonsHandler, userListItemsFive, userListItemsRest, openList, countUserList }) => {
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
                            {countUserList && Boolean(countUserList[section.name][listName]) && <span className={styles.count}>
                              ({countUserList[section.name][listName]})</span>}
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
                                      return (
                                        <div className={styles.item} key={i} >
                                          <ListItem view={'tile'} listName={section.name} item={el} />
                                        </div>
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