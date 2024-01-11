import React, { useState } from "react";
import styles from "./task-form.module.css";
import { useDispatch } from "react-redux";
import { fetchAddNewTask } from "../../services/thunks/thunks";
import useForm from "../../hooks/useForm";
import { setSomethingChanged } from "../../services/slices/user-slice";


function TaskForm() {

  const dispatch = useDispatch();

  const [inputTitle, setInputTitle] = useState('')
  const [inputDesc, setInputDesc] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchAddNewTask(inputTitle, inputDesc));
    dispatch(setSomethingChanged())

  };

  return (
    <section className={styles.main_container}>
      <h2 className={styles.title}>Добавить задачу</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h4 className={styles.label}>Название задачи</h4>
        <input
          id="input_name"
          className={styles.input_name}
          type="text"
          placeholder="Введите название"
          value={inputTitle} 
          onChange={(e) => {setInputTitle(e.target.value)}}
        />
        <h4 className={styles.label}>Описание</h4>

        <textarea
          className={styles.input_text_area}
          rows="4"
          placeholder="Введите описание"
          value={inputDesc} 
          onChange={(e) => {setInputDesc(e.target.value)}}
        ></textarea>
        <button onClick={handleSubmit} className={styles.button_submit}>
          Добавить задачу
        </button>
      </form>
    </section>
  );
}

export default TaskForm;
