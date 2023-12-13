import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SockJS from 'sockjs-client';
import { over } from 'stompjs';
import { jwtDecode } from 'jwt-decode';
import {getTasks, setDoneStatus, setInProgressStatus} from "../api/tasks";
import Loader from "./Loader/Loader.tsx";
import {Button, Col, Row} from "react-bootstrap";
import { ModalTask } from './ModalTask/ModalTask.jsx';
import {useTaskStore} from "../stores/useTaskStore.js"

const TaskContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 30px;
  padding: 10px;
  margin-bottom: 10px;
`;

const BlurContainer = styled.div`
  opacity: 0.8;
`

const Task = ({ task, users }) => {

    const [isAdmin, setIsAdmin] = useState(jwtDecode(sessionStorage.getItem("access_token")).authorities === "ROLE_ADMIN");

    const [status, setStatus] = useState(task.status);

    const [chatMessages, setChatMessages] = useState(task.chatMessages);

    const [loader, setLoader] = useState(false);

    const [open, setOpen] = useState(false);

    const handleShow = async () => { 
        setOpen(true);
        // setTimeout(() => setOpen(false), 500);
    }

    const handleClose = () => {
        console.log(open);
        setTimeout(setOpen, 100, false);
        // setOpen(false);
        console.log(open);
    }

    return (
        <TaskContainer onClick={handleShow} className={'d-flex align-items-center justify-content-center'}>
            <ModalTask open={open} setOpen={setOpen} chatMessages={chatMessages} setChatMessages={setChatMessages} users={users} handleClose={handleClose} task={task} isAdmin={isAdmin}/>
            {loader ? <div className={'position-absolute'}>
                <Loader />
            </div> : <></>}
            {/* <ul id={'messages' + task?.id}>
                    {chatMessages?.map((msg) => <li key={msg?.id}>{msg?.content}</li>)}
                </ul> */}
            <div className={loader ? 'opacity-50 w-100' : 'w-100'}>
                <h3>{task?.title}</h3>
                {/* <p>{task?.description}</p> */}
                <p>Status: {task?.status}</p>
                {/* <ul id={'assignees' + task?.id}>
                    {task?.assignees?.map(assignee => <li key={assignee?.id}>{assignee.username}</li>)}
                </ul>
                {isAdmin ?
                    <div>
                        <select name={"assignees" + task?.id} id={"assignees" + task?.id} onChange={handleSelectChange}>
                            {users?.map(user => <option key={user?.id} value={user?.username}>{user?.username}</option>)}
                        </select>
                        <Button
                            disabled={loader}
                            variant={'light'}
                            type='button'
                            onClick={addAssigneeToTask}
                        >
                            Add assignee
                        </Button>
                    </div>
                    : null}
                <ul id={'messages' + task?.id}>
                    {chatMessages?.map((msg) => <li key={msg?.id}>{msg?.content}</li>)}
                </ul>
                <input id={"msg" + task?.id} placeholder="enter message" />
                <Row className={'p-2 gap-3 justify-content-center'}>
                    <Col className={'p-0'} xs={5}>
                        <Button
                            disabled={loader}
                            className={'w-100'}
                            variant={'light'}
                            type="button"
                            onClick={connect}
                        >
                            Connect
                        </Button>
                    </Col>
                    <Col className={'p-0'} xs={5}>
                        <Button
                            disabled={loader}setOpenModal
                            className={'w-100'}
                            variant={'light'}
                            type="button"
                            onClick={send}
                        >
                            Send
                        </Button>
                    </Col>
                </Row>
                {isAdmin ?
                    <Row className={'p-2 gap-3 justify-content-center'}>
                        <Col className={'p-0'} xs={5}>
                            <Button
                                disabled={loader}
                                className={'w-100'}
                                variant={'dark'}
                                type="button"
                                onClick={() => changeStatus('in_progress')}
                            >
                                in progress
                            </Button>
                        </Col>
                        <Col className={'p-0'} xs={5}>
                            <Button
                                disabled={loader}
                                className={'w-100'}
                                variant={'dark'}
                                type="button"
                                onClick={() => changeStatus('done')}
                            >
                                done
                            </Button>
                        </Col>
                    </Row>
                    : null} */}
            </div>
        </TaskContainer>
    );
};

export default Task;
