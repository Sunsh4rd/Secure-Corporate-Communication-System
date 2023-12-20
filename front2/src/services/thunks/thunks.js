import SockJS from "sockjs-client";
import { over } from "stompjs";
import { addNewAssigneeRequest, addNewAssigneeRequestFailed, addNewAssigneeRequestSucces, addNewTaskRequest, addNewTaskRequestFailed, addNewTaskRequestSuccess, getAllNotAssigneeRequest, getAllNotAssigneeRequestFailed, getAllNotAssigneeRequestSuccess, getTasksRequest, getTasksRequestFailed, getTasksRequestSuccessed, getUniqueTaskRequest, getUniqueTaskRequestFailed, getUniqueTaskRequestSuccessed, logingRequest, loginingRequestFailed, loginingRequestSuccess, registrationRequest, registrationRequestFailed, registrationRequestSuccessed, sentNewStatusRequest, sentNewStatusRequestFailed, sentNewStatusRequestSuccess, setMessage, setReceivedMessage, setStompClient } from "../slices/user-slice";

export const defaultHeaders = {
  "Content-Type": "application/json"
};

export const defaultHeadersWithOrigin = {
  "Content-Type": "application/json",
  Origin: "http://localhost:3000",
}

export const makeFetchOptions = (method, headers, body, isCredential) => {
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
  // console.log(options);
  return fetch('http://localhost:8080/auth/register', options)
  .then(checkResponse); 
};

export const loginUser = (name, password) => {
  const body = {
    username: name, 
    password: password,
  };
  const options = makeFetchOptions('POST', defaultHeadersWithOrigin, body, true);
  console.log(options);
  return fetch('http://localhost:8080/auth/login', options)
  .then(checkResponse); 
};

export const getTasks = () => {
  const options = makeFetchOptions('GET', defaultHeadersWithOrigin,false, true);
  return fetch('http://localhost:8080/tasks', options)
  .then(checkResponse); 
};


export const getUniqueTask = (id) => {
  const options = makeFetchOptions('GET', defaultHeadersWithOrigin, false, true);
  // console.log(options);
  return fetch(`http://localhost:8080/tasks/${id}`, options)
  .then(checkResponse); 
};

export const sentNewStatus = (taskId, taskStatus) => {
  const body = {
    status: taskStatus
  };
  const options = makeFetchOptions('PUT', defaultHeadersWithOrigin, body, true);
  return fetch(`http://localhost:8080/tasks/${taskId}/updateStatus`, options)
  .then(checkResponse); 
};

export const getAllNotAssignee = (taskId) => {
  const options = makeFetchOptions('GET', defaultHeadersWithOrigin, false, true);
  return fetch(`http://localhost:8080/user/notAssigned/${taskId}`, options)
  .then(checkResponse); 
};

export const addNewAssignee = (taskId, name) => {
  const body = {
    username: name
  };
  const options = makeFetchOptions('PUT', defaultHeadersWithOrigin, body, true);
  return fetch(`http://localhost:8080/tasks/${taskId}/addAssignee`, options)
  .then(checkResponse); 
};

export const addNewTask = (title, description) => {
  const body = {
    title: title,
    description: description
  };
  console.log(body);
  const options = makeFetchOptions('POST', defaultHeadersWithOrigin, body, true);
  return fetch(`http://localhost:8080/tasks/createTask`, options)
  .then(checkResponse); 
};

export const fetchAddNewTask = (title, description) => async(dispatch) => {
  try {
    dispatch(addNewTaskRequest());
    const response = await addNewTask(title, description);
    // console.log(response); 
    dispatch(addNewTaskRequestSuccess());
  } catch (error) {
    dispatch(addNewTaskRequestFailed(error))
  }
}

export const fetchAddNewAssignee = (taskId, name) => async(dispatch) => {
  try {
    dispatch(addNewAssigneeRequest());
    console.log(name);
    const response = await addNewAssignee(taskId, name);
    // console.log(response); 
    dispatch(addNewAssigneeRequestSucces());
  } catch (error) {
    dispatch(addNewAssigneeRequestFailed(error))
  }
}

export const fetchGetAllNotAssignee = (taskId) => async(dispatch) => {
  try {
    dispatch(getAllNotAssigneeRequest());
    const response = await getAllNotAssignee(taskId);
    // console.log(response); 
    dispatch(getAllNotAssigneeRequestSuccess(response));
  } catch (error) {
    dispatch(getAllNotAssigneeRequestFailed(error))
  }
}

export const fetchSentNewStatus = (taskId, taskStatus) => async(dispatch) => {
  try {
    dispatch(sentNewStatusRequest());
    const response = await sentNewStatus(taskId, taskStatus);
    // console.log(response); 
    dispatch(sentNewStatusRequestSuccess());
  } catch (error) {
    dispatch(sentNewStatusRequestFailed(error))
  }
}

export const fetchGetUniqueTask= (id) => async(dispatch) => {
  try {
    console.log(33);
    dispatch(getUniqueTaskRequest());
    const response = await getUniqueTask(id);
    // console.log(response); 
    dispatch(getUniqueTaskRequestSuccessed(response));
  } catch (error) {
    dispatch(getUniqueTaskRequestFailed(error))
  }
}

export const fetchGetTasks = () => async(dispatch) => {
  try {
    dispatch(getTasksRequest());
    const response = await getTasks();
    // console.log(response); 
    dispatch(getTasksRequestSuccessed(response));
  } catch (error) {
    dispatch(getTasksRequestFailed(error))
  }
}

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

    if (!localStorage.getItem('userName')) {

    } else {
      localStorage.removeItem('userName')

    }

    if (!localStorage.getItem('isAdmin')) {

    } else {
      localStorage.removeItem('isAdmin')
    }
    const response = await loginUser(name, password);
    const isAdmin = response.is_admin

    localStorage.setItem('userName', name)
    localStorage.setItem('isAdmin', isAdmin)

    dispatch(loginingRequestSuccess({name, isAdmin}));
  } catch (error) {
    dispatch(loginingRequestFailed(error))
  }
}

export const connectToWebSocket = (id, chat, setChat) => {
  const stompClient = over(new SockJS('http://localhost:8080/ws'));
  stompClient.debug = null; // Установите debug в null, чтобы отключить вывод сообщений

  const onMessageReceived = (msg) => {
    console.log(JSON.parse(msg.body))


    setChat([...chat, JSON.parse(msg.body)])
  }

  const onConnected = () => {
    stompClient.subscribe(`/taskChat.${id}`, onMessageReceived);
  }

  stompClient.connect({}, onConnected);

  return stompClient

  // stompClient.subscribe(`/taskChat.${id}`, (message) => {
  //   const data = JSON.parse(message.body);
  //   console.log('Получено сообщение от сервера:', data);
  //   dispatch(setReceivedMessage(data));
  // });

  // dispatch(setStompClient(stompClient));
};

