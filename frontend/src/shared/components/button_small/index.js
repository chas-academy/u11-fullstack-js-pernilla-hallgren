import React from "react";
import { Button } from "react-bootstrap";

const ButtonSmall = ({ name, link }) => {
  const btnStyle = {
    borderRadius: "20px",
    border: "0",
  };

  return (
    <>
      <Button className="small-btn mx-auto" style={btnStyle}>
        {name}
      </Button>
    </>
  );
};

export default ButtonSmall;
