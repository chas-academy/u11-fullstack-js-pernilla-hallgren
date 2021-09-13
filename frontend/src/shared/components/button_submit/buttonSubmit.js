import React from "react";
import { Button } from "react-bootstrap";

const ButtonSubmit = ({ name, onClick }) => {
  const btnStyle = {
    borderRadius: "20px",
    border: "0",
    // background: 'linear-gradient(89.51deg, #FF7580 0.81%, #FF9187 35.87%, #FFC3A0 89.37%)',
    // boxShadow: '3px 3px 4px rgba(0, 0, 0, 0.25)',
    // fontSize: '17px',
    // width: '20rem',
    // height: '3.6rem',
    // margin: '1rem',
    // color: '#FFFFFF',
    // ':focus': {
    //   outline: 'none'
    // },
    // ':hover': {
    //   background: 'linear-gradient(89.51deg, #CD5F68 0.81%, #DF7F76 35.87%, #EAB393 89.37%)'
    // }
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
