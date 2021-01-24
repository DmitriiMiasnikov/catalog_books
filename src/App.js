import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import styles from './App.module.scss';
import Header  from './components/Header/HeaderContainer';
import { Main } from './components/Main/Main';
import classnames from 'classnames';
import { connect } from 'react-redux'
import UserMenu from './components/UserMenu/UserMenuContainer';
import User from './components/User/UserContainer';

function App({ theme, selectedUser }) {
  return (
    <div className={classnames(styles.page, {[styles.black]: theme === 'black', [styles.white]: theme === 'white'})}>
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.menu}>
        <UserMenu />
      </div>
      <div className={styles.content}>
        <Redirect from='/' to='/main' />
        <Route exact path='/main' render={() => <Main />} />
        <Route exact path={`/users/${selectedUser}`} render={() => <User />} />
      </div>
    </div>
    </div>
  );
}

const mapStatesToProps = (state) => {
  return {
    theme: state.main.theme,
    selectedUser: state.user.selectedUser,
  }
}
export default connect(mapStatesToProps, {})(App);

