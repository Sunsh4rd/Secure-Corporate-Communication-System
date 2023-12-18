import React from "react";
import styles from "./main-page.module.css";
import { Link, useLocation } from "react-router-dom";

function MainPage() {

  const location = useLocation();

  return (
    <section className={styles.main_container}>
      <h1 className={styles.title}>Менеджер задач</h1>
      <ul className={styles.columns_container}>
        <li className={styles.column}>
          <h2 className={styles.column__title}>Запланировано</h2>
          <ul className={styles.tasks_container}>
            <li className={styles.task__item}>
              <Link className={styles.link} to={'/popup'} state={{ background: location }}>
                <h3 className={styles.task__title}>Добавить в таблицу стобец date</h3>
                <p className={styles.task__description}>
                  Добавить в таблицу стобец date чтобы всегда знать актуальную дату. Очень не хватает этих данных пожалуйстиа скорее
                </p>
              </Link>
            </li>
            <li className={styles.task__item}>
              <Link className={styles.link} to={'/popup'} state={{ background: location }}>
                <h3 className={styles.task__title}>Delete prod DB</h3>
                <p className={styles.task__description}>
                  I'm absolutely sure, we need to delete all db
                </p>
              </Link>
            </li>
          </ul>
        </li>
        <li className={styles.column}>
          <h2 className={styles.column__title}>В процессе</h2>
          <ul className={styles.tasks_container}>
            <li className={styles.task__item}>
              <Link className={styles.link} to={'/popup'} state={{ background: location }}>
                <h3 className={styles.task__title}>Delete prod DB</h3>
                <p className={styles.task__description}>
                  I'm absolutely sure, we need to delete all db
                </p>
              </Link>
            </li>
          </ul>
        </li>
        <li className={styles.column}>
          <h2 className={styles.column__title}>Готовые</h2>
          <ul className={styles.tasks_container}>
            <li className={styles.task__item}>
              <Link className={styles.link} to={'/popup'} state={{ background: location }}>
                <h3 className={styles.task__title}>Delete prod DB</h3>
                <p className={styles.task__description}>
                  I'm absolutely sure, we need to delete all db
                </p>
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </section>
  );
}

export default MainPage;
