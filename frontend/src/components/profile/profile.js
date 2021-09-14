import React, { useEffect, useState } from "react";
import { GET } from "../../shared/services/requests";
// import { useParams } from "react-router-dom";
// import { Card, Col, Row } from "react-bootstrap";
// import { PATCH, GET } from "../services/requests";

const Profile = ({ logoutHandler }) => {
  // let { id } = useParams();

  // const user = JSON.parse(localStorage.getItem("user"));
  // console.log(user.username);

  const [authUser, setAuthUser] = useState([]),
    [error, setError] = useState(null);

  useEffect(() => {
    GET("auth/profile")
      .then((response) => {
        console.log(response.data);
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
      <h1>Profile Page</h1>
      {authUser.username}
    </>
  );
};

export default Profile;
