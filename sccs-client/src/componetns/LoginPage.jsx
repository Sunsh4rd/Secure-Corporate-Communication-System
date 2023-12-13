import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../hook/useAuth";

const LoginPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const LoginForm = styled.form`
  width: 300px;
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

const LoginInput = styled.input`
  width: 80%;
  display: flex-box;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

const LoginButton = styled.button`
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

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signin } = useAuth();

  const fromPage = location.state?.from?.pathname || "/";

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const user = form.email.value;
    const password = form.password.value;
    console.log({ username: user, password: password });
    await fetch("http://localhost:8080/auth/login", {
      headers: {
        "Content-Type": "application/json",
        Origin: "http://localhost:3000",
      },
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ username: user, password: password }),
    })
      .then((res) => res.json())
      .then((data) =>
        sessionStorage.setItem("access_token", data.access_token)
      );
    signin(user, () => navigate(fromPage, { replace: true }));
  };

  return (
    <LoginPageContainer>
      <LoginForm onSubmit={handleSubmit}>
        <h2>Вход</h2>
        <h3>{fromPage}</h3>
        <LoginInput name="email" placeholder="Email" />
        <LoginInput name="password" type="password" placeholder="Пароль" />
        <LoginButton>Войти</LoginButton>
      </LoginForm>
    </LoginPageContainer>
  );
};

export default LoginPage;
