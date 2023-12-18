import React from 'react'
import styles from '../login-page/login-page.module.css'
import { Link } from 'react-router-dom'
import useForm from '../../hooks/useForm';
import Input from '../../ui/input/input';
import { useDispatch } from 'react-redux';
import {fetchRegister} from '../../services/thunks/thunks'


export  const inputsRegisterPage = [
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

const RegisterPage = () => {
  
  // const navigate = useNavigate();
  
  const { hadleChangeUserData, userData } = useForm({
    userName: '',
    password: '',
  });

  const dispatch = useDispatch();

  const hadleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchRegister(userData.userName,  userData.password));
  };

  // React.useEffect(() => {
  //   if(registrationRequestSuccess){
  //     setTimeout(() => navigate(loginPATH), 4000);
  //   }
  // }, [registrationRequestSuccess, navigate]);
  
  return (
    <div className={styles.wrapper}>
    <section className={`${styles.main_container}`}>
      <h2 className='text text_type_main-medium mb-6'>Регистрация</h2>
      <form className={`${styles.form_container} mb-20`} onSubmit={hadleSubmit}>
        {inputsRegisterPage.map((input, index) => (
          <Input 
          {...input} 
          key={index} 
          value={userData[input.name]} 
          onChange={hadleChangeUserData}
          />
        ))}
        <button className={styles.submit_button} type="submit">Зарегистрироваться</button>
      </form>
      <ul className={`${styles.links_container}`}>
        <li className={`${styles.links_row}`}>
          <Link to={'/login'} className={styles.link_description}> 
            Уже есть аккаунт?
          </Link>
        </li>
      </ul>
    </section>
  </div>
  )
}

export default RegisterPage