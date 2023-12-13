import React from 'react';
import Task from './Task';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const TaskListContainer = styled.div`
  margin-top: 20px;
`;

const TaskList = ({ tasks, users }) => {
    return (
        <TaskListContainer>
            {tasks.map((task) => (
                <Task key={task.id} task={task} users={users}/>
            ))}
        </TaskListContainer>
    );
};

export default TaskList;


// const TaskList = () => {
// let [tasks, setTasks] = useState();
// useEffect(() => {
//     fetch("http://localhost:8080/api/v1/tasks")
//         .then(data => data.json())
//         .then(data => {console.log(data); setTasks(JSON.stringify(data))}).catch((error) => { console.log(error) })
// }, [])

// const wsConnection = await new WebSocket("ws://localhost:8080/ws")
// console.log(wsConnection)

//     let [tasks, setTasks] = useState();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!e.isDefaultPrevented()) {
//             e.returnValue = false;
//         }
//         let response = await fetch("http://localhost:3000/tasks", {
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': 'Bearer ' + Cookies.get('Token')
//             },
//             method: 'GET',
//         })
//             .then(console.log(Cookies.get('Token')))
//             .then(data => data.json())
//             .then(data => { setTasks(JSON.stringify(data)); })

//         return false;
//     }

//     return (<div>
//         <form>
//             <button type="submit" onClick={handleSubmit} onSubmit={handleSubmit}>Задачи</button>
//         </form>
//         {tasks}
//     </div>);
// }

// export default TaskList;
