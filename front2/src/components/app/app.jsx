import { Route, Routes, useLocation } from 'react-router-dom';
import React from 'react'
import styles from './app.module.css'
import LoginPage from '../../pages/login-page/login-page';
import RegisterPage from '../../pages/register-page/register-page';
import MainPage from '../../pages/main-page/main-page';
import Modal from '../modal/modal';
import TaskPopup from '../task-popup/task-popup';
import AdminPage from '../../pages/admin-page/admin-page';
import TaskPopupAdmin from '../task-popup-admin/task-popup-admin';


const App = () => {

  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <div className={styles.main_container}>
      <div className={styles.wrapper}>
        <Routes location={background || location}>
          <Route path='/' element= {<MainPage />} />
          <Route path='/login' element= {<LoginPage />} />
          <Route path='/register' element= {<RegisterPage />} />
          <Route path='/admin' element= {<AdminPage />} />
        </Routes>
        {background && (
        <Routes> 
          <Route 
            path='/popup'
            element={
           <Modal>
              <TaskPopup />
           </Modal>}/>
           <Route 
            path='/admin/popup-admin'
            element={
           <Modal>
              <TaskPopupAdmin />
           </Modal>}/>
         </Routes>
         )}
      </div>
    </div>
  )
}

export default App