import {Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row} from "react-bootstrap";
import React, {useState} from "react";
import {getTasks} from "../../api/tasks";
import Loader from "../Loader/Loader.tsx";

export const ModalAddTask = ({open, setOpen}) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loader, setLoader] = useState(false);

    const handleCreate = async () => {
        await handleCreateTask();
        setTitle('');
        setDescription('');
    };

    const handleCreateTask = async () => {
        setLoader(true);
        await fetch("http://localhost:8080/tasks/createTask", {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${sessionStorage.getItem("access_token")}`
            },
            method: "POST",
            body: JSON.stringify({ "title": title, "description": description }),
            credentials: "include"
        })
        await getTasks();
        setLoader(false);
        setOpen(false);
    };

    return (
        <Modal show={open} onHide={setOpen}>
            <div className={'d-flex align-items-center justify-content-center'}>
                {loader ? <div className={'position-absolute'}>
                    <Loader />
                </div> : <></>}
                <div className={loader ? 'opacity-50 w-100' : 'w-100'}>
                    <ModalHeader closeButton>Добавление задачи</ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col xs={3}>
                                <h2>Задача: </h2>
                            </Col>
                            <Col xs={9}>
                                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                            </Col>
                        </Row>
                        <Row>
                            <h2>Описание: </h2>
                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Button className={'w-100'} variant={'light'} onClick={handleCreate}>Create Task</Button>
                    </ModalFooter>
                </div>
            </div>
        </Modal>
    )
}
