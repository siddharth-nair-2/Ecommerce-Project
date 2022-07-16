import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";

const RegularTable = () => {
  const [orders, setOrders] = useState([]);
  const [userOrdered, setUserOrdered] = useState([]);

  useEffect(() => {
    const orderAndUserInfo = async () => {
      userRequest
        .get("/orders/findAll?new=true")
        .then((res) => res.data)
        .then((data) => {
          setOrders(data);
          data?.map((order) =>
            userRequest
              .get(`/users/find/${order.userId}`)
              .then((res) => res.data)
              .then((data) => setUserOrdered((oldArr) => [data, ...oldArr]))
          );
        });
    };
    orderAndUserInfo();
  }, []);

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead className="tableHead">
          <TableRow>
            <TableCell className="tableCellHead">Tracking ID</TableCell>
            <TableCell className="tableCellHead">Customer</TableCell>
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
                  {tempUser[0] && (
                    <div
                      className="cellWithImg"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <img
                        className="cellImg"
                        src={tempUser[0].img}
                        alt="avatar"
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "50%",
                          objectFit: "cover",
                          marginRight: "20px",
                          objectPosition: "top",
                        }}
                      />
                      {tempUser[0].username}
                    </div>
                  )}
                </TableCell>
                <TableCell className="tableCell">
                  {row.createdAt.slice(0, 10)}
                </TableCell>
                <TableCell className="tableCell">$ {row.amount.toFixed(2)}</TableCell>
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

export default RegularTable;
