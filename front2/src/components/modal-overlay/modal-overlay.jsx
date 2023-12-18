import React from 'react'
import styles from './modal-overlay.module.css'
import { useNavigate } from 'react-router-dom';

const ModalOverlay = () => {
  const navigate = useNavigate();

  const handleOverlayClick = (evt) => {
    if (evt.currentTarget === evt.target) {
      navigate(-1)
    }
  } 

  return (
    <div className={styles.overlay}
     onClick={handleOverlayClick}
      />
    )
}

export default React.memo(ModalOverlay)