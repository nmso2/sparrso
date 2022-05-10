import React from "react";
import { Container, Navbar } from "react-bootstrap";
import logo from "../../media/Sparrso_logo.jpg";

const Header = () => {
  return (
    <Navbar bg="light" variant="light" fixed="top" className="shadow-lg">
      <Container>
        <Navbar.Brand href="#home">
          <img
            alt=""
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          SPARRSO
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
