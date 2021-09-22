import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const ButtonSmall = ({ name, link }) => {

  const btnStyle = { 
    borderRadius: '20px', 
    border: '0', 
  };

  return (
    <>
      <Link to={link}>
        <Button className="small-btn mx-auto" style={btnStyle}>{name}</Button>
      </Link>

    </>
  )
}

export default ButtonSmall;