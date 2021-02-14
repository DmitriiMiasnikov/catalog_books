import React from 'react';
import styles from './LoginBlock.module.scss';
import { Field, Form } from 'react-final-form';
import classnames from 'classnames';

export const LoginBlockDom = ({ authorizationHandler, validate, inputs, 
  isWrongAuthorization, showRegistrationHandler}) => {
  return (
    <div className={styles.wrapper}>
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
  )
}