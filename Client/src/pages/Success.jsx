import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { userRequest } from "../requestMethods";
import { cartEmpty } from "../redux/apiCalls";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 99vw;
  height: 98vh;
  flex-direction: column;
`;

const SuccessText = styled.h1`
  text-align: center;
  border-radius: 12px;
  font-family: "Lucida Sans", "Lucida Sans Regular", Verdana, sans-serif;
  background-color: #377c80;
  color: white;
  padding: 10px 20px;
`;
const SuccessPara = styled.p`
  margin: 40px 0px;
  text-align: center;
  font-family: "Lucida Sans", "Lucida Sans Regular", Verdana, sans-serif;
  color: black;
  font-size: 20px;
  max-width: 27%;
`;

const Success = () => {
  const location = useLocation();
  //in Cart.jsx I sent data and cart. Please check that page for the changes.(in video it's only data)
  const data = location.state.data;
  const cart = location.state.products;
  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);
  const dispatchCartEmpty = useDispatch();

  useEffect(() => {
    const logoutHandler = () => {
      cartEmpty(dispatchCartEmpty);
    };
    logoutHandler();
  }, []);

  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await userRequest.post("/orders", {
          userId: currentUser._id,
          products: cart.products.map((item) => ({
            productId: item._id,
            quantity: item.quantity,
          })),
          amount: cart.total,
          address: data.billing_details.address,
        });
        setOrderId(res.data._id);
      } catch {}
    };
    data && createOrder();
  }, [cart, data, currentUser]);

  return (
    <Container>
      <SuccessText>Successful</SuccessText>
      <SuccessPara>
        {orderId
          ? `Order has been created successfully. Your order number is ${orderId}`
          : `Successfull. Your order is being prepared...`}
      </SuccessPara>
      <Link to={"/"} style={{ textDecoration: "none" }}>
        <SuccessText>Go to Homepage</SuccessText>
      </Link>
    </Container>
  );
};

export default Success;
