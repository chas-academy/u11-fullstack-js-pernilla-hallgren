import React, { useState } from "react";
import { POST } from "../../shared/services/requests";
import { Redirect } from "react-router-dom";
import ErrorMessage from "../../shared/components/error_message";

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

    setLoading(true);
    POST("users/login", data)
      .then((data) => {
        console.log(data);
        setLoading(false);
        setRedirect(true);
        localStorage.setItem("token", data.data.token);
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

  // redirect later to homepage
  if (redirect) return <Redirect to="/profile" />;

  const btnStyle = {
    borderRadius: "20px",
    border: "0",
    color: "white",
  };

  return (
    <>
      {loading && <h4>Your are being registered...</h4>}

      <div className="container justify-content-center text-center">
        <div className="mb-5">
          <h2>LOGIN NOW</h2>
          <p>Please login to continue</p>
        </div>

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
            <div className="form-group m-5">
              <button type="submit" className="btn" style={btnStyle}>
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
