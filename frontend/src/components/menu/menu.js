import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Navbar, Nav, Image } from "react-bootstrap";
import logo from "../../shared/assets/icons/logo.svg";

const Menu = ({ isAdmin, logoutHandler }) => {
  const [expanded, setExpanded] = useState(false);

  const color = {
    padding: "5px 8px",
    fontSize: "17px",
    fontWeight: "300",
    color: "#CECFD3",
    background: "#283041",
  };

  const toggler = {
    border: "0",
    color: "#FF9187",
    background: "#283041",
  };
  return (
    <>
      <Navbar style={color} expand="lg" variant="dark" expanded={expanded}>
        <Navbar.Brand style={color}>
          <Link to="/home">
            <Image
              src={logo}
              alt="logo"
              style={{
                width: "8rem",
                background: "#283041",
              }}
            />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle
          style={toggler}
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(expanded ? false : "expanded")}
        />
        <Navbar.Collapse style={color} id="navbar-toggle">
          <Nav className="mr-auto">
            <NavLink
              className="link"
              style={color}
              to="/home"
              onClick={() => setExpanded(false)}
              id="home"
            >
              Home
            </NavLink>
            <NavLink
              className="link"
              style={color}
              to="/messages"
              onClick={() => setExpanded(false)}
            >
              Messages
            </NavLink>
            <NavLink
              className="link"
              style={color}
              to="/profile"
              onClick={() => setExpanded(false)}
            >
              Profile
            </NavLink>
            {isAdmin && (
              <NavLink
                className="link"
                style={color}
                to="/admin-dashboard"
                onClick={() => setExpanded(false)}
              >
                Admin Dashboard
              </NavLink>
            )}
            <NavLink
              className="link"
              style={color}
              onClick={logoutHandler}
              to="/"
            >
              Logout
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Menu;
