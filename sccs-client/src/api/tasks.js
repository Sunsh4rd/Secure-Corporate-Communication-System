
import { useTaskStore } from '../stores/useTaskStore';


export const getTasks = async () => {
    return await fetch("http://localhost:8080/tasks", {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${sessionStorage.getItem("access_token")}`
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            useTaskStore.setState({tasks: data});
        });
}

export const setInProgressStatus = async (id) => {
    await fetch(`http://localhost:8080/tasks/${id}/updateStatus`, {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${sessionStorage.getItem("access_token")}`
        },
        method: "PUT",
        body: JSON.stringify({ "status": "IN_PROGRESS" }),
        credentials: "include"
    })
    await getTasks();
    return true;
};

export const setDoneStatus = async (id) => {
    await fetch(`http://localhost:8080/tasks/${id}/updateStatus`, {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${sessionStorage.getItem("access_token")}`
        },
        method: "PUT",
        body: JSON.stringify({ "status": "DONE" }),
        credentials: "include"
    })
    await getTasks();
    return true;
};
