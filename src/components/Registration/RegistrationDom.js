import React from 'react';
import styles from './Registration.module.scss';

export const RegistrationDom = ({ registrationHandler }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.registrationBlock}>
        <form>
          <input placeholder={'имя'} />
          <input placeholder={'пароль'} />
          <input placeholder={'email'} />
          <div className={styles.buttons}>
              <div className={styles.button} onClick={(e) => registrationHandler(e)}>
                зарегестрировать
                </div>
          </div>
        </form>
      </div>
    </div>
  )
}