import React from "react";
import { Navbar } from "react-bootstrap";

const HackerFooter = (props) => {
  return (
    <>
      <Navbar
        className="navbar navbar-expand-sm justify-content-center"
        fixed="bottom"
        bg="dark"
        style={{ color: "white" }}
      >
        해커캠프 copyright &copy; 2022
      </Navbar>
    </>
  );
};

export default HackerFooter;
