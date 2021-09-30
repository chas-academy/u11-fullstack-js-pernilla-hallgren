import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const ButtonLink = ({ name, link }) => {
  const btnStyle = {
    borderRadius: "20px",
    border: "0",
  };

  return (
    <>
      <Link to={link}>
        <Button className="btn mx-auto" style={btnStyle}>
          {name}
        </Button>
      </Link>
    </>
  );
};

export default ButtonLink;
