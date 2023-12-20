import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from './task-popup.module.css'
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { checkResponse, connectToWebSocket, defaultHeadersWithOrigin, fetchGetUniqueTask, initSocket, makeFetchOptions, sendMessage } from "../../services/thunks/thunks";
import { clearCurrentTaks, setMessage } from "../../services/slices/user-slice";

  // useEffect(() => {

  //    const getUniqueTask = () => {
  //     const options = makeFetchOptions('GET', defaultHeadersWithOrigin, false, true);
  //     return  fetch(`http://localhost:8080/tasks/${id.id}`, options)
  //     .then(checkResponse)
  //     .then(res => setChat(res)) 

  //   };
  //   getUniqueTask();
  // },[messageSent])


function TaskPopup() {
  console.log(22);
  const id  = useParams();
  const dispatch = useDispatch();
  const stompClient = useRef(null);
  const inputRef = useRef('');
  const [messageSent, setMessageSent] = useState(false);
  // const [inputValue, setInputValue] = useState('')

  const [chat, setChat] = useState([]);

  useEffect(() => {
    dispatch(fetchGetUniqueTask(id.id))
  }, [chat]);



  const data = useSelector(store => store.userReducer.taskUnique);


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

  const [status, setStatus] = useState('planned');

  
  if (data === null || data.length === 0 ||!data) {
    return null
  } 
  
  const hadleClick = (event) => {
    send(event);
    // setMessageSent(prev => !prev)
    // dispatch(fetchGetUniqueTask(id.id))
    // console.log('SEEEEEEEEEEEND');
  }

  const assigneesArray = data.assignees || [];
  console.log(assigneesArray);
  
  const tranlateStatus = (status) => {
    switch (status) {
      case 'DONE':
        return 'Готовые';
      case 'IN_PROGRESS':
        return 'В процессе';
      case 'TODO':
        return 'Запланировано';
      default:
        return 'Неизвестно';
    }
  };

  const transformDate = (rawDate) => {
    const dateObject = new Date(rawDate);

    const formattedDate = dateObject.toLocaleString('ru-RU', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });

    return formattedDate
  }


  return (
  <section className={styles.main_container}>
    <h2 className={styles.title}>{data.title}</h2>
    <div className={styles.status_container}>
      <p className={styles.status_label}>Статус:</p>
      <h3 
      className={tranlateStatus(data.status) === 'Готовые' ? `${styles.status} ${styles.status_done}` :
      tranlateStatus(data.status) === 'Запланировано' ? `${styles.status} ${styles.status_planned}` : `${styles.status} ${styles.status_process}`}>
        {tranlateStatus(data.status)}
      </h3>
    </div>
    <div className={styles.assignee_container}>
      <h3 className={styles.assignee_title}>Ответсвенные:</h3>
      <ul className={styles.task__assignee_container}>
      {assigneesArray.length === 0 ? (<p>Отвественных пока нет</p>) :
      (assigneesArray.map((person, index) => (
        <li className={styles.task__assignee_item} key={index}>
          {person.username}
        </li>
      )
      ))
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
        <li className={styles.message__item} key={task.id} >
          <div className={styles.message_autor_date_wrapper}>
            <h4 className={styles.message__author}>{task.sender.username}</h4>
            <p className={styles.message__date}>{transformDate(task.sentAt)}</p>
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

export default TaskPopup;
