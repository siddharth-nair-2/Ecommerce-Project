import React from "react";
import DataTable from "../../components/datatable/DataTable";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./list.scss";

const List = ({columns, title}) => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <DataTable columns={columns} title={title}/>
      </div>
    </div>
  );
};

export default List;
