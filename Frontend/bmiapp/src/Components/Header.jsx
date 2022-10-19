import React, { useContext, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Avatar from "@mui/material/Avatar";
import { NavLink, useNavigate } from "react-router-dom";
import { LoginContext } from "../ContextProvider/Context";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const Header = () => {
  const { logindata, setLoginData } = useContext(LoginContext);
  const history = useNavigate();
  // console.log(logindata.validUserOne.fname);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const goError = () => {
    history("*");
  };

  const goToLogin = () => {
    history("/");
  };

  const logoutUser = async () => {
    let token = JSON.parse(localStorage.getItem("BMIUserToken"));

    const res = await fetch("http://localhost:8009/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        Accept: "application/json",
      },
      credentials: "include",
    });

    const data = await res.json();

    console.log("data Logout", data);

    if (data.status === 201) {
      console.log("user logout");
      localStorage.removeItem("BMIUserToken");
      setLoginData(false);
      history("/");
    } else {
      console.log("error");
    }
  };
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Nav className="me-auto">
            <NavLink to="/home">Home</NavLink>
          </Nav>
          <NavLink to="/" style={{ marginRight: "30px" }}>
            Login
          </NavLink>
          {logindata.validUserOne ? (
            <Avatar style={{ backgroundColor: "teal" }} onClick={handleClick}>
              {logindata.validUserOne.name[0].toUpperCase()}
            </Avatar>
          ) : (
            <Avatar
              style={{ backgroundColor: "green" }}
              onClick={handleClick}
            />
          )}
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {logindata.validUserOne ? (
              <>
                <MenuItem
                  onClick={() => {
                    goToLogin();
                    handleClose();
                  }}
                >
                  Profile
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    logoutUser();
                    handleClose();
                  }}
                >
                  Logout
                </MenuItem>
              </>
            ) : (
              <MenuItem
                onClick={() => {
                  goError();
                  handleClose();
                }}
              >
                Profile
              </MenuItem>
            )}
          </Menu>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
