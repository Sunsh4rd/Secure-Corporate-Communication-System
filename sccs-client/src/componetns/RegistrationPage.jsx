import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const RegistrationPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const RegistrationForm = styled.form`
  width: 300px;
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

const RegistrationInput = styled.input`
  width: 80%;
  display: flex-box;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

const RegistrationButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  &:hover {
    background-color: #24a4ff;
  }
`;

function RegistrationPage() {
    const navigate = useNavigate();
    const goToLogin = () => navigate('/login', { replace: true });

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const user = form.username.value;
        const password = form.password.value;
        console.log({ 'username': user, 'password': password });
        let res = await fetch("http://localhost:8080/auth/register", {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({ 'username': user, 'password': password })
        }).then(data => data.json())
            .then(data => console.log(JSON.stringify(data)))
            .then(() => goToLogin());
    }

    return (
        <RegistrationPageContainer>
            <RegistrationForm onSubmit={handleSubmit}>
                <h2>Регистрация</h2>
                <RegistrationInput name='username' type="text" placeholder="Имя пользователя" />
                {/* <RegistrationInput type="email" placeholder="Email" /> */}
                <RegistrationInput name='password' type="password" placeholder="Пароль" />
                <RegistrationButton>Зарегистрироваться</RegistrationButton>
            </RegistrationForm>
        </RegistrationPageContainer>
    );
}

export default RegistrationPage;
