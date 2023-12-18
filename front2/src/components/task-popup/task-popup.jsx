import React from "react";
import styles from './task-popup.module.css'
function TaskPopup() {
  return (
  <section className={styles.main_container}>
    <h2 className={styles.title}>Удалить планету</h2>
    <div className={styles.status_container}>
      <p className={styles.status_label}>Статус:</p>
      <h3 className={styles.status}>Запланировано</h3>
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

export default TaskPopup;
