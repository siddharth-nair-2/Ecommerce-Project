import "./dataTable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useEffect } from "react";
import { userRequest } from "../../requestMethods";
import { useDispatch } from "react-redux";
import { getProducts, getUsers, getOrders } from "../../redux/apiCalls";

const DataTable = ({ columns, title }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState([]);
  const { data, loading, error } = useFetch(`/${path}/findAll`);
  const dispatch = useDispatch();

  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);

  useEffect(() => {
    getOrders(dispatch);
  }, [dispatch]);
  
  useEffect(() => {
    setList(data);
  }, [data]);
  const handleDelete = async (id) => {
    try {
      await userRequest.delete(`/${path}/${id}`);
      setList(list.filter((item) => item._id !== id));
    } catch (err) {}
  };
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 160,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/${path}/${params.row._id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        {title}
        {title !== "All Orders" && (
          <Link to={`/${path}/new`} className="link">
            Add New
          </Link>
        )}
      </div>
      <DataGrid
        className="datagrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default DataTable;
