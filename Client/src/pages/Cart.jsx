import { Add, Remove, DeleteForever } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { useState } from "react";
import { useEffect } from "react";
import { userRequest } from "../requestMethods";
import { Link, useNavigate } from "react-router-dom";
import {
  addSingleProduct,
  emptyCart,
  removeProduct,
  removeSingleProduct,
} from "../redux/cartRedux";

const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  background-color: ${(props) =>
    props.type === "filled" ? "#f9c52b" : "transparent"};
  transition: all 0.3s ease;
  cursor: pointer;
  &:hover {
    background-color: ${(props) =>
      props.type === "filled" ? "#d1422c" : "transparent"};
    transition: all 0.3s ease;
    color: ${(props) => (props.type === "filled" ? "white" : "black")};
  }
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  ${mobile({ margin: "15px 0px" })}
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 10px;
  border: 2px solid black;
  padding: 2px 25px;
  border-radius: 10px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 700;
  ${mobile({ marginBottom: "20px" })}
`;

const CartSetter = styled.div`
  border-radius: 50%;
  color: ${(props) => (props.type === "add" ? "#1ab91a" : "red")};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    transition: all 0.3s ease;
    transform: scale(1.2);
  }
`;

const Hr = styled.hr`
  background-color: #cecaca;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 700;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "700"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  color: black;
  font-weight: 600;
  background-color: #f9c52b;
  transition: all 0.3s ease;
  cursor: pointer;
  &:hover {
    background-color: #d1422c;
    transition: all 0.3s ease;
    color: white;
  }
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);

  const noUserCheckoutHandler = () => {
    if (cart.total < 1) alert("Please add something to the cart to checkout!");
    else if (!user) alert("Please login/register to checkout!");
  };

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          token: stripeToken.id,
          amount: cart.total?.toFixed(2) * 100,
        });
        navigate("/success", { state: { data: res.data, products: cart } });
      } catch (err) {}
    };
    stripeToken && cart.total >= 1 && makeRequest();
  }, [stripeToken, cart.total, navigate, cart]);

  const quantityHandler = (type, product) => {
    if (type === "dec" && product.quantity > 1) {
      dispatch(
        removeSingleProduct({
          ...product,
        })
      );
    }
    if (type === "inc") {
      dispatch(
        addSingleProduct({
          ...product,
        })
      );
    }
    if (type === "removeItem") {
      dispatch(
        removeProduct({
          ...product,
        })
      );
    }
  };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <Link to={"/products/all"}>
            <TopButton>CONTINUE SHOPPING</TopButton>
          </Link>
          <TopTexts>
            <TopText>Shopping Bag({cart.quantity})</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          {user && cart.total >= 1 ? (
            <StripeCheckout
              name="FootyShop"
              image="https://i.postimg.cc/ZK32fPq2/15-158518-fc-barcelona-soccer-ball-hd-png-download-removebg-preview.png"
              billingAddress
              shippingAddress
              description={`Your total is $${cart.total.toFixed(2)}`}
              amount={cart.total.toFixed(2) * 100}
              token={onToken}
              stripeKey={KEY}
            >
              <TopButton type="filled">CHECKOUT NOW</TopButton>
            </StripeCheckout>
          ) : (
            <TopButton onClick={noUserCheckoutHandler} type="filled">
              CHECKOUT NOW
            </TopButton>
          )}
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((product) => (
              <React.Fragment key={`${product._id}${product.size}`}>
                <Product>
                  <ProductDetail>
                    <Image src={product.img} />
                    <Details>
                      <ProductName>
                        <b>Product:</b> {product.title}
                      </ProductName>
                      <ProductId>
                        <b>ID:</b> {product._id}
                      </ProductId>
                      <ProductSize>
                        <b>Size:</b> {product.size}
                      </ProductSize>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductAmountContainer>
                      <CartSetter type="add">
                        <Add onClick={() => quantityHandler("inc", product)} />
                      </CartSetter>
                      <ProductAmount>{product.quantity}</ProductAmount>
                      <CartSetter>
                        <Remove
                          onClick={() => quantityHandler("dec", product)}
                        />
                      </CartSetter>
                    </ProductAmountContainer>
                    <ProductPrice>
                      $ {(product.price * product.quantity).toFixed(2)}
                    </ProductPrice>
                    <DeleteForever
                      onClick={() => quantityHandler("removeItem", product)}
                      style={{
                        marginTop: "20px",
                        color: "red",
                        cursor: "pointer",
                        width: "30",
                        height: "30",
                      }}
                    />
                  </PriceDetail>
                </Product>
                <Hr />
              </React.Fragment>
            ))}
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>
                $ {cart.total <= 0.0 ? "0.00" : cart.total?.toFixed(2)}
              </SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>
                $ {cart.total <= 0.0 ? "0.00" : cart.total?.toFixed(2)}
              </SummaryItemPrice>
            </SummaryItem>
            {user && cart.total >= 1 ? (
              <StripeCheckout
                name="FootyShop"
                image="https://i.postimg.cc/ZK32fPq2/15-158518-fc-barcelona-soccer-ball-hd-png-download-removebg-preview.png"
                billingAddress
                shippingAddress
                description={`Your total is $${cart.total.toFixed(2)}`}
                amount={cart.total.toFixed(2) * 100}
                token={onToken}
                stripeKey={KEY}
              >
                <Button>CHECKOUT NOW</Button>
              </StripeCheckout>
            ) : (
              <Button onClick={noUserCheckoutHandler}>CHECKOUT NOW</Button>
            )}
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
