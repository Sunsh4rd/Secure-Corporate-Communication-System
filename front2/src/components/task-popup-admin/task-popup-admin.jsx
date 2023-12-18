import React, { useState } from "react";
import styles from './task-popup-admin.module.css'

function TaskPopupAdmin() {
  // из сервера,а не null
  const [status, setStatus] = useState('planned');
  
  return (
  <section className={styles.main_container}>
    <h2 className={styles.title}>Удалить планету</h2>
    <div className={styles.status_container}>
      <p className={styles.status_label}>Статус:</p>
      <ul className={styles.status__container_ul} >
        <li 
          className={status === 'planned' ? `${styles.status} ${styles.status_planned} ${styles.status__active}` : `${styles.status} ${styles.status_planned}`}
          onClick={() => {setStatus('planned')}}
        >
          Запланировано
        </li>
        <li 
          className={status === 'process' ? `${styles.status} ${styles.status_process} ${styles.status__active}` : `${styles.status} ${styles.status_process}`}
          onClick={() => {setStatus('process')}}
        >
          В процессе
        </li>
        <li 
          className={status === 'done' ?  `${styles.status} ${styles.status_done} ${styles.status__active}` : `${styles.status} ${styles.status_done}`}
          onClick={() => {setStatus('done')}}
        >
          Готовые
        </li>
      </ul>
    </div>
    <div className={styles.assignee_container}>
      <h3 className={styles.assignee_title}>Ответсвенные:</h3>
      <ul className={styles.task__assignee_container}>
        <li className={styles.task__assignee_item}>
          Иванов И.И.
        </li>
        <li className={styles.task__assignee_item}>
          Сковородка В.В.
        </li>
        <li className={styles.task__assignee_item}>
          Иванов И.И.
        </li>
        <li className={styles.task__assignee_item}>
          Иванов И.И.
        </li>
      </ul>
    </div>
    <div className={styles.description_container}>
      <h3 className={styles.description_label}>
        Описание:
      </h3>
      <p className={styles.description}>
        Нужно удалить все таблицы
      </p>
    </div>
    <div className={styles.message}>
      <h3 className={styles.message__title}>Обсуждение</h3>
      <ul className={styles.message__container}>
        <li className={styles.message__item}>
          <div className={styles.message_autor_date_wrapper}>
            <h4 className={styles.message__author}>Ваня</h4>
            <p className={styles.message__date}>21.02.2023</p>
          </div>
          <p className={styles.message_text}>Пожалуйста, укажите все ответсвенных за эту задачу</p>
        </li>
        <li className={styles.message__item}>
          <div className={styles.message_autor_date_wrapper}>
            <h4 className={styles.message__author}>Ваня</h4>
            <p className={styles.message__date}>21.02.2023</p>
          </div>
          <p className={styles.message_text}>Пожалуйста, укажите все ответсвенных за эту задачу</p>
        </li>
        <li className={styles.message__item}>
          <div className={styles.message_autor_date_wrapper}>
            <h4 className={styles.message__author}>Ваня</h4>
            <p className={styles.message__date}>21.02.2023</p>
          </div>
          <p className={styles.message_text}>Пожалуйста, укажите все ответсвенных за эту задачу Пожалуйста, укажите все ответсвенных за эту задачуПожалуйста, укажите все ответсвенных за эту задачуПожалуйста, укажите все ответсвенных за эту задачуПожалуйста, укажите все ответсвенных за эту задачу</p>
        </li>
        <li className={styles.message__item}>
          <div className={styles.message_autor_date_wrapper}>
            <h4 className={styles.message__author}>Ваня</h4>
            <p className={styles.message__date}>21.02.2023</p>
          </div>
          <p className={styles.message_text}>Пожалуйста, укажите все ответсвенных за эту задачу Пожалуйста, укажите все ответсвенных за эту задачуПожалуйста, укажите все ответсвенных за эту задачуПожалуйста, укажите все ответсвенных за эту задачуПожалуйста, укажите все ответсвенных за эту задачу</p>
        </li>
        <li className={styles.message__item}>
          <div className={styles.message_autor_date_wrapper}>
            <h4 className={styles.message__author}>Ваня</h4>
            <p className={styles.message__date}>21.02.2023</p>
          </div>
          <p className={styles.message_text}>Пожалуйста, укажите все ответсвенных за эту задачу Пожалуйста, укажите все ответсвенных за эту задачуПожалуйста, укажите все ответсвенных за эту задачуПожалуйста, укажите все ответсвенных за эту задачуПожалуйста, укажите все ответсвенных за эту задачу</p>
        </li>
      </ul>
    </div>
    <form method="POST" className={styles.form}>
      <textarea
        name="message"
        id="message"
        className={`${styles.textarea}`}
        placeholder="Ваш текст"
        rows={4}
      />
      <button className={styles.button_submit}>
        Отправить
      </button>
    </form>
  </section>
  );
}

export default TaskPopupAdmin;
