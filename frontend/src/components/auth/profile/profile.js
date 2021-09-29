import React, { useEffect, useState } from "react";
import { GET } from "../../../shared/services/requests";
import { Link } from "react-router-dom";
import ErrorMessage from "../../../shared/components/error-message";
import userImg from "../../../shared/assets/images/user-img.svg";
import { Card } from "react-bootstrap";
import { PencilFill } from "react-bootstrap-icons";

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
                      {" "}
                      <PencilFill
                        color="#FF7580"
                        style={{ marginRight: "6px", marginBottom: "4px" }}
                      />
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
                    <p className="header-six">Firstname</p>
                    <span style={{ color: "#848383" }}>
                      {authUser.firstName}
                    </span>
                    <hr />
                    <p className="header-six">Lastname</p>
                    <span style={{ color: "#848383" }}>
                      {authUser.lastName}
                    </span>
                    <hr />
                    <p className="header-six">Email</p>
                    <span style={{ color: "#848383" }}>{authUser.email}</span>
                    <hr />
                    <p className="header-six">Interests</p>
                    <span style={{ color: "#848383" }}>{authUser.skills}</span>
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
