import React from 'react'
import styles from './input.module.css';

function Input(props) {

  const { label, errorMessage, onChange, ...inputProps } = props;
  const [focused, setfocused] = React.useState(false);
  const [isValue, setisValue] = React.useState('');
 
  const handleFocus = () => {
    setfocused(true)
  }

  return (
    <div className={styles.main_container}>
      <input
        {...inputProps}
        className={`${styles.input} ${!isValue ? styles.input_border : ''}`}
        onChange={(e) => {
          onChange(e); 
          setisValue(e.target.value)
        }}
        onBlur={handleFocus}
        focused={focused.toString()} 
      />
      <span className={styles.error_meassage} >{errorMessage}</span>
    </div>
  )
}

export default Input