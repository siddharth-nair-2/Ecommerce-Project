import {
  Facebook,
  Instagram,
  Twitter,
} from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  background-color: #181733;
  color: white;
  padding: 0px 50px;
  ${mobile({ flexDirection: "column", padding: "0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1``;

const Desc = styled.p`
  margin: 20px 0px;
  text-align: justify;
  text-justify: inter-word;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-left: 15px;
  background-color: white;
  color: black;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  ${mobile({ margin: "0px 15px 0px 0px" })}
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })}
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  ${mobile({ alignItems: "flex-start" })}
`;


const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>FC Barcelona</Logo>
        <Desc>
          Respect for others is one of the basic requirements of democratic life
          and the capacity to live in society. It affects the individual and has
          both a social and a collective dimension. Respect is a fundamental
          part of sport, for sport generates situations of tension that have to
          be resolved almost instantaneously.
        </Desc>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>Cart</ListItem>
          <ListItem>Man Fashion</ListItem>
          <ListItem>Woman Fashion</ListItem>
          <ListItem>Accessories</ListItem>
          <ListItem>My Account</ListItem>
          <ListItem>Order Tracking</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Terms</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Follow Barça</Title>
        <SocialContainer>
            <SocialIcon>
              <Facebook />
            </SocialIcon>
            <SocialIcon>
              <Instagram />
            </SocialIcon>
            <SocialIcon>
              <Twitter />
            </SocialIcon>
        </SocialContainer>
      </Right>
    </Container>
  );
};

export default Footer;
