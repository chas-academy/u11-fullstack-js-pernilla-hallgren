import React from "react";
import { Card } from "react-bootstrap";

const TrainerCard = ({ name, image }) => {
  const cardStyle = {
    background: "#5D6475",
    // width: "15rem",
    // height: "15rem",
    padding: "0.5rem",
    margin: "15px",
    borderRadius: "20px",
    boxShadow: "3px 3px 4px rgba(0, 0, 0, 0.25)",
    fontSize: "17px",
    fontWeight: "300",
    width: "16rem",
    height: "auto",
  };

  const cardImgStyle = {
    borderRadius: "20px",
    opacity: "20%",
    overflow: "hidden",
    height: "15rem",
    width: "15rem",
  };

  const cardTitleStyle = {
    background: "none",
    marginTop: "10px",
  };

  return (
    <>
      {/* <div className="col justify-content-center m-2"> */}
      <Card className="text-white mx-auto text-center" style={cardStyle}>
        <div style={cardImgStyle}>
          <Card.Img
            src={image}
            alt="trainer image"
            style={{ marginTop: "-2rem" }}
            variant="top"
          />
        </div>

        <Card.ImgOverlay style={{ background: "none" }}>
          <Card.Title style={cardTitleStyle}>{name}</Card.Title>
        </Card.ImgOverlay>
      </Card>
      {/* </div> */}
    </>
  );
};

export default TrainerCard;
