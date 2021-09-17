import React, { useEffect, useState } from "react";
import { GET, DELETE, PATCH } from "../../shared/services/requests";
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
    DELETE("admin/delete-user", id)
      .then((response) => {
        console.log(response.data);
        setAllUsers((currentState) => [
          ...currentState.filter((user) => user.id !== id),
        ]);
      })
      .catch((error) => {
        console.log(error.response.data.msg);
      });
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
          <Link to="/login">
            <button>Create User</button>
          </Link>
        </div>
      )}
      {allUsers ? (
        allUsers.map((user) => (
          <ul key={user.id}>
            <li>{user.username}</li>
            <li>{user.email}</li>
            <li>{user.role}</li>

            <Link to={{ pathname: "/update-user", state: { ...user } }}>
              <button>Edit</button>
            </Link>

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
