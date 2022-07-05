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
`

const Link = styled.a`
  margin: 5px 0px;
  font-size: 14px;
  max-width: 40%;
  text-decoration: underline;
  cursor: pointer;
  font-weight: bold;
`;

const Login = () => {
  return (
    <React.Fragment>
      <Navbar />
      <Announcement />
      <Container>
        <Wrapper>
          <Title>SIGN IN</Title>
          <Form>
            <Input placeholder="username" />
            <Input placeholder="password" />
            <Button>LOGIN</Button>
            <LinkSpan>
              <Link>Forgotten your password?</Link>
              <Link>Create a new account</Link>
            </LinkSpan>
          </Form>
        </Wrapper>
      </Container>
      <Footer />
    </React.Fragment>
  );
};

export default Login;
