import styled from "styled-components";

const Container = styled.div`
  height: 40px;
  background-color: #f9c52b;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
`;

const Announcement = () => {
  return <Container>Super Deal! Free Shipping on Orders Over $50</Container>;
};

export default Announcement;
