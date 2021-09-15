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

  const getUserToken = (e) => setUserToken(e);

  console.log(userToken);
  return (
    <>
      <Router>
        <main>
          {!userToken && (
            <>
              <Switch>
                {/* <Route path="/" exact render={(props) => <LandingPage {...props} />}
                /> */}
                <Route
                  path="/register"
                  render={(props) => (
                    <Register {...props} getToken={getUserToken} />
                  )}
                />
                <Route
                  path="/login"
                  render={(props) => (
                    <Login {...props} getToken={getUserToken} />
                  )}
                />
              </Switch>
            </>
          )}

          {userToken && (
            <>
              <Switch>
                <Route path="/home" exact component={Home} />
                <Route
                  path="/profile"
                  render={(props) => (
                    <Profile {...props} logoutHandler={logout} />
                  )}
                />
              </Switch>
            </>
          )}

          {/* <nav>{userToken && <Navbar />}</nav> */}
        </main>
      </Router>
    </>
  );
}

export default App;
