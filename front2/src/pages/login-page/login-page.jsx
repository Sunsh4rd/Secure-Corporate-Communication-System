import React from 'react'
import styles from './login-page.module.css'
import Input from '../../ui/input/input';
import useForm from '../../hooks/useForm';
import { Link } from 'react-router-dom';

export const inputsLoginPage = [
  {
    name: "userName",
    type: "text",
    placeholder: "Имя пользователя",

    required: true,
  },
  {
    name: "password",
    type: "password",
    placeholder: "Пароль",
    required: true,
  }
];

const LoginPage = () => {

  const { hadleChangeUserData, userData } = useForm({
    userName: '',
    password: '',
  });

  const hadleSubmit = (e) => {
    e.preventDefault();
   
    // dispatch(fetchLoginThunk(userData.email,  userData.password));
  };

  console.log(userData);

  return (
    <div className={styles.wrapper}>
      <section className={`${styles.main_container}`}>
        <h2 className='text text_type_main-medium mb-6'>Войти</h2>
        <form className={`${styles.form_container} mb-20`} onSubmit={hadleSubmit}>
          {inputsLoginPage.map((input, index) => (
            <Input 
              {...input} 
              key={index} 
              value={userData[input.name]} 
              onChange={hadleChangeUserData}
            />
          ))}
          <button className={styles.submit_button} type="submit">Войти</button>
        </form>
        <ul className={`${styles.links_container}`}>
          <li className={`${styles.links_row}`}>
            <Link to={'/register'} className={styles.link_description}> 
              Зарегистрироваться
            </Link>
          </li>
        </ul>
      </section>
    </div>
  )
}

export default LoginPage