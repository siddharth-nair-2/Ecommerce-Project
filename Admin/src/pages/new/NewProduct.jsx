import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import "./newUser.scss";
import styled from "styled-components";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { userRequest } from "../../requestMethods";
import axios from "axios";
import { ReactNotifications, Store } from "react-notifications-component";
import { useNavigate } from "react-router-dom";

const ProgressCircle = styled.div`
  width: 200px;
  height: 200px;
`;

const LoadingBlock = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  background-color: #1a1431d5;
  border-radius: 24px;
`;

const Select = styled.select`
  width: 100%;
  padding: 5px;
  border: none;
  border-bottom: 1px solid gray;
  outline: none;
`;

const Option = styled.option`
  width: 100%;
  padding: 15px;
  border-bottom: 1px solid gray;
  outline: none;
`;

const NewProduct = ({ title, inputs }) => {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const [categories, setCategories] = useState([]);
  const [size, setSize] = useState([]);
  const [upPercent, setUpPercent] = useState(0);
  const [loadingState, setLoadingState] = useState(false);
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const catHandler = (e) => {
    setCategories(e.target.value.split(","));
  };
  const sizeHandler = (e) => {
    setSize(e.target.value.split(","));
  };
  const comfirmCreateHandler = () => {
    Store.addNotification({
      title: "Product Created!",
      message: "This product has been created!",
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
    setTimeout(() => navigate("/products"), 3000);
  };

  const productCreateHandler = async (e) => {
    e.preventDefault();
    if (
      !file.name ||
      !info.desc ||
      !info.inStock ||
      !info.price ||
      !info.title ||
      categories.length < 1 ||
      size.length < 1
    ) {
      Store.addNotification({
        title: "No Image!",
        message:
          "Please add all values to the create form, including an image!",
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
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/cyborgsid2/image/upload",
        data
      );

      const { url } = uploadRes.data;
      const createProduct = async () => {
        try {
          const res = await userRequest.post("/products/", {
            ...info,
            img: url,
            categories: categories,
            size: size,
          });
        } catch {}
      };
      createProduct();
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
    <div className="createUser-new">
      <ReactNotifications />
      <Sidebar />
      <div className="createUser-newContainer">
        <Navbar />
        <div className="createUser-top">
          <h1>{title}</h1>
        </div>
        <div className="createUser-bottom">
          {loadingState && (
            <LoadingBlock>
              <ProgressCircle>
                <CircularProgressbar
                  styles={buildStyles({
                    strokeLinecap: "butt",
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
          <div className="createUser-left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"
              }
              alt=""
            />
          </div>
          <div className="createUser-right">
            <form className="createUser-form">
              <div className="createUser-formInput">
                <label htmlFor="file">
                  Image:{" "}
                  <DriveFolderUploadOutlinedIcon
                    className="createUser-icon"
                    style={{ cursor: "pointer" }}
                  />
                </label>
                <input
                  type="file"
                  id="file"
                  style={{ display: "none" }}
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
              {inputs.map((input) => (
                <div className="createUser-formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    onChange={changeHandler}
                    type={input.type}
                    placeholder={input.placeholder}
                    id={input.id}
                    required
                  />
                </div>
              ))}
              <div className="createUser-formInput">
                <label>Categories:</label>
                <input
                  onChange={catHandler}
                  type="text"
                  id="categories"
                  placeholder="women,shorts,22-23"
                />
              </div>
              <div className="createUser-formInput">
                <label>Sizes:</label>
                <input
                  onChange={sizeHandler}
                  type="text"
                  id="size"
                  placeholder="L,XL,M"
                />
              </div>
              <div className="createUser-formInput">
                <label>In Stock:</label>
                <Select
                  id="inStock"
                  defaultValue={"Select..."}
                  onChange={changeHandler}
                >
                  <Option disabled="disabled">Select...</Option>
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </div>

              <button onClick={productCreateHandler}>Create!</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
