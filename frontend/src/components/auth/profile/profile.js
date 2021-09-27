import React, { useEffect, useState } from "react";
import { GET } from "../../../shared/services/requests";
import { Link } from "react-router-dom";
import ErrorMessage from "../../../shared/components/error-message";
import userImg from "../../../shared/assets/images/user-img.png";
import { Card } from "react-bootstrap";

const Profile = () => {
  const [authUser, setAuthUser] = useState([]),
    [loading, setLoading] = useState(false),
    [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    GET("auth/profile")
      .then((response) => {
        setLoading(false);
        setAuthUser(response.data);
      })
      .catch((error) => {
        setError(error.response.data.msg);
        setLoading(false);
      });
  }, []);

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

  console.log(authUser);

  return (
    <>
      <div className="container justify-content-center">
        {error && <ErrorMessage message={error} />}

        {loading && !error && <p>Your profile page is loading...</p>}
        {authUser && (
          <div className="row">
            <div className="col d-flex justify-content-center text-center m-3">
              <Card style={cardStyle}>
                <div style={imgCardStyle}>
                  <Card.Img
                    style={{ marginTop: "-2rem" }}
                    variant="top"
                    src={authUser.image || userImg}
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
                    {authUser.username}
                  </Card.Title>
                  <Link
                    className="link"
                    to={{
                      pathname: "/profile/edit",
                      state: {
                        authUser: {
                          username: authUser.username,
                          email: authUser.email,
                          firstName: authUser.firstName,
                          lastName: authUser.lastName,
                          skills: authUser.skills,
                          image: authUser.image,
                        },
                        id: authUser.id,
                      },
                    }}
                  >
                    <h3
                      className="header-three"
                      style={{
                        color: "#FF7580",
                        fontSize: "15px",
                        fontWeight: "300",
                      }}
                    >
                      Edit Profile
                    </h3>
                  </Link>
                </Card.Body>
              </Card>
            </div>

            <div className="col d-flex justify-content-center m-3">
              <Card style={{ border: "none", width: "30rem" }}>
                <Card.Body>
                  <Card.Title></Card.Title>
                  <Card.Text className="text-align-left">
                    <p>Firstname</p>
                    <p style={{ color: "#848383" }}>{authUser.firstName}</p>
                    <hr />
                    <p>Lastname</p>
                    <p style={{ color: "#848383" }}>{authUser.lastName}</p>
                    <hr />
                    <p>Email</p>
                    <p style={{ color: "#848383" }}>{authUser.email}</p>
                    <hr />
                    <p>Skills</p>
                    <p style={{ color: "#848383" }}>{authUser.skills}</p>
                    <hr />
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
