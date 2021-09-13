import React, { useState } from "react";
import { POST } from "../../services/requests";
import { Redirect } from "react-router-dom";

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
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="">Username</label>
          <input
            type="text"
            placeholder="Add Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-control">
          <label htmlFor="">Email</label>
          <input
            type="email"
            placeholder="Add Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-control">
          <label htmlFor="">Password</label>
          <input
            type="password"
            placeholder="Add Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="form-control">
            <button type="submit" className="btn">
              Create User
            </button>
          </div>
        </div>
        {/* <input
          type="submit"
          value="Save User"
          placeholder="Register"
          onRegister={addUser}
        /> */}
      </form>
    </>
  );
};

export default Register;
