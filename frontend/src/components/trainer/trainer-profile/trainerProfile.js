import React, { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import ButtonSmall from "../../../shared/components/button-small";
import { ArrowLeft } from "react-bootstrap-icons";
import userImg from "../../../shared/assets/images/user-img.png";
import { Link } from "react-router-dom";

const TrainerProfile = () => {
  let history = useHistory();
  const location = useLocation();
  const [trainer, setTrainer] = useState(location.state.trainer);

  const handleClickBack = () => {
    history.push("/home");
  };

  const imgCardStyle = {
    border: "0.5px solid ",
    boxShadow: "3px 3px 4px rgba(0, 0, 0, 0.25)",
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

  const btnStyle = {
    borderRadius: "8px",
    border: "0",
    cursor: "auto",
  };

  return (
    <>
      <div className="m-3">
        <button
          className="link"
          style={{ border: "none" }}
          onClick={handleClickBack}
        >
          <ArrowLeft color="#FF9187" />
          <span className="m-1">Back</span>
        </button>
      </div>

      <div className="container">
        <div className="row" style={{ margin: "auto" }}>
          <div
            className="col d-flex justify-content-center text-center"
            style={{ marginRight: "40px" }}
          >
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
                    textTransform: "uppercase",
                  }}
                >
                  <div className="mb-3">
                    {trainer.firstName} {trainer.lastName}
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

          <div
            className="col d-flex justify-content-center text-center"
            style={{ marginLeft: "40px" }}
          >
            <Card style={{ border: "none", width: "25rem" }}>
              <Card.Body style={{ textAlign: "left" }}>
                <Card.Text style={{ fontStyle: "italic", fontWeight: "300" }}>
                  {trainer.description}
                </Card.Text>

                <Card.Title>Skills</Card.Title>
                {trainer.skills.map((skill) => (
                  <Button
                    key={trainer.id_skill}
                    className="xsmall-btn m-2"
                    style={btnStyle}
                  >
                    {skill}
                  </Button>
                ))}
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default TrainerProfile;
