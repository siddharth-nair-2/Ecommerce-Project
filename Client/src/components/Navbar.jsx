import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  height: 80px;
  ${mobile({ height: "50px" })}
  background-color: #181733;
`;

const Wrapper = styled.div`
  padding: 20px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  color: white;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  background-color: white;
`;

const Input = styled.input`
  border: none;
  height: 25px;
  padding-left: 10px;
  width: 200px;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogoImage = styled.img`
  height: 40px;
  width: auto;
  ${mobile({ height: "30px", width: "auto" })}
`;
const Logo = styled.h1`
  font-weight: bold;
  color: white;
  ${mobile({ display: "none" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  ${mobile({ flex: 1, justifyContent: "left" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  color: white;
  cursor: pointer;
  margin-left: 25px;
  display: flex;
  ${mobile({ fontSize: "10px", marginLeft: "0px", paddingRight: "8px" })}
`;

const Navbar = () => {
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search
              style={{
                color: "gray",
                fontSize: 16,
                cursor: "pointer",
                padding: "0px 5px"
              }}
            />
          </SearchContainer>
        </Left>
        <Center>
          <LogoImage
            src="https://i.postimg.cc/d0YqKLY1/Barcelona-logo-removebg-preview-1.png"
            alt="fcb logo"
          />
          <Logo>FC BARCELONA</Logo>
        </Center>
        <Right>
          <MenuItem>REGISTER</MenuItem>
          <MenuItem>SIGN IN</MenuItem>
          <MenuItem>
            <Badge badgeContent={4} color="primary">
              <ShoppingCartOutlined style={{ color: "white" }} />
            </Badge>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
