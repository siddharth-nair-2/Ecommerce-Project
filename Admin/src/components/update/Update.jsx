import React, { useState } from "react";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import "./update.scss";

// WORKING ON UPDATE FORM - PLAN TO SWITCH TO STYLED COMPONENTS TO OFFER MORE CUSTOMIZABILITY

const Update = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});

  const changeHandler = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="update-new">
      <div className="update-newContainer">
        <div className="update-bottom">
          <h1>{title}</h1>
          <div className="update-left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"
              }
              alt=""
            />
          </div>
          <div className="update-right">
            <form>
              <div className="update-formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="update-icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  style={{ display: "none" }}
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
              {inputs.map((input) => (
                <div className="update-formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    onChange={changeHandler}
                    type={input.type}
                    placeholder={input.placeholder}
                    id={input.id}
                  />
                </div>
              ))}
              <button onClick={submitHandler}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Update;
