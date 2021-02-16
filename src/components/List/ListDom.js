import React from 'react';
import styles from './List.module.scss';
import classnames from 'classnames';
import PagesCounter from '../PagesCounter/PagesCounter';
import ListSorters from './../ListSorters/ListSorters';
import PageView from './../PageView/PageView';
import loading from './../../assets/Images/loading.svg';
import ListItem from '../ListItem/ListItem';

export const ListDom = ({ list, countAll,
  fetching, pageView, listName }) => {
  return (
    <div className={styles.wrapper}>
      <PageView />
      <div className={styles.listSorters}>
        <ListSorters listName={listName} />
      </div>
      <div className={styles.pagesCounter}>
        <PagesCounter countAll={countAll} listName={listName} />
      </div>
      {!fetching && list && !list.length ? (
        <div className={styles.warning}>
          не найдено по текущему запросу
        </div>
      ) : fetching ? (
        <div className={styles.loading}>
          <img src={loading} alt='' />
        </div>
      ) : (
            <div className={classnames(styles.currentList, styles[pageView])}>
              {
                list && list.map((el, i) => {
                  return (
                    <div className={styles.item} key={i} >
                      <ListItem view={pageView} listName={listName} item={el} descriptionOnHover={false}/>
                    </div>
                  )
                })
              }
              <div className={styles.PagesCounterBottom}>
                <PagesCounter countAll={countAll} listName={listName} />
              </div>
            </div>
          )}
    </div>
  )
}