import React, { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./singleorder.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import OrderTable from "../../components/ind-Tables/OrderTable";
import { ReactNotifications, Store } from "react-notifications-component";
import styled from "styled-components";
import { userRequest } from "../../requestMethods";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";

const ProgressCircle = styled.div`
  width: 100px;
  height: 100px;
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
  width: 50%;
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

const Update = ({ title, orderInfo }) => {
  const [info, setInfo] = useState({});
  const [upPercent, setUpPercent] = useState(0);
  const [loadingState, setLoadingState] = useState(false);
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const confirmUpdateHandler = () => {
    Store.addNotification({
      title: "Order Updated!",
      message: "This Order has been updated!",
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
    setTimeout(() => navigate("/orders"), 3000);
  };

  const orderUpdateHandler = async (e) => {
    e.preventDefault();
    setLoadingState(true);
    const updateOrder = async () => {
      try {
        const res = await userRequest.put(`/orders/${orderInfo._id}`, {
          ...info,
        });
      } catch {}
    };
    updateOrder();
    setUpPercent(100);
    setTimeout(() => setLoadingState(false), 1000);
    setTimeout(() => confirmUpdateHandler(), 1000);
  };

  return (
    <div className="update-new">
      <div className="update-newContainer">
        <div
          className="update-bottom"
          style={{ display: "flex", flexDirection: "column" }}
        >
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
          <div className="update-right">
            <form
              className="update-form"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                margin: "20px",
              }}
            >
              <div className="update-formInput">
                <label>Status:</label>
                <Select
                  id="status"
                  onChange={changeHandler}
                  defaultValue={orderInfo.status}
                >
                  <Option value="pending">Pending</Option>
                  <Option value="approved">Approved</Option>
                </Select>
              </div>
              <button onClick={orderUpdateHandler}>Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const SingleOrder = () => {
  const location = useLocation();
  const orderId = location.pathname.split("/")[2];
  const [showEdit, setShowEdit] = useState(false);
  const order = useSelector((state) =>
    state.order.orders.find((order) => order._id === orderId)
  );
  const orderUser = useSelector((state) =>
    state.allUsers.allUsers.find((user) => user._id === order.userId)
  );

  const orderAddress = order.address
    ? `${order.address.line1 ? order.address.line1 + ", " : ""}${
        order.address.line2 ? order.address.line2 + ", " : ""
      }${order.address.city ? order.address.city + ", " : ""}${
        order.address.state ? order.address.state + ", " : ""
      }${order.address.country ? order.address.country + ", " : ""}${
        order.address.postal_code ? order.address.postal_code + "." : ""
      }`
    : "";
  const editButtonToggle = (e) => {
    setShowEdit(!showEdit);
  };
  return (
    <div className="order-single">
      <ReactNotifications />
      <Sidebar />
      <div className="order-singleContainer">
        <Navbar />
        <div className="order-top">
          <div className="order-left">
            <div className="order-editButton" onClick={editButtonToggle}>
              EDIT
            </div>
            <h1 className="order-title">Information</h1>
            <div className="order-item">
              <img src={orderUser.img} alt="" className="order-itemImg" />{" "}
              <div className="order-details">
                <h2 className="order-itemTitle">
                  Customer: {orderUser.username}
                </h2>
                <div className="order-detailItem">
                  <span className="order-itemKey">Order ID: </span>
                  <span className="order-itemValue">{order._id}</span>
                </div>
                <div className="order-detailItem">
                  <span className="order-itemKey">Customer E-mail: </span>
                  <span className="order-itemValue">{orderUser.email}</span>
                </div>
                <div className="order-detailItem">
                  <span className="order-itemKey">Phone: </span>
                  <span className="order-itemValue">{orderUser.phone}</span>
                </div>
                <div className="order-detailItem">
                  <span className="order-itemKey">Order Address: </span>
                  <span className="order-itemValue">{orderAddress}</span>
                </div>
                <div className="order-detailItem">
                  <span className="order-itemKey">Order Date: </span>
                  <span className="order-itemValue">
                    {order.createdAt.slice(0, 10)}
                  </span>
                </div>
                <div className="order-detailItem">
                  <span className="order-itemKey">Status: </span>
                  <span className="order-itemValue">
                    {order.status.charAt(0).toUpperCase() +
                      order.status.substring(1).toLowerCase()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {showEdit && <Update title="Update Product" orderInfo={order} />}
        <div className="order-bottom">
          <h1 className="order-title">Order Details</h1>
          <OrderTable orderInfo={order} />
        </div>
      </div>
    </div>
  );
};

export default SingleOrder;
