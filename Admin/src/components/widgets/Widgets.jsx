import "./widgets.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";
import { Link } from "react-router-dom";

// WORKING ON ORDER VALUE FROM API

const Widgets = ({ type }) => {
  let data;

  const [userCount, setUserCount] = useState([]);
  const [userCountToday, setUserCountToday] = useState([]);
  const [orderCount, setOrderCount] = useState([]);
  const [orderCountToday, setOrderCountToday] = useState([]);
  const [totalEarnings, setTotalEarnings] = useState([]);
  const [todayEarnings, setTodayEarnings] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        userRequest
          .get("/users/userCount")
          .then((res) => res.data)
          .then((data) => setUserCount(data));
      } catch (err) {}
    };
    const getUsersToday = async () => {
      try {
        userRequest
          .get("/users/userCountToday")
          .then((res) => res.data)
          .then((data) => setUserCountToday(data));
      } catch (err) {}
    };
    getUsers();
    getUsersToday();
  }, []);

  useEffect(() => {
    const getOrders = async () => {
      try {
        userRequest
          .get("/orders/orderCount")
          .then((res) => res.data)
          .then((data) => setOrderCount(data));
      } catch (err) {}
    };
    const getOrdersToday = async () => {
      try {
        userRequest
          .get("/orders/orderCountToday")
          .then((res) => res.data)
          .then((data) => setOrderCountToday(data));
      } catch (err) {}
    };
    getOrders();
    getOrdersToday();
  }, []);

  useEffect(() => {
    const getTotalEarnings = async () => {
      try {
        userRequest
          .get("/orders/incomeAllTime")
          .then((res) => res.data)
          .then((data) => setTotalEarnings(data));
      } catch (err) {}
    };
    const getTodayIncome = async () => {
      try {
        userRequest
          .get("/orders/incomeToday")
          .then((res) => res.data)
          .then((data) => setTodayEarnings(data));
      } catch (err) {}
    };
    getTodayIncome();
    getTotalEarnings();
  }, []);

  const amount = 153;
  const diff = 0.0;
  let earnDiff, orderDiff, userDiff;
  if (todayEarnings[0] && totalEarnings[0]) {
    earnDiff = (
      (todayEarnings[0].total / totalEarnings[0].total) *
      100
    ).toFixed(2);
  }
  if (orderCountToday[0] && orderCount[0]) {
    orderDiff = (
      (orderCountToday[0].all_orders / orderCount[0].all_orders) *
      100
    ).toFixed(2);
  }
  if (userCountToday[0] && userCount[0]) {
    userDiff = (
      (userCountToday[0].all_users / userCount[0].all_users) *
      100
    ).toFixed(2);
  }
  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        value: userCount[0] && userCount[0].all_users,
        link: (
          <Link style={{ textDecoration: "none" }} to="/users">
            See all users
          </Link>
        ),
        diff: userDiff,
        class:
          userDiff >= 0.01
            ? { class: "positive", logo: <KeyboardArrowUpIcon /> }
            : { class: "", logo: "- " },
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{ color: "crimson", backgroundColor: "rgba(255, 0, 0, 0.2" }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "ORDERS",
        isMoney: false,
        value: orderCount[0] && orderCount[0].all_orders,
        link: (
          <Link style={{ textDecoration: "none" }} to="/orders">
            See all orders
          </Link>
        ),
        diff: orderDiff,
        class:
          orderDiff >= 0.01
            ? { class: "positive", logo: <KeyboardArrowUpIcon /> }
            : { class: "", logo: "- " },
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              color: "goldenrod",
              backgroundColor: "rgba(218, 165, 32, 0.2",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "EARNINGS",
        isMoney: true,
        value: totalEarnings[0] && totalEarnings[0].total.toFixed(2),
        link: "View all stats",
        diff: earnDiff,
        class:
          earnDiff >= 0.01
            ? { class: "positive", logo: <KeyboardArrowUpIcon /> }
            : { class: "", logo: "- " },
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ color: "green", backgroundColor: "rgba(0, 128, 0, 0.2" }}
          />
        ),
      };
      break;
    case "balance":
      data = {
        title: "BALANCE",
        isMoney: true,
        value: amount,
        link: "See details",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              color: "purple",
              backgroundColor: "rgba(128, 0, 128, 0.2",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} {data.value}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className={`percentage ${data.class.class}`}>
          {data.class.logo}
          {data.diff ? data.diff : diff.toFixed(2)}%
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widgets;
