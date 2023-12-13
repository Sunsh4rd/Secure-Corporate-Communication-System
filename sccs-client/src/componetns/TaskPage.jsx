// TaskPage.js
/* eslint-disable */
import React, { useEffect, useState } from "react";
import TaskList from "./TaskList";
import CreateTask from "./CreateTask";
import styled from "styled-components";
import { jwtDecode } from "jwt-decode";
import { Grid, Paper } from "@mui/material";
import { useTaskStore } from "../stores/useTaskStore";
import { getTasks } from "../api/tasks";
import { Button, Col, Row } from "react-bootstrap";
import { ModalAddTask } from "./ModalAddTask/ModalAddTask";
import { ModalTask } from "./ModalTask/ModalTask";

const TaskPageContainer = styled.div`
  //max-width: 900px;
  margin: 0 auto;
  padding: 20px;
`;

const StatusColumn = styled(Grid)`
  margin: 0 10px;
`;

const TaskPage = () => {
  const tsk = useTaskStore((state) => state.tasks);

  console.log(tsk);

  const [tasks, setTasks] = useState([]);

  const [users, setUsers] = useState([]);

  const [isAdmin, setIsAdmin] = useState(
    jwtDecode(sessionStorage.getItem("access_token")).authorities ===
      "ROLE_ADMIN"
  );

  useEffect(() => {
    setTasks(useTaskStore.getState().tasks);
  }, [useTaskStore.getState().tasks]);

  useEffect(() => {
    fetch(`http://localhost:8080/user`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
      },
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  const handleCreateTask = async (newTask) => {
    await fetch("http://localhost:8080/tasks/createTask", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
      },
      method: "POST",
      body: JSON.stringify({
        title: newTask.title,
        description: newTask.description,
      }),
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTasks([...tasks, data]);
      });
    await getTasks();
  };

  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useTaskStore((state) => [
    state.openModal,
    state.setOpenModal,
  ]);
  const cols = ["TODO", "IN_PROGRESS", "DONE"];

  return (
    <TaskPageContainer>
      <ModalAddTask open={open} setOpen={setOpen} />
      <Row>
        <Col className={"d-flex justify-content-end"} xs={8}>
          <h1>Task Management App</h1>
        </Col>
        {isAdmin ? (
          <Col xs={4}>
            <Button onClick={() => setOpen(true)} className={"w-100"}>
              +
            </Button>
          </Col>
        ) : (
          <></>
        )}
      </Row>
      <Grid container spacing={3}>
        {cols.map((item) => {
          return (
            <StatusColumn className={"rounded"} item xs={4}>
              <Paper elevation={3}>
                <h2 className={"border-bottom border-4 py-3"}>{item}</h2>
                <TaskList
                  tasks={tasks?.filter((task) => task.status === item)}
                  users={users}
                />
              </Paper>
            </StatusColumn>
          );
        })}
      </Grid>
    </TaskPageContainer>
  );
};

export default TaskPage;
