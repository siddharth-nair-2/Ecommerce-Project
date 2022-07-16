import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { userRequest } from "../requestMethods";
import { ReactNotifications, Store } from "react-notifications-component";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-notifications-component/dist/theme.css";
import { mobile } from "../responsive";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 99.1vw;
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

const ProgressCircle = styled.div`
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingBlock = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40%;
  height: 59.5%;
  margin-top: -40px;
  margin-left: -40px;
  padding: 40px;
  border-radius: 50px;
  z-index: 2;
  background-color: #1a1431d5;
`;

const ImageBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 50px;
  align-content: center;
  padding: 20px;
  ${mobile({ gap: "0px", marginLeft: "40px" })}
`;
const LabelBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 50px;
  align-content: center;
  padding: 50px;
  ${mobile({ paddingTop: "50px" })}
`;

const Image = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  object-position: top;
`;

const Register = () => {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const [upPercent, setUpPercent] = useState(0);
  const [loadingState, setLoadingState] = useState(false);
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const comfirmCreateHandler = () => {
    Store.addNotification({
      title: "Account Created!",
      message: "Your account has been created!",
      type: "success",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      width: 300,
      dismiss: {
        duration: 2000,
        onScreen: true,
      },
    });
    setTimeout(() => navigate("/login"), 3000);
  };

  const userCreateHandler = async (e) => {
    e.preventDefault();
    if (info.password !== info.passwordConfirm) {
      Store.addNotification({
        title: "Different Passwords!",
        message: "Please enter the same password twice!",
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        width: 300,
        dismiss: {
          duration: 2000,
          onScreen: true,
        },
      });
      return;
    }
    setLoadingState(true);
    try {
      if (file.name) {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "upload");
        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/cyborgsid2/image/upload",
          data
        );
        const { url } = uploadRes.data;
        const createProduct = async () => {
          try {
            const res = await userRequest.post("/auth/register/", {
              ...info,
              img: url,
            });
          } catch {}
        };
        createProduct();
      } else {
        const createProduct = async () => {
          try {
            const res = await userRequest.post("/auth/register/", {
              ...info,
            });
          } catch {}
        };
        createProduct();
      }
      setTimeout(() => {
        setUpPercent(100);
      }, 500);
      setTimeout(() => {
        setLoadingState(false);
      }, 1500);
      setTimeout(() => comfirmCreateHandler(), 1500);
    } catch (error) {
      console.log(error);
      setLoadingState(false);
    }
  };
  return (
    <React.Fragment>
      <ReactNotifications />
      <Navbar />
      <Announcement />
      <Container>
        <Wrapper>
          {loadingState && (
            <LoadingBlock>
              <ProgressCircle>
                <CircularProgressbar
                  styles={buildStyles({
                    textSize: "16px",
                    pathTransitionDuration: 1,
                    pathColor: `rgb(62, 152, 199)`,
                    textColor: "white",
                    trailColor: "#d6d6d6",
                    backgroundColor: "#3e98c7",
                  })}
                  value={upPercent}
                  text={`${upPercent}%`}
                  strokeWidth={5}
                />
              </ProgressCircle>
            </LoadingBlock>
          )}
          <Title>CREATE AN ACCOUNT</Title>
          <ImageBox>
            <Image
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"
              }
              alt=""
            />
            <LabelBox>
              <label htmlFor="file">
                Image:{" "}
                <DriveFolderUploadOutlinedIcon style={{ cursor: "pointer" }} />
              </label>
              <input
                type="file"
                id="file"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </LabelBox>
          </ImageBox>
          <Form onSubmit={userCreateHandler}>
            <Input
              onChange={changeHandler}
              placeholder="username"
              type="text"
              id="username"
              required
            />
            <Input
              onChange={changeHandler}
              placeholder="e-mail"
              type="email"
              id="email"
              required
            />
            <Input
              onChange={changeHandler}
              placeholder="phone no."
              type="text"
              id="phone"
              required
            />
            <Input
              onChange={changeHandler}
              placeholder="city"
              type="text"
              id="city"
              required
            />
            <Input
              onChange={changeHandler}
              type="password"
              id="password"
              placeholder="password"
              required
            />
            <Input
              onChange={changeHandler}
              type="password"
              id="passwordConfirm"
              placeholder="confirm password"
              required
            />
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
