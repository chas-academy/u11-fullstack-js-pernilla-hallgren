import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

const Menu = ({ isAdmin, logoutHandler }) => {
  const [expanded, setExpanded] = useState(false);

  const color = {
    padding: "5px 8px",
    fontSize: "17px",
    fontWeight: "300",
    color: "#CECFD3",
    background: "#283041",
    textDecoration: "none",
  };

  const toggler = {
    border: "0",
    color: "#FF9187",
    background: "#283041",
  };
  return (
    <>
      <Navbar style={color} expand="lg" variant="dark" expanded={expanded}>
        <Navbar.Brand style={color} href="#home">
          LOGO
        </Navbar.Brand>
        <Navbar.Toggle
          style={toggler}
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(expanded ? false : "expanded")}
        />
        <Navbar.Collapse style={color} id="navbar-toggle">
          <Nav className="me-auto">
            <NavLink
              style={color}
              to="/home"
              onClick={() => setExpanded(false)}
            >
              Home
            </NavLink>
            <NavLink
              style={color}
              to="/messages"
              onClick={() => setExpanded(false)}
            >
              Messages
            </NavLink>
            <NavLink
              style={color}
              to="/profile"
              onClick={() => setExpanded(false)}
            >
              Profile
            </NavLink>
            {isAdmin && (
              <NavLink
                style={color}
                to="/admin-dashboard"
                onClick={() => setExpanded(false)}
              >
                Admin Dashboard
              </NavLink>
            )}
            <NavLink style={color} onClick={logoutHandler} to="/login">
              Logout
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {/* <div style={navStyle.nav}>
        <div style={navStyle.logo}>
          Navbar
        </div>
        
        <RightNav />
      </div> */}
    </>
  );
};

export default Menu;
