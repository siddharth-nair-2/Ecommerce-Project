import { Add, Remove } from "@material-ui/icons";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";
import { publicRequest } from "../requestMethods";
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: auto;
  height: 80vh;
  margin-left: 10%;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: bold;
`;

const Desc = styled.p`
  margin: 20px 0px;
  font-size: 18px;
`;

const Price = styled.span`
  font-weight: bold;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: bold;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border: 2px solid #181733;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 10px;
  font-size: 16px;
  padding: 2px 15px;
  border-radius: 10px;
  ${mobile({ margin: "5px 15px" })}
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid #181733;
  font-weight: bold;
  background-color: #f9c52b;
  color: #181733;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.5s ease;
  &:hover {
    background-color: #d1422c;
    transition: all 0.5s ease;
    color: white;
  }
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

const Product = ({ prodList }) => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});
  const [error, setError] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");

  useEffect(() => {
    const getProduct = async () => {
      try {
        await publicRequest
          .get("/products/find/" + id)
          .then((res) => {
            return res.data;
          })
          .then((data) => {
            return setProduct(data);
          });
      } catch (err) {}
    };
    if (prodList?.length < 1) {
    } else if (prodList?.includes(id)) {
      getProduct();
    } else {
      setProduct({});
      setError(true);
    }
  }, [id, prodList]);

  const quantityHandler = (type) => {
    if (type === "dec" && quantity > 1) {
      setQuantity(quantity - 1);
    }
    if (type === "inc") {
      setQuantity(quantity + 1);
    }
  };

  const cartHandler = () => {
    dispatch(
      addProduct({
        ...product,
        quantity,
        size,
      })
    );
  };

  return (
    <React.Fragment>
      <Navbar />
      <Announcement />
      <Container>
        {!error ? (
          <Wrapper>
            <ImgContainer>
              <Image src={product.img} />
            </ImgContainer>
            <InfoContainer>
              <Title>{product.title}</Title>
              <Desc>{product.desc}</Desc>
              <Price>$ {product.price}</Price>
              <FilterContainer>
                <Filter>
                  <FilterTitle>Size:</FilterTitle>
                  <FilterSize
                    defaultValue={"select"}
                    onChange={(e) => setSize(e.target.value)}
                  >
                    <FilterSizeOption disabled value="select">
                      Select...
                    </FilterSizeOption>
                    {product.size?.map((s) => (
                      <FilterSizeOption key={s}>{s}</FilterSizeOption>
                    ))}
                  </FilterSize>
                </Filter>
              </FilterContainer>
              <AddContainer>
                <AmountContainer>
                  <CartSetter type="add">
                    <Add onClick={() => quantityHandler("inc")} />
                  </CartSetter>
                  <Amount>{quantity}</Amount>
                  <CartSetter>
                    <Remove onClick={() => quantityHandler("dec")} />
                  </CartSetter>
                </AmountContainer>
                <Button onClick={cartHandler}>ADD TO CART</Button>
              </AddContainer>
            </InfoContainer>
          </Wrapper>
        ) : (
          <InfoContainer
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              margin: "100px 0px 50px 0px",
              gap: "40px",
            }}
          >
            <Title style={{ fontSize: "50px" }}>
              This product does not exist!
            </Title>
            <Link to={"/"}>
              <Button style={{ fontSize: "22px" }}>Return to homepage?</Button>
            </Link>
          </InfoContainer>
        )}
      </Container>
      <Newsletter />
      <Footer />
    </React.Fragment>
  );
};

export default Product;
