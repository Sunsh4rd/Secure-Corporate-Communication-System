// CreateTask.js
import React, { useState } from 'react';
import styled from 'styled-components';

const CreateTaskContainer = styled.div`
  margin-top: 20px;
`;

const CreateTask = ({ onCreate }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleCreate = () => {
    onCreate({ title, description, status: 'Todo' });
    setTitle('');
    setDescription('');
  };

  return (
    <CreateTaskContainer>
      <h2>Create Task</h2>
      <label>Title:</label>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      <label>Description:</label>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      <button onClick={handleCreate}>Create Task</button>
    </CreateTaskContainer>
  );
};

export default CreateTask;
