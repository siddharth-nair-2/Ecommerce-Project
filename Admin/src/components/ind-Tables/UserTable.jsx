import "./userTable.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";
import { useLocation } from "react-router-dom";

const UserTable = () => {
  const [orders, setOrders] = useState([]);
  const [userOrdered, setUserOrdered] = useState([]);
  const location = useLocation();
  const userId = location.pathname.split("/")[2];

  useEffect(() => {
    const orderAndUserInfo = async () => {
      userRequest
        .get(`/orders/find/${userId}`)
        .then((res) => res.data)
        .then((data) => {
          setOrders(data);
        });
    };
    orderAndUserInfo();
  }, [userId]);

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead className="tableHead">
          <TableRow>
            <TableCell className="tableCellHead">Tracking ID</TableCell>
            <TableCell className="tableCellHead">Total Items</TableCell>
            <TableCell className="tableCellHead">Date</TableCell>
            <TableCell className="tableCellHead">Amount</TableCell>
            <TableCell className="tableCellHead">Address</TableCell>
            <TableCell className="tableCellHead">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders?.map((row, index) => {
            const tempUser = userOrdered?.filter(
              (user) => user._id === row.userId
            );
            return (
              <TableRow key={row._id}>
                <TableCell className="tableCell">{row._id}</TableCell>
                <TableCell className="tableCell">
                  {row.products.length}
                </TableCell>
                <TableCell className="tableCell">
                  {row.createdAt.slice(0, 10)}
                </TableCell>
                <TableCell className="tableCell">
                  $ {row.amount?.toFixed(2)}
                </TableCell>
                <TableCell className="tableCell">
                  {row.address &&
                    `${row.address.line1 ? row.address.line1 + ", " : ""}${
                      row.address.line2 ? row.address.line2 + ", " : ""
                    }${row.address.city ? row.address.city + ", " : ""}${
                      row.address.state ? row.address.state + ", " : ""
                    }${row.address.country ? row.address.country + ", " : ""}${
                      row.address.postal_code
                        ? row.address.postal_code + "."
                        : ""
                    }`}
                </TableCell>
                <TableCell className="tableCell">
                  <span className={`status ${row.status}`}>{row.status}</span>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
