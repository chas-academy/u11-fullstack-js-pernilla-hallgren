import React, { useEffect, useState } from "react";
import { GET } from "../../../shared/services/requests";
import { Link } from "react-router-dom";
import ErrorMessage from "../../../shared/components/error-message";

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

  console.log(authUser);

  return (
    <>
      {error && <ErrorMessage message={error} />}

      {loading && !error && <p>Your profile page is loading...</p>}

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
