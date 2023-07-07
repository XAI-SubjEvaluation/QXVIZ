import React, { Component } from "react";
import { Navbar, Container, Nav, Image } from "react-bootstrap";
import logo from "@images/logo.png";

class NavBar extends Component {

  scrollToContent = (e) => {
    e.current.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  render = () => {
    return (
      <Navbar bg="light" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand href="#home">
            <Image
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            Explainable AI
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav>
              <Nav.Link
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  this.scrollToContent(this.props.navRef.home);
                }}
              >
                Home
              </Nav.Link>
              <Nav.Link
                href="#deepfake"
                onClick={(e) => {
                  e.preventDefault();
                  this.scrollToContent(this.props.navRef.deepFake);
                }}
              >
                DeepFake
              </Nav.Link>
              {/* <Nav.Link
                href="#aboutUs"
                onClick={(e) => {
                  e.preventDefault();
                  this.scrollToContent(this.props.navRef.aboutUs);
                }}
              >
                About Us
              </Nav.Link> */}
              {/* <Nav.Link
                href="#meetUs"
                onClick={(e) => {
                  e.preventDefault();
                  this.scrollToContent(this.props.navRef.meetUs);
                }}
              >
                Meet the Team
              </Nav.Link> */}
              <Nav.Link href="#getStarted" onClick={(e)=>this.props.clickedReady(e)} >Get Started</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default NavBar;
