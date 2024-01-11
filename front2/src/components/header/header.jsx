import React from "react";
import styles from "./header.module.css";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  const loginUser = localStorage.getItem("userName");
  const isAdmin = localStorage.getItem("isAdmin");

  console.log(isAdmin);

  if (location.pathname === '/login' || location.pathname === '/register') {
    return null
  }

  return (
    <header className={styles.header}>
      <div className={styles.leftContent}>
        {/* <div className={styles.greeting}>Здравствуйте, {loginUser}!</div> */}
      </div>
      <div className={styles.title_and_button_container}>
        {isAdmin !== 'false' && (
          <Link
            className={styles.link}
            to={`/admin/form`}
            state={{ background: location }}
          >
            <button className={styles.button}>Добавить задачу</button>
          </Link>
        )}

        <Link className={styles.link} to={`/login`}>
          <button className={`${styles.button} ${styles.button_login}`}>
            Войти
          </button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
