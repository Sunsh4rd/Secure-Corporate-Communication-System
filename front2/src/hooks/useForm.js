import React from 'react'

function useForm(inputs) {

  const [userData, setUserData] = React.useState(inputs);
 
  const hadleChangeUserData = (e) => {
    const { value, name } = e.target
    setUserData({ ...userData, [name]: value });
  };

  return { userData, setUserData, hadleChangeUserData };
}

export default useForm