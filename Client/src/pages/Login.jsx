import { color } from "@mui/system";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { login } from "../redux/apiCalls";
import { mobile } from "../responsive";

const Container = styled.div`
  width: 99.1vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.7),
      rgba(255, 255, 255, 0.7)
    ),
    url("https://barcauniversal.com/wp-content/uploads/2022/03/jpg-2022-03-05T152258-scaled.jpg")
      center;
  background-size: cover;
  background-attachment: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 40px;
  border-radius: 50px;
  background-color: #181733;
  color: white;
  ${mobile({ width: "65%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
`;

const Button = styled.button`
  border: none;
  margin: 10px 0px 0px 0px;
  padding: 15px 20px;
  background-color: #f9c52b;
  color: black;
  font-weight: bolder;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 10px;
  transition: all 0.3s ease;
  &:disabled {
    color: darkgray;
    background-color: gray;
    cursor: not-allowed;
  }
  &:hover {
    background-color: #d1422c;
    transition: all 0.3s ease;
    color: white;
  }
`;

const LinkSpan = styled.span`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
`;
const Error = styled.span`
  color: red;
  font-weight: 700;
`;
const LinkText = styled.a`
  margin: 5px 0px;
  font-size: 14px;
  max-width: 40%;
  text-decoration: underline;
  cursor: pointer;
  font-weight: bold;
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const loginHandler = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };

  return (
    <React.Fragment>
      <Navbar />
      <Announcement />
      <Container>
        <Wrapper>
          <Title>SIGN IN</Title>
          <Form>
            <Input
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={loginHandler} disabled={isFetching}>
              LOGIN
            </Button>
            {error && <Error>Something went wrong</Error>}
            <LinkSpan>
              <LinkText>Forgotten your password?</LinkText>
              <Link to={"/register"} style={{ color: "white" }}>
                <LinkText>Create a new account</LinkText>
              </Link>
            </LinkSpan>
          </Form>
        </Wrapper>
      </Container>
      <Footer />
    </React.Fragment>
  );
};

export default Login;
