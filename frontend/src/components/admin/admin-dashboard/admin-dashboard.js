import React, { useEffect, useState } from "react";
import { GET, DELETE } from "../../../shared/services/requests";
import { Link } from "react-router-dom";
import { PlusLg } from "react-bootstrap-icons";
import ErrorMessage from "../../../shared/components/error-message";

const AdminDashboard = () => {
  const [adminUser, setAdminUser] = useState([]),
    [allUsers, setAllUsers] = useState([]),
    [loading, setLoading] = useState(false),
    [success, setSuccess] = useState(null),
    [error, setError] = useState(null);

  useEffect(() => {
    GET("auth/profile")
      .then((response) => {
        setAdminUser(response.data);
      })
      .catch((error) => {
        setError(error.response.data.msg);
      });
    setLoading(true);
    GET("admin")
      .then((response) => {
        setAllUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.response.data.msg);
        setLoading(false);
      });
  }, []);

  const deleteUserHandler = (id) => {
    if (window.confirm("Are you sure you wish to delete this user?"))
      DELETE("admin/users", id)
        .then((response) => {
          setSuccess(response.data.msg);
          setAllUsers((currentState) => [
            ...currentState.filter((user) => user.id !== id),
          ]);
        })
        .catch((error) => {
          setError(error.response.data.msg);
          setSuccess(null);
        });
  };

  const cardStyle = {
    border: "0.5px solid ",
    minWidth: "65vw",
    padding: "15px",
    borderRadius: "20px",
    background: "#5D6475",
    boxShadow: "3px 3px 4px rgba(0, 0, 0, 0.25)",
    fontSize: "15px",
    fontWeight: "300",
    margin: "25px",
  };

  const btnStyle = {
    borderRadius: "10px",
    border: "0",
    float: "right",
    color: "white",
  };

  return (
    <>
      <div>
        <h1 className="header-one mt-5 mb-5 text-center">ALL USERS</h1>
      </div>
      {adminUser && (
        <div className="mb-2 text-center">
          {loading && !error && <p>Admin dashboard is loading...</p>}
          {error && <ErrorMessage message={error} />}
          {success && <p style={{ color: "#69FF51" }}>{success}</p>}

          <div>
            <Link to="/create-user">
              <button style={{ border: "none", paddingLeft: "30px" }}>
                <PlusLg color="#FF9187" />
                <span className="header-three m-2 link">Create New User</span>
              </button>
            </Link>
            <Link to="/create-trainer">
              <button style={{ border: "none", paddingLeft: "30px" }}>
                <PlusLg color="#FF9187" />
                <span className="header-three m-2 link">
                  Create New Trainer
                </span>
              </button>
            </Link>
          </div>
        </div>
      )}
      <div className="container-msg">
        <div className="card" style={cardStyle}>
          <div className="row">
            <div className="col" style={{ background: "#5D6475" }}>
              {allUsers ? (
                allUsers.map((user) => (
                  <div
                    key={user.id}
                    className="card-body"
                    style={{
                      background: "#5D6475",
                    }}
                  >
                    <ul
                      className="list-group list-group-flush"
                      style={{
                        background: "#5D6475",
                        color: "#CECFD3",
                      }}
                    >
                      <li
                        className="list-group-item"
                        style={{
                          background: "#5D6475",
                          color: "#e4e5e7",
                          fontSize: "20px",
                        }}
                      >
                        {user.username.toUpperCase()}
                        <Link
                          className="link"
                          style={{ background: "none" }}
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
                          <button
                            className="btn xsmall-btn my-auto m-1"
                            style={btnStyle}
                          >
                            Edit
                          </button>
                        </Link>
                        <button
                          className="btn xsmall-btn my-auto m-1"
                          style={btnStyle}
                          onClick={() => deleteUserHandler(user.id)}
                        >
                          Delete
                        </button>
                      </li>
                    </ul>
                    <hr />
                  </div>
                ))
              ) : (
                <div>There are no users in database</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
