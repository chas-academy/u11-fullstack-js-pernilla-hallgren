import React from "react";

const errStyling = {
  color: "#FE7367",
};

const ErrorMessage = ({ message }) => {
  return (
    <div>
      <p style={errStyling}>{message}</p>
    </div>
  );
};

export default ErrorMessage;
