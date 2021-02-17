import React, { useRef, useEffect } from 'react';
import { Field, Form } from 'react-final-form';
import styles from './Registration.module.scss';
import classnames from 'classnames';
import close from './../../assets/Images/close.svg';

export const RegistrationDom = ({ registrationHandler, inputs, validate, closeRegistration }) => {
  const refRegistration = useRef(null);
  const handleMouseClickLoginMenu = (e) => {
    function composedPath(el) {
      const path = [];
      while (el) {
        path.push(el);
        if (el.tagName === 'HTML') {
          path.push(document);
          path.push(window);
          return path;
        }
        el = el.parentElement;
      }
    }
    const path = e.path || (e.composedPath && e.composedPath()) || composedPath(e.target);
    if (!path.includes(refRegistration.current)) {
      closeRegistration();
    }
  }
  useEffect(() => {
    document.addEventListener('click', handleMouseClickLoginMenu, true)
    return () => document.removeEventListener('click', handleMouseClickLoginMenu, true)
  })
  return (
    <div className={classnames(styles.wrapper, styles.show)}>
      <div className={styles.registrationBlock} ref={refRegistration}>
      <div onClick={() => closeRegistration()} className={styles.close}>
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
                <button onClick={() => closeRegistration()} className={styles.closeButton}>Отмена</button>
              </div>
            </form>
          )}
        />
      </div>
    </div>
  )
}