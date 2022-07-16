import React, { useEffect, useMemo, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Chart from "../../components/chart/Chart";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import "./single.scss";
import { useLocation, useNavigate } from "react-router-dom";
import "./update.scss";
import { useSelector } from "react-redux";
import { userRequest } from "../../requestMethods";
import styled from "styled-components";
import { ReactNotifications } from "react-notifications-component";
import { Store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import axios from "axios";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import UserTable from "../../components/ind-Tables/UserTable";

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

const Update = ({ title, userInfo }) => {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const [upPercent, setUpPercent] = useState(0);
  const [loadingState, setLoadingState] = useState(false);
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const confirmUpdateHandler = () => {
    Store.addNotification({
      title: "User Updated!",
      message: "This user has been updated!",
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
    setTimeout(() => navigate("/users"), 3000);
  };

  const userUpdateHandler = async (e) => {
    e.preventDefault();
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
        const updateUserWithImg = async () => {
          try {
            const res = await userRequest.put(`/users/${userInfo._id}`, {
              ...info,
              img: url,
            });
          } catch {}
        };
        updateUserWithImg();
      } else {
        const updateUserWithoutImg = async () => {
          try {
            const res = await userRequest.put(`/users/${userInfo._id}`, {
              ...info,
            });
          } catch {}
        };
        updateUserWithoutImg();
      }
      setUpPercent(100);
      setTimeout(() => setLoadingState(false), 1000);
      setTimeout(() => confirmUpdateHandler(), 1000);
    } catch (error) {
      console.log(error);
      setLoadingState(false);
    }
  };

  return (
    <div className="update-new">
      <div className="update-newContainer">
        <div className="update-bottom">
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
          <h1>{title}</h1>
          <div className="update-left">
            {userInfo.img && (
              <img
                src={file ? URL.createObjectURL(file) : userInfo.img}
                alt=""
              />
            )}
          </div>
          <div className="update-right">
            <form className="update-form">
              <div className="update-formInput">
                <label htmlFor="file">
                  Image:{" "}
                  <DriveFolderUploadOutlinedIcon className="update-icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  style={{ display: "none" }}
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
              <div className="update-formInput">
                <label>Username:</label>
                <input
                  onChange={changeHandler}
                  type="text"
                  id="username"
                  defaultValue={userInfo.username}
                />
              </div>
              <div className="update-formInput">
                <label>E-mail:</label>
                <input
                  onChange={changeHandler}
                  type="email"
                  id="email"
                  defaultValue={userInfo.email}
                />
              </div>
              <div className="update-formInput">
                <label>City:</label>
                <input
                  onChange={changeHandler}
                  type="text"
                  id="city"
                  defaultValue={userInfo.city}
                />
              </div>
              <div className="update-formInput">
                <label>Phone:</label>
                <input
                  onChange={changeHandler}
                  type="text"
                  id="phone"
                  defaultValue={userInfo.phone}
                />
              </div>
              <div className="update-formInput">
                <label>Is Admin:</label>
                <Select
                  id="isAdmin"
                  onChange={changeHandler}
                  defaultValue={userInfo.isAdmin}
                >
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </div>

              <button onClick={userUpdateHandler}>Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const Single = () => {
  const location = useLocation();
  const userId = location.pathname.split("/")[2];
  const [showEdit, setShowEdit] = useState(false);
  const [userStats, setUserStats] = useState([]);
  const user = useSelector((state) =>
    state.allUsers.allUsers.find((user) => user._id === userId)
  );
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );
  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("/orders/income?uid=" + userId);
        res.data.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch (err) {}
    };
    getStats();
  }, [MONTHS, userId]);

  const editButtonToggle = (e) => {
    setShowEdit(!showEdit);
  };
  return (
    <div className="single">
      <ReactNotifications />
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton" onClick={editButtonToggle}>
              EDIT
            </div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img src={user.img} alt="" className="itemImg" />
              <div className="details">
                <h1 className="itemTitle">{user.username}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email: </span>
                  <span className="itemValue">{user.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone: </span>
                  <span className="itemValue">{user.phone}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">City: </span>
                  <span className="itemValue">{user.city}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Admin: </span>
                  <span className="itemValue">
                    {user.isAdmin ? "Yes" : "No"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart
              aspect={5 / 1}
              title="User Spending (Last 6 Months)"
              dataInfo={userStats}
              dataKey="Sales"
            />
          </div>
        </div>
        {showEdit && <Update title="Update Product" userInfo={user} />}
        <div className="bottom">
          <h1 className="title">Recent Transactions</h1>
          <UserTable />
        </div>
      </div>
    </div>
  );
};

export default Single;
