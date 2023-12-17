import { Route, Routes } from 'react-router-dom';
import React from 'react'
import styles from './app.module.css'
import LoginPage from '../../pages/login-page/login-page';
import RegisterPage from '../../pages/register-page/register-page';
import MainPage from '../../pages/main-page/main-page';


const App = () => {

  return (
    <div className={styles.main_container}>
      <div className={styles.wrapper}>
        <Routes>
          <Route path='/' element= {<MainPage />} />
          <Route path='/login' element= {<LoginPage />} />
          <Route path='/register' element= {<RegisterPage />} />
        </Routes>
      </div>
    </div>
  )
}

export default App