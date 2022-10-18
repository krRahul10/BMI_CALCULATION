import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Avatar from "@mui/material/Avatar";
import { NavLink} from 'react-router-dom'
const Header = () => {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Nav className="me-auto">
            <NavLink to="/">Home</NavLink>
          </Nav>
          <NavLink to="/login" style={{ marginRight: "30px" }}>
            Login
          </NavLink>

          <Avatar
            className="avtar"
            id="basic-button"
            aria-haspopup="true"
          ></Avatar>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
