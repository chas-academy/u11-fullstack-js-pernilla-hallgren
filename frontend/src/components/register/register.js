import React, { useState } from "react";
import { POST } from "../../shared/services/requests";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import ButtonSubmit from "../../shared/components/button_submit/buttonSubmit";

const Register = () => {
  const [username, setUsername] = useState(""),
    [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [newUser, setNewUser] = useState({}),
    [error, setError] = useState(null),
    [redirect, setRedirect] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      username: username,
      email: email,
      password: password,
    };

    POST("users", data)
      .then((data) => {
        setRedirect(true);
        setNewUser(data.data);
        console.log(data.data);
      })
      .catch((error) => {
        setError(error.response.data.error);
      });
    setUsername("");
    setEmail("");
    setPassword("");
  };

  if (redirect) return <Redirect to="/" />;

  console.log(newUser);

  return (
    <>
      <div className="container justify-content-center text-center">
        <div className="mb-5">
          <h1 className="header-one">REGISTER HERE</h1>
          <h3 className="header-three">
            Please fill in your details to register an account
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="mb-5 mt-4">
          <div className="form-group">
            <label htmlFor="username"></label>
            <input
              className="input-field"
              type="text"
              placeholder="Add Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              id="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email"></label>
            <input
              className="input-field"
              type="email"
              placeholder="Add Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password"></label>
            <input
              className="input-field"
              type="password"
              placeholder="Add Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
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
              {/* <button type="submit" className="btn">
                Create User
              </button> */}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
