import React, { useEffect } from "react";
import styles from "./main-page.module.css";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetTasks } from "../../services/thunks/thunks";

function MainPage() {

  const location = useLocation();

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchGetTasks())
  }, [dispatch])

  const data = useSelector(store => store.userReducer.tasksArray) || []
  

  if (data === null || data.length === 0 || !data) {
    return null
  } 

  return (
    <section className={styles.main_container}>
      <h1 className={styles.title}>Система коммуникации и управления задачами</h1>
      <ul className={styles.columns_container}>
        <li className={styles.column}>
          <h2 className={styles.column__title}>Запланировано</h2>
          <ul className={styles.tasks_container}>
          {Array.isArray(data)
        ? data.map((task) => {
          if (task.status === 'TODO') {
            return (
            <li className={styles.task__item} key={task.id}>
              <Link className={styles.link} to={`/popup/${task.id}`} state={{ background: location }}>
                <h3 className={styles.task__title}>{task.title}</h3>
                <p className={styles.task__description}>
                  {task.description}
                </p>
              </Link>
            </li> 
            )
          } else {
            return null
          }
          })
        : null}
            {/* {data.length === 0} */}
            {/* {data?.map(task => {
              if (data.length  === 0) {
                return null
              } else {
                
              }
              if (task.status === 'TODO') {
                return (
                <li className={styles.task__item} key={task.id}>
                  <Link className={styles.link} to={`/popup/${task.id}`} state={{ background: location }}>
                    <h3 className={styles.task__title}>{task.title}</h3>
                    <p className={styles.task__description}>
                      {task.description}
                    </p>
                  </Link>
                </li> 
                )
              } else {
                return null
              }
            }
            )} */}
          </ul>
        </li>
        <li className={styles.column}>
          <h2 className={styles.column__title}>В процессе</h2>
          <ul className={styles.tasks_container}>
          {data.map(task => {
              if (task.status === 'IN_PROGRESS') {
                return (
                <li className={styles.task__item} key={task.id}>
                  <Link className={styles.link} to={`/popup/${task.id}`} state={{ background: location }}>
                    <h3 className={styles.task__title}>{task.title}</h3>
                    <p className={styles.task__description}>
                      {task.description}
                    </p>
                  </Link>
                </li> 
                )
              } else {
                return null
              }
            }
            )}
          </ul>
        </li>
        <li className={styles.column}>
          <h2 className={styles.column__title}>Готовые</h2>
          <ul className={styles.tasks_container}>
          {data.map(task => {
              if (task.status === 'DONE') {
                return (
                <li className={styles.task__item} key={task.id}>
                  <Link className={styles.link} to={`/popup/${task.id}`} state={{ background: location }}>
                    <h3 className={styles.task__title}>{task.title}</h3>
                    <p className={styles.task__description}>
                      {task.description}
                    </p>
                  </Link>
                </li> 
                )
              } else {
                return null
              }
            }
            )}
          </ul>
        </li>
      </ul>
    </section>
  );
}

export default MainPage;
