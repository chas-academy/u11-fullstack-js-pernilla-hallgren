import React, { useState } from "react";
import { POST } from "../../shared/services/requests";
import { Redirect } from "react-router-dom";
import ErrorMessage from "../../shared/components/error_message";

const Login = () => {
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
    POST("auth/login", data)
      .then((data) => {
        setLoading(false);
        setRedirect(true);
        localStorage.setItem("token", JSON.stringify(data.data.token));
        console.log(data.data);
      })
      .catch((error) => {
        setLoading(false);
        setError(error.response.data.msg);
      });

    setEmail("");
    setPassword("");
  };

  // useEffect(() => {
  //   GET("/user").then(response => {
  //   })
  // }, []);

  if (redirect) return <Redirect to="/" />;

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
