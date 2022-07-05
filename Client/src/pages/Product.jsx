import { Add, Remove } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";

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
  margin-left: 20%;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
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

const Product = () => {
  return (
    <React.Fragment>
      <Navbar />
      <Announcement />
      <Container>
        <Wrapper>
          <ImgContainer>
            <Image src="https://i.postimg.cc/MHbjRdYg/700x1060-BLMP0007401705-1-removebg-preview.png" />
          </ImgContainer>
          <InfoContainer>
            <Title>FC Barcelona Captain’s Shirt</Title>
            <Desc>
              Short sleeve shirt with captain’s armband. This product pays
              tribute to players like Joaquim Rifé, Johan Cruyff, José Mari
              Bakero, Pep Guardiola, Carles Puyol, Xavi Hernández, Andrés
              Iniesta and Lionel Messi, who have sported the FC Barcelona
              captain’s armband throughout our club’s long history.
            </Desc>
            <Price>$ 69.99</Price>
            <FilterContainer>
              <Filter>
                <FilterTitle>Size</FilterTitle>
                <FilterSize>
                  <FilterSizeOption>XS</FilterSizeOption>
                  <FilterSizeOption>S</FilterSizeOption>
                  <FilterSizeOption>M</FilterSizeOption>
                  <FilterSizeOption>L</FilterSizeOption>
                  <FilterSizeOption>XL</FilterSizeOption>
                </FilterSize>
              </Filter>
            </FilterContainer>
            <AddContainer>
              <AmountContainer>
                <CartSetter type="add">
                  <Add />
                </CartSetter>
                <Amount>1</Amount>
                <CartSetter>
                  <Remove />
                </CartSetter>
              </AmountContainer>
              <Button>ADD TO CART</Button>
            </AddContainer>
          </InfoContainer>
        </Wrapper>
      </Container>
      <Newsletter />
      <Footer />
    </React.Fragment>
  );
};

export default Product;
