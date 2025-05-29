import React, { useState } from "react";
import logo from "../../../assets/logo.png";
import "./Header.css";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  return (
    <div className="header">
      <Navbar expand="lg" className="custom-navbar shadow-lg py-1 px-lg-5">
        <Container fluid>
          <Navbar.Brand as={NavLink} to="/">
            <img src={logo} className="navbar-App-logo me-lg-5" alt="logo" />
          </Navbar.Brand>
          <Navbar.Toggle className="nav-toggle">
            <i class="bi bi-list fs-1 nav-toggle-icon"></i>
          </Navbar.Toggle>
          <Navbar.Collapse>
            <Nav className="my-2 my-lg-0 custom-nav mx-auto">
              <Nav.Link
                as={NavLink}
                to="/"
                className={`mx-5 ${location.pathname === "/" ? "active" : ""}`}
              >
                Home
              </Nav.Link>
              <Nav.Link
                as={NavLink}
                to="/news"
                className={`mx-5 ${
                  location.pathname === "/news" ? "active" : ""
                }`}
              >
                News
              </Nav.Link>
              <NavDropdown
                title={
                  <span>
                    Article <i className="bi bi-caret-down-fill fs-6"></i>
                  </span>
                }
                id="navbarScrollingDropdown"
                className={`ms-5 caret-down ${
                  location.pathname === "/pumps" ||
                  location.pathname === "/ship-constructions" ||
                  location.pathname === "/ship-stability" ||
                  location.pathname === "/ship-type" ||
                  location.pathname === "/other"
                    ? "active"
                    : ""
                }`}
              >
                <NavDropdown.Item as={NavLink} to="/pumps">
                  Pumps
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={NavLink} to="/ship-constructions">
                  Ship Constructions
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={NavLink} to="/ship-stability">
                  Ship Stability
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={NavLink} to="/ship-type">
                  Ship Type
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={NavLink} to="/other">
                  Other
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form className="d-flex position-relative mb-2 mb-lg-0">
              <Form.Control
                type="search"
                placeholder="Search..."
                className="me-2 search-input pe-2"
                aria-label="Search"
              />
              <i className="bi bi-search search-icon pe-2"></i>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
