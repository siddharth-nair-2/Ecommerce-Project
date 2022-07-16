import React, { useEffect, useMemo, useState } from "react";
import Chart from "../../components/chart/Chart";
import Featured from "../../components/featured/Featured";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import RegularTable from "../../components/table/Table";
import Widgets from "../../components/widgets/Widgets";
import { userRequest } from "../../requestMethods";
import { useNavigate } from "react-router-dom";
import "./home.scss";

const Home = () => {
  const [incomeStats, setIncomeStats] = useState([]);
  const navigate = useNavigate();
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
        const res = await userRequest.get("/orders/income");
        res.data.map((item) =>
          setIncomeStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Total: item.total },
          ])
        );
      } catch (err) {}
    };
    getStats();
    navigate("/");
  }, [MONTHS, navigate]);

  // console.log(incomeStats);
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widgets type="user" />
          <Widgets type="order" />
          <Widgets type="earning" />
          {/* <Widgets type="balance" /> */}
        </div>
        <div className="charts">
          <Featured />
          <Chart
            aspect={3 / 1}
            title="Last 6 Months (Revenue)"
            dataInfo={incomeStats}
          />
        </div>
        <div className="listContainer">
          <h3 className="listTitle">Latest Transactions</h3>
          <RegularTable />
        </div>
      </div>
    </div>
  );
};

export default Home;
