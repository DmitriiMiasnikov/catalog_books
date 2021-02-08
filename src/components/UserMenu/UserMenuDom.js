import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './UserMenu.module.scss';
import { Field, Form } from 'react-final-form';
import classnames from 'classnames';
import logout from './../../assets/Images/logout.svg';
import userinfo from './../../assets/Images/userinfo.svg';

export const UserMenuDom = ({ myUserInfo, openUserInfo, isAuth, authorizationHandler, inputs, validate,
  isWrongAuthorization, leftUser, showRegistrationHandler }) => {
  return (
    <div className={styles.wrapper}>
      {
        !isAuth ? (
          <div className={styles.loginBlock}>
            <Form
              onSubmit={authorizationHandler} validate={validate}
              render={({ handleSubmit, form, submitting }) => (
                <form onSubmit={handleSubmit}>
                  {
                    inputs.map((el, i) => {
                      return (
                        <div className={classnames(styles.input)} key={i}>
                          <Field name={el.name}>
                            {({ input, meta }) => (
                              <div>
                                <input {...input} type={'text'} placeholder={el.text} />
                                {meta.error && meta.touched && <div className={styles.error}>{meta.error}</div>}
                              </div>
                            )}
                          </Field>
                        </div>
                      )
                    })
                  }
                  {
                    isWrongAuthorization && (
                      <div className={classnames(styles.wrongAuth)}>
                        неверное имя или пароль
                      </div>
                    )
                  }
                  <div className={classnames(styles.buttons)}>
                    <button type='submit' disabled={submitting} className={styles.button}>
                      <div className={styles.text}>
                        вход
                      </div>
                    </button>
                      <div className={styles.button} onClick={() => showRegistrationHandler()}>
                        <div className={styles.text}>
                          регистрация
                        </div>
                      </div>
                  </div>
                </form>
              )}
            />
          </div>
        ) : myUserInfo &&
          <div className={styles.wrapperInfoUser}>
            <div className={styles.nameBlock}>Имя:
                <NavLink to={`/users/${myUserInfo.userId}`}>
                <span className={styles.name} onClick={() => openUserInfo(myUserInfo.userId)}>
                  {myUserInfo.userName}
                </span>
              </NavLink>
            </div>
            {/* <div className={styles.title}>Книги</div>
            <div className={styles.line}>прочитано: {myUserInfo.books.done.length} </div>
            <div className={styles.line}>к прочтению: {myUserInfo.books.queue.length} </div> */}
            <div className={styles.title}>Аниме</div>
            <div className={styles.line}><span>просмотрено:</span> <span>{myUserInfo.animation.done.length}</span></div>
            <div className={styles.line}><span>в очереди:</span> <span>{myUserInfo.animation.queue.length}</span> </div>
            <div className={styles.buttons}>
              <NavLink to={`/users/${myUserInfo.userId}`}>
                <div className={styles.button} onClick={() => openUserInfo(myUserInfo.userId)}>
                  <img src={userinfo} alt='' />
                  <div className={styles.text}>
                    пользователь
                </div>
                </div>
              </NavLink>
              <div className={styles.button} onClick={() => leftUser()}>
                <img src={logout} alt='' />
                <div className={styles.text}>
                  выход
                </div>
              </div>
            </div>
          </div>
      }

    </div>
  )
}