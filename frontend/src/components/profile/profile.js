import React, { useEffect, useState } from "react";
import { GET } from "../../shared/services/requests";
// import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Profile = () => {
  const [authUser, setAuthUser] = useState([]),
    [error, setError] = useState(null);

  useEffect(() => {
    GET("auth/profile")
      .then((response) => {
        console.log(response);
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
          <h1>{authUser.username}'s Profile Page</h1>
          <p>Username: {authUser.username}</p>
          <p>Email: {authUser.email}</p>
          <p>Firstname: {authUser.firstName}</p>
          <p>Lastname: {authUser.lastName}</p>
          <p>Skills: {authUser.skills}</p>
          <img src={authUser.image} alt="profile img"></img>

          <Link
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
            <button>Edit Profile</button>
          </Link>
        </div>
      )}
    </>
  );
};

export default Profile;
