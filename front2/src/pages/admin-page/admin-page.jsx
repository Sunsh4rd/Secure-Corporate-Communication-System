import React, { useEffect } from "react";
import { useLocation } from "react-router";
import styles from './admin-page.module.css'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetTasks } from "../../services/thunks/thunks";

function AdminPage() {

  const location = useLocation();
  const isAdmin = useSelector(store => store.userReducer.isAdmin)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchGetTasks())
  }, [dispatch])

  const data = useSelector(store => store.userReducer.tasksArray) || []
  

  if (data === null || data.length === 0 || !data) {
    return null
  } 
  return (
    <>
      {!isAdmin ? (
        <section className={styles.main_container}>
        <h1 className={styles.title}>Менеджер задач (админ)</h1>
        <ul className={styles.columns_container}>
          <li className={styles.column}>
            <h2 className={styles.column__title}>Запланировано</h2>
            <ul className={styles.tasks_container}>
            {Array.isArray(data)
          ? data.map((task) => {
            if (task.status === 'TODO') {
              return (
              <li className={styles.task__item} key={task.id}>
                <Link className={styles.link} to={`/popup-admin/${task.id}`} state={{ background: location }}>
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
                    <Link className={styles.link} to={'/popup'} state={{ background: location }}>
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
                    <Link className={styles.link} to={'/popup'} state={{ background: location }}>
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
      ) : (
        <h2>Ты не еадмин </h2>
      )}


    </>
  )
}

export default AdminPage;




