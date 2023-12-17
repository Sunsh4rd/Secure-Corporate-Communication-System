import { registrationRequest, registrationRequestFailed, registrationRequestSuccessed } from "../slices/user-slice";

const defaultHeaders = {
  "Content-Type": "application/json"
};

export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return res.json()
  .then((err) => {
    console.log(err)

    err.httpCode = res.status;
    return Promise.reject(err);
  })
}

export const registerUser = (name, password) => {
  const body = {
    username: name, 
    password: password,
  };
  const options = makeFetchOptions('POST', defaultHeaders, body);
  return fetch('свой путь', options)
  .then(checkResponse); 
};


export const fetchRegister = (name, password) => async(dispatch) => {
  try {
    dispatch(registrationRequest());
    const response = await registerUser(name, password); 
    dispatch(registrationRequestSuccessed());
  } catch (error) {
    dispatch(registrationRequestFailed(error))
  }
}


