import React from "react"
import { Button } from "react-bootstrap"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import { Link } from "react-router-dom"

const HackerHeader = ({ userId, onLogout }) => {
  //const HackerHeader = (props) => {
  //const { userId, onLogout } = props;
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">해커캠프</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to="/" className="nav-link">
                Home
              </Link>
              <Link to="/notice" className="nav-link">
                공지사항
              </Link>
              <Link to="/hackernews" className="nav-link">
                해커뉴스
              </Link>
              <Link to="/dept" className="nav-link">
                부서목록
              </Link>
              <Link to="/youtube" className="nav-link">
                유튜브
              </Link>
            </Nav>
            {onLogout && (
              <Button variant="dark" onClick={onLogout}>
                Logout
              </Button>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default HackerHeader
