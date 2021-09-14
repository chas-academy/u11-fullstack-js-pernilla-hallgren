import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import Home from "./components/home/home";
import Login from "./components/login/login";
import Profile from "./components/profile/profile";
import Register from "./components/register/register";
import { GET } from "./shared/services/requests";

function App() {
  const [userToken, setUserToken] = useState(localStorage.getItem("token")),
    [loading, setLoading] = useState(false);

  const logout = () => {
    setLoading(true);
    GET("logout")
      .then((data) => {
        setLoading(false);
        setUserToken(null);

        localStorage.removeItem("token");
        window.location.reload();
      })
      .catch((err) => {
        setLoading(false);
        setUserToken(null);

        localStorage.removeItem("token");
        window.location.reload();
      });
  };

  console.log(userToken);
  return (
    <>
      <Router>
        <main>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route
              path="/profile"
              render={(props) => <Profile {...props} logoutHandler={logout} />}
            />
          </Switch>
        </main>
      </Router>
    </>
  );
}

export default App;
