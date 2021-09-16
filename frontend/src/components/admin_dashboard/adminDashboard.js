import React, { useEffect, useState } from "react";
import { GET } from "../../shared/services/requests";
import { Link } from "react-router-dom";

const AdminDashboard = ({ logoutHandler }) => {
  const [adminUser, setAdminUser] = useState([]),
    [allUsers, setAllUsers] = useState([]),
    [error, setError] = useState(null);

  useEffect(() => {
    GET("auth/profile")
      .then((response) => {
        setAdminUser(response.data);
      })
      .catch((error) => {
        setError(error.response.data.msg);
        console.log(error.response);
      });

    GET("admin")
      .then((response) => {
        setAllUsers(response.data);
      })
      .catch((error) => {
        setError(error.response.data.msg);
        console.log(error.response);
      });
  }, []);

  console.log(allUsers);

  return (
    <>
      {adminUser && (
        <div>
          <h1>Admin Page</h1>
          <p>Username: {adminUser.username}</p>
          <p>Email: {adminUser.email}</p>
          <Link to="/login">
            <button onClick={logoutHandler}>Logout</button>
          </Link>
        </div>
      )}
      {allUsers ? (
        allUsers.map((user) => (
          <ul>
            <li>{user.username}</li>
            <li>{user.email}</li>
            <li>{user.role}</li>
            <button>Edit</button>
            <button>Update</button>
          </ul>
        ))
      ) : (
        <div>There are no users in database</div>
      )}
    </>
  );
};

export default AdminDashboard;
