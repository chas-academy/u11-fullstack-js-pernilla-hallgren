import React, { useEffect, useState } from "react";
import { GET } from "../../shared/services/requests";
import { useParams } from "react-router-dom";
// import { Card, Col, Row } from "react-bootstrap";
// import { PATCH, GET } from "../services/requests";

const Profile = () => {
  // let { id } = useParams();

  const [authUser, setAuthUser] = useState([]),
    [error, setError] = useState(null);

  useEffect(() => {
    GET("auth/profile")
      .then((response) => {
        setAuthUser(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  }, []);

  console.log(authUser);

  return (
    <>
      <h1>Profile Page</h1>
    </>
  );
};

export default Profile;
