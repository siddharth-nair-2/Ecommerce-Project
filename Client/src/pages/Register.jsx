import React from "react";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.7),
      rgba(255, 255, 255, 0.7)
    ),
    url("https://wallpapercave.com/wp/wp9719640.jpg") center;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 40px;
  border-radius: 50px;
  background-color: #181733;
  color: white;
  ${mobile({ width: "75%", marginTop: "50px", marginBottom: "50px" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  ${mobile({ display: "flex", flexDirection: "column" })}
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0px;
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 100%;
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
  &:hover {
    background-color: #d1422c;
    transition: all 0.3s ease;
    color: white;
  }
`;

const Register = () => {
  return (
    <React.Fragment>
      <Navbar />
      <Announcement />
      <Container>
        <Wrapper>
          <Title>CREATE AN ACCOUNT</Title>
          <Form>
            <Input placeholder="name" />
            <Input placeholder="last name" />
            <Input placeholder="username" />
            <Input placeholder="email" />
            <Input placeholder="password" />
            <Input placeholder="confirm password" />
            <Agreement>
              By creating an account, I consent to the processing of my personal
              data in accordance with the <b>PRIVACY POLICY</b>
            </Agreement>
            <Button>CREATE</Button>
          </Form>
        </Wrapper>
      </Container>
      <Footer />
    </React.Fragment>
  );
};

export default Register;
