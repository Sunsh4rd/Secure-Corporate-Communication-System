import styles from './task-popup-admin.module.css'
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { checkResponse, connectToWebSocket, defaultHeadersWithOrigin, fetchGetUniqueTask, initSocket, makeFetchOptions, sendMessage } from "../../services/thunks/thunks";

function TaskPopupAdmin() {

  const id = useParams();
  const dispatch = useDispatch();
  const stompClient = useRef(null);
  const inputRef = useRef('');
  const [messageSent, setMessageSent] = useState(false);
  // const [inputValue, setInputValue] = useState('')

  const [chat, setChat] = useState([]);

  useEffect(() => {
    dispatch(fetchGetUniqueTask(id.id))
  }, [chat]);


  // useEffect(() => {

  //    const getUniqueTask = () => {
  //     const options = makeFetchOptions('GET', defaultHeadersWithOrigin, false, true);
  //     return  fetch(`http://localhost:8080/tasks/${id.id}`, options)
  //     .then(checkResponse)
  //     .then(res => setChat(res)) 

  //   };
  //   getUniqueTask();
  // },[messageSent])

  const data = useSelector(store => store.userReducer.taskUnique);
  // console.log(data);


  const loginUser = localStorage.getItem('userName');

  useEffect(() => {
    const stomp = connectToWebSocket(id.id, chat, setChat);
    stompClient.current = stomp;
  }, []);

  const send = (event) => {
    event.preventDefault();
    let messageContent = inputRef.current.value;
    stompClient.current.send(`/app/taskChat.${id.id}.send`, {}, JSON.stringify({ username: loginUser, message: messageContent }));
    setMessageSent(true)
    console.log(messageSent);
  }

  
  const [status, setStatus] = useState(data.status);


  if (data === null || data.length === 0 || !data) {
    return null
  }

  const hadleClick = (event) => {
    send(event);
    // setMessageSent(prev => !prev)
    // dispatch(fetchGetUniqueTask(id.id))
    // console.log('SEEEEEEEEEEEND');
  }

  const assigneesArray = data.assignees || [];

  const tranlateStatus = (status) => {
    switch (status) {
      case 'DONE':
        return 'Готовые';
      case 'PROCESS':
        return 'В процессе';
      case 'TODO':
        return 'Запланировано';
      default:
        return 'Неизвестно';
    }
  };


  return (
    <section className={styles.main_container}>
      <h2 className={styles.title}>{data.title}</h2>
      <div className={styles.status_container}>
        <p className={styles.status_label}>Статус:</p>
        {/* <h3
          className={tranlateStatus(data.status) === 'Готовые' ? `${styles.status} ${styles.status_done}` :
            tranlateStatus(data.status) === 'Запланировано' ? `${styles.status} ${styles.status_planned}` : `${styles.status} ${styles.status_process}`}>
          {tranlateStatus(data.status)}
        </h3> */}
        <ul className={styles.status__container_ul} >
          <li
            className={tranlateStatus(data.status) === 'Запланировано' ? `${styles.status} ${styles.status_planned} ${styles.status__active}` : `${styles.status} ${styles.status_planned}`}
            onClick={() => {setStatus('Запланировано') }}
          >
            Запланировано
          </li>
          <li
            className={tranlateStatus(data.status) === 'Запланированоss' ? `${styles.status} ${styles.status_process} ${styles.status__active}` : `${styles.status} ${styles.status_process}`}
            onClick={() => { setStatus('Запланировано') }}
          >
            В процессе
          </li>
          <li
            className={tranlateStatus(data.status) === 'Готовые' ? `${styles.status} ${styles.status_done} ${styles.status__active}` : `${styles.status} ${styles.status_done}`}
            onClick={() => { setStatus('Готовые') }}
          >
            Готовые
          </li>
        </ul>
      </div>
      <div className={styles.assignee_container}>
        <h3 className={styles.assignee_title}>Ответсвенные:</h3>
        <ul className={styles.task__assignee_container}>
          {assigneesArray.length === 0 ? (<p>Отвественных пока нет</p>) :
            (assigneesArray.map((person, index) => (
              <li className={styles.task__assignee_item} key={index}>
                {person}
              </li>
            )))
          }
        </ul>
      </div>
      <div className={styles.description_container}>
        <h3 className={styles.description_label}>
          Описание:
        </h3>
        <p className={styles.description}>
          {data.description}
        </p>
      </div>
      <div className={styles.message}>
        <h3 className={styles.message__title}>Обсуждение</h3>
        <ul className={styles.message__container}>
          {data.chatMessages.map((task) => (
            // {
            //   console.log(task);
            // }
            // (
            <li className={styles.message__item} key={task.id} >
              <div className={styles.message_autor_date_wrapper}>
                <h4 className={styles.message__author}>{task.sender.username}</h4>
                <p className={styles.message__date}>{task.sentAt}</p>
              </div>
              <p className={styles.message_text}>{task.content}</p>
            </li>
          )
          )}

        </ul>
      </div>
      <form className={styles.form}>
        <textarea
          name="message"
          id="message"
          className={`${styles.textarea}`}
          placeholder="Ваш текст"
          rows={4}
          ref={inputRef}
        // value={inputValue}
        // onChange={setInputValue]
        />
        <button className={styles.button_submit}
          onClick={hadleClick}
        >
          Отправить
        </button>
      </form>
    </section>
  );


}

export default TaskPopupAdmin;


