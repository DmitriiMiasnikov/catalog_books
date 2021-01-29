import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import styles from './App.module.scss';
import Header from './components/Header/HeaderContainer';
import { Main } from './components/Main/Main';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { compose } from 'redux';
import UserMenu from './components/UserMenu/UserMenuContainer';
import User from './components/User/UserContainer';
import Books from './components/Books/BooksContainer';
import Authors from './components/Authors/AuthorsContainer';
import Animation from './components/Animation/AnimationContainer'
import AnimationFilters from './components/AnimationFilters/AnimationFiltersContainer';
import AnimationDescription from './components/AnimationDescription/AnimationDescriptionContainer';

function App({ theme, selectedUser }) {
  return (
    <div className={classnames(styles.page, { [styles.black]: theme === 'black', [styles.white]: theme === 'white' })}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <Header />
        </div>
        <div className={styles.menu}>
          <UserMenu />
          <Route exact path='/animation/list' render={() => <AnimationFilters />} />
        </div>
        <div className={styles.content}>
          <Redirect from='/' to='/main' />
          <Route exact path='/main' render={() => <Main />} />
          <Route exact path='/books' render={() => <Books />} />
          <Route exact path='/authors' render={() => <Authors />} />
          <Route exact path='/animation/list/:page?' render={() => <Animation />} />
          <Route exact path={`/animation/id/:animationId?`} render={() => <AnimationDescription />} />
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
    selectedAnimation: state.animation.selectedAnimation,
  }
}
export default compose(
  connect(mapStatesToProps, {})
)(App);

