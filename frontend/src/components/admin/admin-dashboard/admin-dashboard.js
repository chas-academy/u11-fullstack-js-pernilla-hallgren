import React, { useEffect, useState } from "react";
import { GET, DELETE } from "../../../shared/services/requests";
import { Link } from "react-router-dom";
import ErrorMessage from "../../../shared/components/error_message";

const AdminDashboard = ({ logoutHandler }) => {
  const [adminUser, setAdminUser] = useState([]),
    [allUsers, setAllUsers] = useState([]),
    [loading, setLoading] = useState(false),
    [success, setSuccess] = useState(null),
    [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    GET("auth/profile")
      .then((response) => {
        setAdminUser(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.response.data.msg);
      });

    GET("admin")
      .then((response) => {
        setAllUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.response.data.msg);
        setLoading(false);
        console.log(error.response);
      });
  }, []);

  const deleteUserHandler = (id) => {
    DELETE("admin/users", id)
      .then((response) => {
        setLoading(false);
        setSuccess(response.data.msg);
        setAllUsers((currentState) => [
          ...currentState.filter((user) => user.id !== id),
        ]);
      })
      .catch((error) => {
        setError(error.response.data.msg);
        setLoading(false);
        setSuccess(null);
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
          {loading && !error && <p>Admin dashboard is loading...</p>}
          {error && <ErrorMessage message={error} />}
          {success && <p>{success}</p>}
          <Link to="/login">
            <button onClick={logoutHandler}>Logout</button>
          </Link>
          <Link to="/create-user">
            <button>Create User</button>
          </Link>
          <Link to="/create-trainer">
            <button>Create Trainer</button>
          </Link>
        </div>
      )}
      {allUsers ? (
        allUsers.map((user) => (
          <ul key={user.id}>
            <li>{user.username}</li>
            <li>{user.email}</li>
            <li>{user.role}</li>

            <Link
              to={{
                pathname: "/update-user",
                state: {
                  user: {
                    username: user.username,
                    email: user.email,
                    role: user.role,
                  },
                  id: user.id,
                },
              }}
            >
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
