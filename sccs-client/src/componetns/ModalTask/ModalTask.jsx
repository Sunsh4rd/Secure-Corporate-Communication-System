import { Modal, ModalBody, ModalFooter, ModalHeader, Button, Row, Col, CloseButton } from "react-bootstrap"
import Loader from "../Loader/Loader.tsx"
import { useEffect, useState } from "react";
import SockJS from 'sockjs-client';
import { over } from 'stompjs';
import { setDoneStatus, setInProgressStatus } from "../../api/tasks.js";
import connectToWebSocket from "./ConnectToWebSocket.js";
import { jwtDecode } from "jwt-decode";


// let stompClient = null;
// let sock = null;
export const ModalTask = ({ users, chatMessages, setChatMessages, isAdmin, task, open, setOpen, handleClose}) => {

    const [loader, setLoader] = useState(false);

    const [selectedUserOption, setSelectedUserOption] = useState('');
    const [assignees, setAssignees] = useState(task.assignees);

    const [stompClient, setStompClient] = useState(null);

    useEffect(() => {
        console.log(task);
        if (open) {
            const stomp = connectToWebSocket(task.id, chatMessages, setChatMessages);
            setStompClient(stomp);
        }
        // sock = new SockJS("http://localhost:8080/ws");
        // stompClient = over(sock);
        // stompClient.connect({}, onConnected, (e) => console.log("err" + e));
    }, [open]);

    // const connect = (event) => {
    //     const sock = new SockJS("http://localhost:8080/ws");
    //     stompClient = over(sock);
    //     stompClient.connect({}, onConnected, (e) => console.log("err" + e));
    //     event.preventDefault();
    // }

    // const onConnected = () => {
    //     // Subscribe to the Public Topic
    //     stompClient.subscribe(`/taskChat.${task.id}`, onMessageReceived);

    //     // Tell your username to the server
    //     // stompClient.send(`/app/taskChat.${task.id}.send`,
    //     //     {},
    //     //     JSON.stringify({ sender: "username", type: 'JOIN' })
    //     // )

    // }

    // const onMessageReceived = (msg) => {
    //     console.log(JSON.parse(msg.body))
    // }

    const send = (event) => {
        let messageContent = document.getElementById("msg" + task.id).value;

        let userId = jwtDecode(sessionStorage.getItem("access_token")).id;

        console.log(userId);

        stompClient.send(`/app/taskChat.${task.id}.send`, {}, JSON.stringify({ id: userId, message: messageContent }));

        event.preventDefault();
    }

    const handleSelectChange = (event) => {
        // event.preventDefault();
        setSelectedUserOption(event.target.value);
        console.log(selectedUserOption);
    };

    const addAssigneeToTask = () => {
        fetch(`http://localhost:8080/tasks/${task.id}/addAssignee`, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${sessionStorage.getItem("access_token")}`
            },
            method: "PUT",
            body: JSON.stringify({ "username": selectedUserOption }),
            credentials: "include"
        })
            .then(response => response.json())
            .then(data => setAssignees(data.assignees))
    }

    const changeStatus = async (type) => {
        setLoader(true);
        if (type === 'done') {
            setLoader(await setDoneStatus(task.id));
        } else {
            setLoader(await setInProgressStatus(task.id));
        }
    }

    // const handleClose = () => {
    //     console.log("handle close", open);
    //     setOpen(false);
    //     console.log(open);
    // }

    return (
        <Modal show={open} onHide={handleClose}>
            <ModalHeader>
                <h3>{task?.title}</h3>
                <CloseButton onClick={handleClose}/>
            </ModalHeader>
            <ModalBody>
                <p>{open ? "true": "false"}</p>
                <p>{task?.description}</p>
                <p>Status: {task?.status}</p>
                <ul id={'assignees' + task?.id}>
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
                        {/* <Button
                            disabled={loader}
                            className={'w-100'}
                            variant={'light'}
                            type="button"
                            onClick={connect}
                        >
                            Connect
                        </Button> */}
                    </Col>
                    <Col className={'p-0'} xs={5}>
                        <Button
                            disabled={loader}
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
                    : null}
            </ModalBody>
            <ModalFooter></ModalFooter>
        </Modal>
    )

}
