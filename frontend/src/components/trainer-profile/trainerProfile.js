import React, { useState } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { Card } from "react-bootstrap";
import ButtonSmall from "../../shared/components/button_small";
import ButtonSubmit from "../../shared/components/button_submit";
// import Skills from "../../shared/components/skills";
// import ReviewStar from "../../shared/components/review_star";
import userImg from "../../shared/assets/images/user-img.png";
import { Link } from "react-router-dom";

const TrainerProfile = () => {
  const location = useLocation();
  const id = location.state.id;
  const [trainer, setTrainer] = useState(location.state.trainer),
    [redirect, setRedirect] = useState(false),
    [error, setError] = useState(null);

  console.log(id);

  const imgCardStyle = {
    width: "15rem",
    border: "none",
    background: "none",
  };

  return (
    <>
      <div className="container justify-content-center">
        <div className="row mt-5">
          <div className="col d-flex justify-content-center text-center mb-1">
            <Card style={imgCardStyle}>
              <Card.Img
                style={{ borderRadius: "120px" }}
                variant="top"
                src={userImg}
                alt="user profile"
              />
              <Card.Body>
                <Card.Title
                  style={{
                    fontSize: "17px",
                    fontWeight: "300",
                    marginTop: "8px",
                  }}
                >
                  {/* {trainer.firstname.toUpperCase()}{" "}
                  {trainer.lastname.toUpperCase()} */}
                </Card.Title>
                <div>{/* <ReviewStar /> */}</div>
                <Link
                  to={{
                    pathname: "/trainer-profile/review",
                    state: {
                      trainer: {
                        username: trainer.username,
                        email: trainer.email,
                      },
                      id: id,
                    },
                  }}
                >
                  <button>Reviews</button>

                  {/* <ButtonSmall
                    name="0 Reviews"
                    link="/trainer-profile/review"
                  /> */}
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
