import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";

const Featured = () => {
  const [todaySales, setTodaySales] = useState([]);
  const [sevenDaySales, setSevenDaySales] = useState([]);
  const [lastMonthSales, setLastMonthSales] = useState([]);

  useEffect(() => {
    const getTodayIncome = async () => {
      try {
        userRequest
          .get("/orders/incomeToday")
          .then((res) => res.data)
          .then((data) => setTodaySales(data));
      } catch (err) {}
    };
    const getLast7Days = async () => {
      try {
        userRequest
          .get("/orders/incomeLastWeek")
          .then((res) => res.data)
          .then((data) => setSevenDaySales(data));
      } catch (err) {}
    };
    const getLast30Days = async () => {
      try {
        userRequest
          .get("/orders/incomeLastMonth")
          .then((res) => res.data)
          .then((data) => setLastMonthSales(data));
      } catch (err) {}
    };
    getTodayIncome();
    getLast7Days();
    getLast30Days();
  }, []);

  const kvalue = (num) => {
    return Math.abs(num) > 999
      ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
      : Math.sign(num) * Math.abs(num);
  };

  let percentRound = 0;
  if (todaySales[0]) {
    percentRound = (todaySales[0].total / 2000) * 100;
  }
  let lastweekSalesK,
    lastMonthSalesK,
    target = 2000;
  if (sevenDaySales[0]) {
    lastweekSalesK = kvalue(sevenDaySales[0].total);
  }
  if (lastMonthSales[0]) {
    lastMonthSalesK = kvalue(lastMonthSales[0].total);
  }
  target = kvalue(target);

  return (
    <div className="featured">
      <div className="top">
        <h3 className="title">Total Revenue</h3>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar
            value={percentRound}
            text={`${percentRound?.toFixed(1)}%`}
            strokeWidth={2}
          />
        </div>
        <p className="title">Total sales made today</p>
        <p className="amount">
          $ {todaySales[0] ? todaySales[0].total.toFixed(2) : "0.00"}
        </p>
        <p className="desc">
          Previous transactions pending. Last payments may not be included.
        </p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Target</div>
            <div className="itemResult positive">
              <KeyboardArrowUpIcon fontSize="small" />
              <div className="resultAmount">${target}</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Week</div>
            <div className="itemResult negative">
              <KeyboardArrowDownIcon fontSize="small" />
              <div className="resultAmount">${lastweekSalesK}</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Month</div>
            <div className="itemResult positive">
              <KeyboardArrowUpIcon fontSize="small" />
              <div className="resultAmount">${lastMonthSalesK}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
