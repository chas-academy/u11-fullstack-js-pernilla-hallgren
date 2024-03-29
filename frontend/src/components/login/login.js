import React, { useState } from "react";
import { POST } from "../../shared/services/requests";
import { Link, Redirect } from "react-router-dom";
import ErrorMessage from "../../shared/components/error-message";
import ButtonSubmit from "../../shared/components/button-submit";
import { Col, Row } from "react-bootstrap";

const Login = ({ getToken, setAdmin }) => {
  const [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [error, setError] = useState(null),
    [loading, setLoading] = useState(false),
    [redirect, setRedirect] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      email: email,
      password: password,
    };

    POST("users/login", data)
      .then((data) => {
        setLoading(true);
        setRedirect(true);
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data.user));
        getToken(localStorage.getItem("token"));
        if (data.data.user.role === "admin") {
          setAdmin(data.data.user.role);
          localStorage.setItem("admin", data.data.user.role);
        }
      })
      .catch((error) => {
        setLoading(false);
        setError(error.response.data.msg);
      });

    setEmail("");
    setPassword("");
  };

  if (redirect) return <Redirect to="/profile" />;

  return (
    <>
      <div className="container justify-content-center text-center">
        <div className="mb-5 mt-5">
          <h1 className="header-one">LOGIN NOW</h1>
          <h3 className="header-three">Please login to continue</h3>
        </div>

        {loading && !error && <p>Your are being logged in...</p>}

        <form onSubmit={handleSubmit} className="mb-5 mt-4">
          {error && <ErrorMessage message={error} />}

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
            <label htmlFor="register-password"></label>
            <input
              className="input-field"
              type="password"
              placeholder="Add Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="register-password"
            />
          </div>
          <div className="form-group mt-5">
            <Row>
              <Col>
                <Link to="/register" className="link">
                  <h3 className="header-three">
                    Don't have an account? Register
                  </h3>
                </Link>

                <ButtonSubmit name="Login" id="register-btn" />
              </Col>
            </Row>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
