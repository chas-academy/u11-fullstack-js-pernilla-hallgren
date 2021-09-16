import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import AdminDashboard from "./components/admin_dashboard/adminDashboard";
import Home from "./components/home/home";
import Login from "./components/login/login";
import Profile from "./components/profile/profile";
import Register from "./components/register/register";
import { GET } from "./shared/services/requests";

function App() {
  const [userToken, setUserToken] = useState(localStorage.getItem("token")),
    [isAdmin, setIsAdmin] = useState(localStorage.getItem("admin")),
    [loading, setLoading] = useState(false);

  const logout = () => {
    setLoading(true);
    GET("logout")
      .then((data) => {
        setLoading(false);
        setUserToken(null);
        setIsAdmin(null);

        localStorage.removeItem("token");
        localStorage.removeItem("admin");
        window.location.reload();
      })
      .catch((err) => {
        setLoading(false);
        setUserToken(null);
        setIsAdmin(null);

        localStorage.removeItem("token");
        localStorage.removeItem("admin");
        window.location.reload();
      });
  };

  const getUserToken = (e) => setUserToken(e);
  console.log(isAdmin);

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
                    <Login
                      {...props}
                      getToken={getUserToken}
                      setAdmin={setIsAdmin}
                    />
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

          {isAdmin && (
            <>
              <Switch>
                <Route
                  path="/admin-dashboard"
                  render={(props) => (
                    <AdminDashboard {...props} logoutHandler={logout} />
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
