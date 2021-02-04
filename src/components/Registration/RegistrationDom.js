import React from 'react';
import { Field, Form } from 'react-final-form';
import styles from './Registration.module.scss';
import classnames from 'classnames';

export const RegistrationDom = ({ registrationHandler, inputs, validate }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.registrationBlock}>
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
                            <input {...input} type={'text'} placeholder={el.text} />
                            {meta.error && meta.touched && <div className={styles.error}>{meta.error}</div>}
                          </div>
                        )}
                      </Field>
                    </div>
                  )
                })
              }
              <div className={classnames(styles.line, styles.button)}>
                <button type='submit' disabled={submitting}>зарегистрировать</button>
                <button onClick={form.reset}>Очистить</button>
              </div>
            </form>
          )}
        />
      </div>
    </div>
  )
}