import React, { useEffect, useState } from "react";
import { GET } from "../../shared/services/requests";
// import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Profile = ({ logoutHandler }) => {
  const [authUser, setAuthUser] = useState([]),
    [error, setError] = useState(null);

  useEffect(() => {
    GET("auth/profile")
      .then((response) => {
        setAuthUser(response.data);
      })
      .catch((error) => {
        setError(error.response.data.msg);
        console.log(error.response);
      });
  }, []);

  console.log(authUser);

  return (
    <>
      {authUser && (
        <div>
          <h1>Profile Page</h1>
          <p>Username: {authUser.username}</p>
          <p>Email: {authUser.email}</p>
          <Link to="/login">
            <button onClick={logoutHandler}>Logout</button>
          </Link>
        </div>
      )}
    </>
  );
};

export default Profile;
