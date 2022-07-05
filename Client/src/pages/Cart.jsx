import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";

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
  color: ${(props) =>
    props.type === "add" ? "#1ab91a" : "red"};
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
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Shopping Bag(2)</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          <TopButton type="filled">CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
            <Product>
              <ProductDetail>
                <Image src="https://i.postimg.cc/8CTLJYxV/700x1060-BLMP0007401705-3-removebg-preview.png" />
                <Details>
                  <ProductName>
                    <b>Product:</b> FC Barcelona Captain’s Shirt
                  </ProductName>
                  <ProductId>
                    <b>ID:</b> 93813718293
                  </ProductId>
                  <ProductSize>
                    <b>Size:</b> 37.5
                  </ProductSize>
                </Details>
              </ProductDetail>
              <PriceDetail>
                <ProductAmountContainer>
                  <CartSetter type="add">
                    <Add/>
                  </CartSetter>
                  <ProductAmount>2</ProductAmount>
                  <CartSetter>
                    <Remove/>
                  </CartSetter>
                </ProductAmountContainer>
                <ProductPrice>$ 65.00</ProductPrice>
              </PriceDetail>
            </Product>
            <Hr />
            <Product>
              <ProductDetail>
                <Image src="https://i.postimg.cc/W44hPcQt/700x1060-DN4027-451-S-1-removebg-preview.png" />
                <Details>
                  <ProductName>
                    <b>Product:</b> FC Barcelona Pre-Match Shirt 22/23 – LFP –
                    Women
                  </ProductName>
                  <ProductId>
                    <b>ID:</b> 93813718293
                  </ProductId>
                  <ProductSize>
                    <b>Size:</b> M
                  </ProductSize>
                </Details>
              </ProductDetail>
              <PriceDetail>
                <ProductAmountContainer>
                  <CartSetter type="add">
                    <Add/>
                  </CartSetter>
                  <ProductAmount>1</ProductAmount>
                  <CartSetter>
                    <Remove/>
                  </CartSetter>
                </ProductAmountContainer>
                <ProductPrice>$ 59.99</ProductPrice>
              </PriceDetail>
            </Product>
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ 80</SummaryItemPrice>
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
              <SummaryItemPrice>$ 80</SummaryItemPrice>
            </SummaryItem>
            <Button>CHECKOUT NOW</Button>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
