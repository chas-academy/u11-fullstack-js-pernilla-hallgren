import React, { useState } from "react";
import { POST } from "../../shared/services/requests";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import ButtonSubmit from "../../shared/components/button_submit";
import ErrorMessage from "../../shared/components/error_message";

const Register = ({ getToken }) => {
  const [username, setUsername] = useState(""),
    [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [newUser, setNewUser] = useState({}),
    [error, setError] = useState(null),
    [redirect, setRedirect] = useState(false),
    [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      username: username,
      email: email,
      password: password,
    };

    setLoading(true);
    POST("users/register", data)
      .then((data) => {
        setLoading(false);
        setRedirect(true);
        setNewUser(data.data);
        localStorage.setItem("token", data.data.token);
        getToken(localStorage.getItem("token"));
        console.log(data.data);
      })
      .catch((error) => {
        setLoading(false);
        setError(error.response.data.msg);
      });

    setUsername("");
    setEmail("");
    setPassword("");
  };

  if (redirect) return <Redirect to="/profile" />;

  console.log(newUser);

  return (
    <>
      {loading && <h4>Your are being registered...</h4>}

      <div className="container justify-content-center text-center">
        <div className="mb-5">
          <h1 className="header-one">REGISTER HERE</h1>
          <h3 className="header-three">
            Please fill in your details to register an account
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="mb-5 mt-4">
          <div className="form-group">
            <label htmlFor="register-username"></label>

            {error && <ErrorMessage message={error} />}

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
                  <Link to="/login" className="link">
                    <h3 className="header-three">
                      Do you have an account? Login
                    </h3>
                  </Link>

                  <ButtonSubmit name="Register" id="register-btn" />
                </Col>
              </Row>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
