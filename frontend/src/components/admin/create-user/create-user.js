import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { POST } from "../../../shared/services/requests";
import { Row, Col } from "react-bootstrap";
import ButtonSubmit from "../../../shared/components/button-submit";
import ErrorMessage from "../../../shared/components/error-message";

const CreateUser = () => {
  const [username, setUsername] = useState(""),
    [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [role, setRole] = useState(""),
    [error, setError] = useState(null),
    [redirect, setRedirect] = useState(false),
    [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      username: username,
      email: email,
      password: password,
      role: role,
    };

    setLoading(true);
    POST("admin/users", data)
      .then((data) => {
        setLoading(false);
        setRedirect(true);
      })
      .catch((error) => {
        setLoading(false);
        setError(error.response.data.msg);
      });

    setUsername("");
    setEmail("");
    setPassword("");
  };

  if (redirect) return <Redirect to="/admin-dashboard" />;

  return (
    <>
      <div className="container justify-content-center text-center">
        <div className="mb-2 mt-5">
          <h1 className="header-one">CREATE NEW USER</h1>
        </div>
        {loading && !error && <p>User is being created...</p>}

        {error && <ErrorMessage message={error} />}

        <form onSubmit={handleSubmit} className="mb-5 mt-4">
          <div className="form-group">
            <label htmlFor="register-username"></label>

            <input
              className="input-field"
              type="text"
              placeholder="Add Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              id="register-username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="register-email"></label>
            <input
              className="input-field"
              type="email"
              placeholder="Add Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="register-email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="role"></label>
            <input
              className="input-field"
              type="text"
              placeholder="Add Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              id="role"
            />
          </div>

          <div className="form-group">
            <label htmlFor="register-password"></label>
            <input
              className="input-field"
              type="password"
              placeholder="Add Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="register-password"
            />

            <div className="form-group mt-5">
              <Row>
                <Col>
                  <ButtonSubmit name="Create User" id="register-btn" />
                </Col>
              </Row>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateUser;
