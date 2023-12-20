import styles from './task-popup-admin.module.css'
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { checkResponse, connectToWebSocket, defaultHeadersWithOrigin, fetchAddNewAssignee, fetchGetAllNotAssignee, fetchGetUniqueTask, fetchSentNewStatus, initSocket, makeFetchOptions, sendMessage } from "../../services/thunks/thunks";

import Select, { ActionMeta, OnChangeValue, StylesConfig } from 'react-select';
// import { ColourOption, colourOptions } from '../data';

// const colourOptions = [
//   { value: 'chocolate', label: 'Chocolate', isFixed: true },
//   { value: 'strawberry', label: 'Strawberry', isFixed: true },
//   { value: 'vanilla', label: 'Vanilla', isFixed: false },
//   { value: 'vanilla2', label: 'Vanilla2', isFixed: false }
// ]

const styles2 = {
  multiValue: (base, state) => {
    return state.data.isFixed ? { ...base, backgroundColor: 'gray' } : base;
  },
  multiValueLabel: (base, state) => {
    return state.data.isFixed
      ? { ...base, fontWeight: 'bold', color: 'white', paddingRight: 6 }
      : base;
  },
  multiValueRemove: (base, state) => {
    return state.data.isFixed ? { ...base, display: 'none' } : base;
  },
};

const orderOptions = (values) => {
  return values
    .filter((v) => v.isFixed)
    .concat(values.filter((v) => !v.isFixed));
};

function TaskPopupAdmin() {
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

  const id = useParams();
  const dispatch = useDispatch();
  const stompClient = useRef(null);
  const inputRef = useRef('');
  const [messageSent, setMessageSent] = useState(false);
  const [isChangedStatus, setIsChangedStatus] = useState(false);
  const [isChangedAssignee, setIsChangedAssignee] = useState(false);

  const [chat, setChat] = useState([]);

  useEffect(() => {
    dispatch(fetchGetUniqueTask(id.id));
    dispatch(fetchGetAllNotAssignee(id.id));
  }, [chat]);


  const data = useSelector(store => store.userReducer.taskUnique);
  const notAssignees = useSelector(store => store.userReducer.allAssignees);
  // console.log(notAssignees);



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
  const [status, setStatus] = useState('');

  const defaultColor = useMemo(() => {
    try {
      setStatus(data.status);
      // console.log(data.status);

    } catch (error) {
      
    }
  }, [data])
  
  const [value, setValue] = useState([]
    // orderOptions([colourOptions[0], colourOptions[1]])
  );
  // console.log(value);
  const assigneesArray = data?.assignees || [];

  const onlyAssigneesMemo = useMemo(() => {

      let arrayA = [];
      let arrayNA =[];
      notAssignees.forEach((man) => {
        arrayA.push({
            value: man.username,
            label: man.username,
            isFixed: false
          })
      })

      assigneesArray.forEach((man) => {
        arrayA.push({
            value: man.username,
            label: man.username,
            isFixed: false
        })
        arrayNA.push({
          value: man.username,
          label: man.username,
          isFixed: true
      })
      })
      console.log(arrayNA);
      setValue(orderOptions(arrayNA));
      return arrayA

    }, [notAssignees])

  if (data === null || data.length === 0 || !data) {
    return null
  }

  const hadleClick = (event) => {
    send(event);
  }


  const handleSubmitChangeStatus = () => {
    dispatch(fetchSentNewStatus(id.id, status))
  }
  
  const handleSubmitAddAssignee = () => {
    console.log();
    dispatch(fetchAddNewAssignee(id.id, value[value.length - 1].value))

  }

  const onChange = (
    newValue,
    actionMeta
  ) => {
    setIsChangedAssignee(true);
    switch (actionMeta.action) {
      case 'remove-value':
      case 'pop-value':
        if (actionMeta.removedValue.isFixed) {
          return;
        }
        break;
      case 'clear':
        newValue = onlyAssigneesMemo.filter((v) => v.isFixed);
        break;
    }

    setValue(orderOptions(newValue));
  };

  console.log(value);

  const transformDate = (rawDate) => {
    const dateObject = new Date(rawDate);

    const formattedDate = dateObject.toLocaleString('ru-RU', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false, // Use 24-hour format
    });

    return formattedDate
  }
  return (
    <section className={styles.main_container}>
      <h2 className={styles.title}>{data.title}</h2>

      <div className={styles.status_container}>
        
        <p className={styles.status_label}>Статус:</p>
        <ul className={styles.status__container_ul}>
          <li
            className={
              status === "TODO"
                ? `${styles.status} ${styles.status_planned} ${styles.status__active}`
                : `${styles.status} ${styles.status_planned}`
            }
            onClick={() => {
              setStatus("TODO");
              setIsChangedStatus(true);
            }}
          >
            Запланировано
          </li>
          <li
            className={
              status === "IN_PROGRESS"
                ? `${styles.status} ${styles.status_process} ${styles.status__active}`
                : `${styles.status} ${styles.status_process}`
            }
            onClick={() => {
              setStatus("IN_PROGRESS");
              setIsChangedStatus(true);
            }}
          >
            В процессе
          </li>
          <li
            className={
              status === "DONE"
                ? `${styles.status} ${styles.status_done} ${styles.status__active}`
                : `${styles.status} ${styles.status_done}`
            }
            onClick={() => {
              setStatus("DONE");
              setIsChangedStatus(true);
            }}
          >
            Готовые
          </li>
        </ul>
        {isChangedStatus && (
          <button 
            type="button"
            onClick={handleSubmitChangeStatus}
            className={`${styles.button_submit} ${styles.button_submit_statue_and_assignee}`} 
          >
            Изменить
          </button>
        )}
      </div>

      <div className={styles.assignee_container}>

        <h3 className={styles.assignee_title}>Ответсвенные:</h3>
        <Select
          value={value}
          isMulti
          styles={styles2}
          isClearable={value.some((v) => !v.isFixed)}
          name="colors"
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={onChange}
          options={onlyAssigneesMemo}
          placeholder="Выберите исполнителя"
        />
        {/* <ul className={styles.task__assignee_container}>
          {assigneesArray.length === 0 ? (<p>Отвественных пока нет</p>) :
            (assigneesArray.map((person, index) => (
              <li className={styles.task__assignee_item} key={index}>
                {person}
              </li>
            )))
          }
        </ul> */}
        {isChangedAssignee && (
          <button 
            type="button"
            onClick={handleSubmitAddAssignee}
            className={`${styles.button_submit} ${styles.button_submit_statue_and_assignee}`} 

            >
            Добавить
          </button>
        )}
      </div>
      <div className={styles.description_container}>
        <h3 className={styles.description_label}>Описание:</h3>
        <p className={styles.description}>{data.description}</p>
      </div>

      <div className={styles.message}>
        <h3 className={styles.message__title}>Обсуждение</h3>
        <ul className={styles.message__container}>
          {data.chatMessages.map((task) => (
            <li className={styles.message__item} key={task.id}>
              <div className={styles.message_autor_date_wrapper}>
                <h4 className={styles.message__author}>
                  {task.sender.username}
                </h4>
                <p className={styles.message__date}>{transformDate(task.sentAt)}</p>
              </div>
              <p className={styles.message_text}>{task.content}</p>
            </li>
          ))}
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
        <button className={styles.button_submit} onClick={hadleClick}>
          Отправить
        </button>
      </form>
    </section>
  );


}

export default TaskPopupAdmin;


