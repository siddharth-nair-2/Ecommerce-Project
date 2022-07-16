import "./orderTable.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const OrderTable = ({ orderInfo }) => {
  let product = [];
  const totalProducts = orderInfo.products.length;
  const allProducts = useSelector((state) => state.product.products);

  for (let i = 0; i < totalProducts; i++) {
    product[i] = allProducts.find(
      (prod) => prod._id === orderInfo.products[i].productId
    );
  }

  // console.log(product);
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead className="tableHead">
          <TableRow>
            <TableCell className="tableCellHead">Product ID</TableCell>
            <TableCell className="tableCellHead">Product Information</TableCell>
            <TableCell className="tableCellHead">Quantity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderInfo.products?.map((row, index) => {
            return (
              <TableRow key={row._id}>
                <TableCell className="tableCell">{row.productId}</TableCell>
                <TableCell className="tableCell">
                  {
                    <div
                      className="cellWithImg"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <img
                        className="cellImg"
                        src={product[index].img}
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
                      {product[index].title}
                    </div>
                  }
                </TableCell>
                <TableCell className="tableCell">{row.quantity}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderTable;
