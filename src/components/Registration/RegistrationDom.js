import React from 'react';
import { Field, Form } from 'react-final-form';
import styles from './Registration.module.scss';
import classnames from 'classnames';
import close from './../../assets/Images/close.svg';

export const RegistrationDom = ({ registrationHandler, inputs, validate, showRegistrationHandler }) => {
  return (
    <div className={classnames(styles.wrapper, styles.show)}>
      <div className={styles.registrationBlock}>
      <div onClick={() => showRegistrationHandler()} className={styles.close}>
        <img src={close} alt=''/>
      </div>
        <div className={styles.title}>
        Регистрация
        </div>
        <Form
          onSubmit={registrationHandler} validate={validate}
          render={({ handleSubmit, form, submitting }) => (
            <form onSubmit={handleSubmit}>
              {
                inputs.map((el, i) => {
                  return (
                    <div className={styles.line} key={i}>
                      <Field name={el.name}>
                        {({ input, meta }) => (
                          <div>
                            <label>*</label>
                            <input {...input} type={'text'} placeholder={el.text} />
                            {meta.error && meta.touched && <div className={styles.error}>{meta.error}</div>}
                          </div>
                        )}
                      </Field>
                    </div>
                  )
                })
              }
              <div className={classnames(styles.line, styles.buttons)}>
                <button type='submit' disabled={submitting} className={styles.submit}>зарегистрировать</button>
                <button onClick={() => showRegistrationHandler()} className={styles.closeButton}>Отмена</button>
              </div>
            </form>
          )}
        />
      </div>
    </div>
  )
}