import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import React, { Fragment } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import { logout } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import MenuSharpIcon from "@mui/icons-material/MenuSharp";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import CreateIcon from "@mui/icons-material/Create";
import LoginIcon from "@mui/icons-material/Login";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import LogoutIcon from "@mui/icons-material/Logout";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useState } from "react";

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
  justify-content: flex-start;
  ${mobile({ gap: "10px" })}
`;

const DrawerIcon = styled(MenuSharpIcon)`
  color: white;
  cursor: pointer;
  margin-left: 50px;
  ${mobile({ marginLeft: "20px", marginRight: "20px" })}
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
  flex: 2;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
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
  justify-content: flex-end;
  ${mobile({ flex: 1, justifyContent: "flex-end", gap: "10px" })}
`;
const ProfilePic = styled.img`
  width: 60px;
  height: 60px;
  margin-top: 15px;
  margin-bottom: 15px;
  border-radius: 50%;
  object-fit: cover;
  object-position: top;
  cursor: pointer;
  ${mobile({
    width: "25px",
    height: "25px",
    marginLeft: "20px",
    marginRight: "15px",
  })}
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
  const quantity = useSelector((state) => state.cart.quantity);
  const user = useSelector((state) => state.user.currentUser);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const dispatchLogout = useDispatch();

  const toggleDrawerOpen = () => {
    setDrawerOpen(true);
  };
  const toggleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const logoutHandler = (e) => {
    e.preventDefault();
    toggleDrawerClose();
    logout(dispatchLogout);
  };

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
                padding: "0px 5px",
              }}
            />
          </SearchContainer>
        </Left>
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <Center>
            <LogoImage
              src="https://i.postimg.cc/d0YqKLY1/Barcelona-logo-removebg-preview-1.png"
              alt="fcb logo"
            />
            <Logo>FC BARCELONA</Logo>
          </Center>
        </Link>
        <Right>
          <Link to={"/cart"} style={{ textDecoration: "none" }}>
            <MenuItem>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlined style={{ color: "white" }} />
              </Badge>
            </MenuItem>
          </Link>
          <>
            <DrawerIcon onClick={toggleDrawerOpen} />
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={toggleDrawerClose}
              PaperProps={{
                sx: {
                  backgroundColor: "#181733",
                  color: "white",
                },
              }}
            >
              <Box sx={{ width: 250 }} role="presentation">
                <List
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  {!user && (
                    <Fragment>
                      <Link
                        to={"/login"}
                        style={{
                          textDecoration: "none",
                          color: "white",
                          textAlign: "left",
                        }}
                      >
                        <ListItem key={"login"} disablePadding>
                          <ListItemButton>
                            <ListItemIcon>
                              <LoginIcon style={{ color: "white" }} />
                            </ListItemIcon>
                            <ListItemText
                              primary="LOGIN"
                              style={{ fontStyle: "italic" }}
                            />
                          </ListItemButton>
                        </ListItem>
                      </Link>
                      <Link
                        to={"/register"}
                        style={{
                          textDecoration: "none",
                          color: "white",
                          textAlign: "left",
                        }}
                      >
                        <ListItem key={"createAccount"} disablePadding>
                          <ListItemButton>
                            <ListItemIcon>
                              <CreateIcon style={{ color: "white" }} />
                            </ListItemIcon>
                            <ListItemText
                              primary="CREATE ACCOUNT"
                              style={{ fontStyle: "italic" }}
                            />
                          </ListItemButton>
                        </ListItem>
                      </Link>
                      <Divider
                        style={{
                          backgroundColor: "#58577c",
                          width: "95%",
                          display: "flex",
                          margin: "10px auto 10px auto",
                          borderRadius: "12px",
                        }}
                      />
                    </Fragment>
                  )}
                  {user && (
                    <>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <ProfilePic src={user.img} />
                        <ListItemText
                          primary={user.username}
                          style={{ marginBottom: "15px" }}
                        />
                      </div>
                      <Divider
                        style={{
                          backgroundColor: "#58577c",
                          width: "95%",
                          display: "flex",
                          margin: "auto auto 10px auto",
                          borderRadius: "12px",
                        }}
                      />
                      <ListItem key={"viewProfile"} disablePadding>
                        <ListItemButton>
                          <ListItemIcon>
                            <AccountBoxIcon style={{ color: "white" }} />
                          </ListItemIcon>
                          <ListItemText
                            primary="VIEW PROFILE"
                            style={{ fontStyle: "italic" }}
                          />
                        </ListItemButton>
                      </ListItem>
                      <ListItem key={"OrderHistory"} disablePadding>
                        <ListItemButton>
                          <ListItemIcon>
                            <ShoppingBagIcon style={{ color: "white" }} />
                          </ListItemIcon>
                          <ListItemText
                            primary="ORDER HISTORY"
                            style={{ fontStyle: "italic" }}
                          />
                        </ListItemButton>
                      </ListItem>
                      <ListItem
                        key={"logout"}
                        disablePadding
                        onClick={logoutHandler}
                      >
                        <ListItemButton>
                          <ListItemIcon>
                            <LogoutIcon style={{ color: "white" }} />
                          </ListItemIcon>
                          <ListItemText
                            primary="LOGOUT"
                            style={{ fontStyle: "italic" }}
                          />
                        </ListItemButton>
                      </ListItem>
                      <Divider
                        style={{
                          backgroundColor: "#58577c",
                          width: "95%",
                          display: "flex",
                          margin: "10px auto 10px auto",
                          borderRadius: "12px",
                        }}
                      />
                    </>
                  )}
                  <Link
                    to={"/products/22-23"}
                    style={{
                      textDecoration: "none",
                      color: "white",
                      textAlign: "left",
                    }}
                  >
                    <ListItem key={"NewSeason"} disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <InboxIcon style={{ color: "white" }} />
                        </ListItemIcon>
                        <ListItemText
                          primary="NEW SEASON"
                          style={{ fontStyle: "italic" }}
                        />
                      </ListItemButton>
                    </ListItem>
                  </Link>
                  <ListItem key={"Kits"} disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <MailIcon style={{ color: "white" }} />
                      </ListItemIcon>
                      <ListItemText
                        primary="KITS"
                        style={{ fontStyle: "italic" }}
                      />
                    </ListItemButton>
                  </ListItem>
                  <ListItem key={"Lifestyle"} disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <MailIcon style={{ color: "white" }} />
                      </ListItemIcon>
                      <ListItemText
                        primary="LIFESTYLE"
                        style={{ fontStyle: "italic" }}
                      />
                    </ListItemButton>
                  </ListItem>
                </List>
                <Divider
                  style={{
                    backgroundColor: "#58577c",
                    width: "95%",
                    display: "flex",
                    margin: "auto",
                    borderRadius: "12px",
                  }}
                />
                <List>
                  <ListItem key={"Men"} disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <InboxIcon style={{ color: "white" }} />
                      </ListItemIcon>
                      <ListItemText
                        primary="MEN"
                        style={{ fontStyle: "italic" }}
                      />
                    </ListItemButton>
                  </ListItem>
                </List>
              </Box>
            </Drawer>
          </>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
