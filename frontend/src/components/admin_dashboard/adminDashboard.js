import React, { useEffect, useState } from "react";
import { GET, DELETE } from "../../shared/services/requests";
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

  const deleteUserHandler = (id) => {
    DELETE("admin/delete", id);
    console.log(id);
    // GET("admin/delete")
    //   .then((data) => {})
    //   .catch((err) => {
    //     setError(error.response.data.msg);
    //     console.log(error.response);
    //   });
  };

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
          <ul key={user.id}>
            <li>{user.username}</li>
            <li>{user.email}</li>
            <li>{user.role}</li>
            <button>Edit</button>
            <button onClick={() => deleteUserHandler(user.id)}>Delete</button>
          </ul>
        ))
      ) : (
        <div>There are no users in database</div>
      )}
    </>
  );
};

export default AdminDashboard;
