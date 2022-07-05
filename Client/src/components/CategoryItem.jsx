import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${mobile({ height: "20vh" })}
`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.7);
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background-color: transparent;
    transition: all 0.5s ease;
  }
`;

const Title = styled.h1`
  color: white;
`;

const Button = styled.button`
  border: none;
  padding: 10px;
  background-color: white;
  color: black;
  cursor: pointer;
  font-weight: bolder;
  border: 1px solid black;
  font-size: 16px;
  margin-bottom: 20px;
`;

const CategoryItem = ({ item }) => {
  return (
    <Container>
      <Image src={item.img} />
      <Info>
        <Button>SHOP NOW</Button>
        <Title>{item.title}</Title>
      </Info>
    </Container>
  );
};

export default CategoryItem;
