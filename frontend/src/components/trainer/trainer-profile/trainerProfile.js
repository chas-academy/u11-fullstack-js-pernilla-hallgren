import React, { useState } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { Card } from "react-bootstrap";
import ButtonSmall from "../../../shared/components/button-small";
import ButtonSubmit from "../../../shared/components/button-submit";
// import Skills from "../../shared/components/skills";
// import ReviewStar from "../../shared/components/review_star";
import userImg from "../../../shared/assets/images/user-img.png";
import { Link } from "react-router-dom";

const TrainerProfile = () => {
  const location = useLocation();
  const [trainer, setTrainer] = useState(location.state.trainer);

  console.log(trainer);

  const imgCardStyle = {
    border: "none",
    height: "20rem",
    width: "20rem",
    overflow: "hidden",
    background: "none",
    borderRadius: "50%",
  };

  const cardStyle = {
    width: "20rem",
    height: "auto",
    border: "none",
    background: "none",
  };

  return (
    <>
      <div className="container">
        <div className="row mt-5">
          <div className="col d-flex justify-content-center text-center mb-1">
            <Card style={cardStyle}>
              <div style={imgCardStyle}>
                <Card.Img
                  style={{ marginTop: "-2rem" }}
                  variant="top"
                  src={trainer.image || userImg}
                  alt="user profile"
                />
              </div>
              <Card.Body>
                <Card.Title
                  style={{
                    fontSize: "17px",
                    fontWeight: "300",
                    marginTop: "8px",
                  }}
                >
                  <div className="mb-3">
                    {trainer.firstName.toUpperCase()}{" "}
                    {trainer.lastName.toUpperCase()}
                  </div>
                  <a
                    href={`mailto:${trainer.email}`}
                    style={{ textDecoration: "none" }}
                  >
                    Contact
                  </a>
                </Card.Title>
                <Link
                  to={{
                    pathname: "/trainer-profile/review",
                    state: {
                      trainer,
                    },
                  }}
                >
                  <ButtonSmall name="Reviews" />
                </Link>
              </Card.Body>
            </Card>
          </div>

          <div className="col d-flex justify-content-center text-center">
            <Card style={{ border: "none", width: "25rem" }}>
              <Card.Body style={{ textAlign: "left" }}>
                <Card.Text style={{ fontStyle: "italic", fontWeight: "300" }}>
                  {trainer.description}
                </Card.Text>
                <Card.Title>Skills</Card.Title>
                {trainer.skills}

                <ButtonSubmit name="Send a message to..." id="login-btn" />
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrainerProfile;
