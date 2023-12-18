import { logingRequest, loginingRequestFailed, loginingRequestSuccess, registrationRequest, registrationRequestFailed, registrationRequestSuccessed } from "../slices/user-slice";

const defaultHeaders = {
  "Content-Type": "application/json"
};

const defaultHeadersWithOrigin = {
  "Content-Type": "application/json",
  Origin: "http://localhost:3000",
}

const makeFetchOptions = (method, headers, body, isCredential) => {
  const options = {
    method: !!method ? method : 'GET',
    headers,
  };
  if (body) {
    options.body = JSON.stringify(body)
  }
  if (isCredential) {
    options.credentials = 'include'
  }
  return options;
}

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
  const options = makeFetchOptions('POST', defaultHeaders, body, false);
  console.log(options);
  return fetch('http://localhost:8080/auth/register', options)
  .then(checkResponse); 
};

export const loginUser = (name, password) => {
  const body = {
    username: name, 
    password: password,
  };
  const options = makeFetchOptions('POST', defaultHeadersWithOrigin, body, true);
  return fetch('http://localhost:8080/auth/login', options)
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

export const fetchLogin = (name, password) => async(dispatch) => {
  try {
    dispatch(logingRequest());
    const response = await loginUser(name, password);
    console.log(response); 
    dispatch(loginingRequestSuccess());
  } catch (error) {
    dispatch(loginingRequestFailed(error))
  }
}

