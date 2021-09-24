import React from "react";
import { Button } from "react-bootstrap";

const ButtonSubmit = ({ name, onClick }) => {
  const btnStyle = {
    borderRadius: "20px",
    border: "0",
  };

  return (
    <>
      <Button
        type="submit"
        className="mx-auto"
        style={btnStyle}
        onClick={onClick}
      >
        {name}
      </Button>
    </>
  );
};

export default ButtonSubmit;
