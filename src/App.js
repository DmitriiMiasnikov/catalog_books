import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import styles from './App.module.scss';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { compose } from 'redux';
import UserMenu from './components/UserMenu/UserMenu';
import Users from './components/Users/Users';
import User from './components/User/User';
import Books from './components/Books/BooksContainer';
import Authors from './components/Authors/AuthorsContainer';
import Filters from './components/Filters/Filters';
import Description from './components/Description/Description';
import Registration from './components/Registration/Registration';
import UsersMenu from './components/UsersMenu/UsersMenu';
import RandomItemsMenu from './components/RandomItemsMenu/RandomItemsMenu';
import List from './components/List/List';
import { setIsMobile } from './store/mainReducer'

function App({ theme, showRegistration, setIsMobile, isMobile }) {
  const widthHandler = () => {
    setIsMobile(window.innerWidth)
  }
  const subscribeResize = () => window.addEventListener('resize', widthHandler);
  const unsubscribeResize = () => window.removeEventListener('resize', widthHandler);
  useEffect(() => {
    subscribeResize()
    setIsMobile(window.innerWidth);
    return () => unsubscribeResize()
  }, [setIsMobile, subscribeResize, unsubscribeResize])
  return (
    <div className={classnames(styles.page, { [styles.black]: theme === 'black', [styles.white]: theme === 'white' })}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <Header />
        </div>
        <div className={styles.menu}>
          <UserMenu />
          <Route path='/list' render={() => <Filters />} />
          {!isMobile && <UsersMenu />}
          {!isMobile && <RandomItemsMenu />}
        </div>
        <div className={styles.content}>
          <Switch>
            <Redirect exact from='/' to='/main' />
            <Route exact path='/main' render={() => <Main />} />
            <Route exact path='/books' render={() => <Books />} />
            <Route exact path='/authors' render={() => <Authors />} />
            <Route exact path='/list/animation/:page?' render={() => <List listName={'animation'}/>} />
            <Route exact path='/list/manga/:page?' render={() => <List listName={'manga'}/>} />
            <Route exact path='/list/ranobe/:page?' render={() => <List listName={'ranobe'}/>} />
            <Route exact path={`/description/animation/:id?`} render={() => <Description listName={'animation'}/>} />
            <Route exact path={`/description/manga/:id?`} render={() => <Description listName={'manga'}/>} />
            <Route exact path={`/description/ranobe/:id?`} render={() => <Description listName={'ranobe'}/>} />
            <Route exact path={`/users/:userId`} render={() => <User />} />
            <Route exact path={`/users`} render={() => <Users />} />
          </Switch>
        </div>
        {showRegistration && <Registration />}
      </div>
    </div>
  );
}

const mapStatesToProps = (state) => {
  return {
    theme: state.main.theme,
    showRegistration: state.users.showRegistration,
    isMobile: state.main.isMobile
  }
}
export default compose(
  connect(mapStatesToProps, { setIsMobile })
)(App);

