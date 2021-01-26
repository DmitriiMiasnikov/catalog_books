import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import styles from './App.module.scss';
import Header from './components/Header/HeaderContainer';
import { Main } from './components/Main/Main';
import classnames from 'classnames';
import { connect } from 'react-redux'
import UserMenu from './components/UserMenu/UserMenuContainer';
import User from './components/User/UserContainer';
import Books from './components/Books/BooksContainer';
import Authors from './components/Authors/AuthorsContainer';
import Animation from './components/Animation/AnimationContainer'

function App({ theme, selectedUser }) {
  return (
    <div className={classnames(styles.page, { [styles.black]: theme === 'black', [styles.white]: theme === 'white' })}>
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
          <Route exact path='/books' render={() => <Books />} />
          <Route exact path='/authors' render={() => <Authors />} />
          <Route exact path='/animation' render={() => <Animation />} />
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

