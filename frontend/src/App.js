import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import AdminDashboard from "./components/admin_dashboard/adminDashboard";
import CreateUser from "./components/create-user/create-user";
import Home from "./components/home/home";
import Login from "./components/login/login";
import Navbar from "./components/navbar/navbar";
import Profile from "./components/profile/profile";
import Register from "./components/register/register";
import UpdateUser from "./components/update-user/update-user";
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

  // const getUserToken = (e) => setUserToken(e);

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
                    <Register {...props} getToken={setUserToken} />
                  )}
                />
                <Route
                  path="/login"
                  render={(props) => (
                    <Login
                      {...props}
                      getToken={setUserToken}
                      setAdmin={setIsAdmin}
                    />
                  )}
                />
              </Switch>
            </>
          )}

          {userToken && (
            <>
              <Navbar isAdmin={isAdmin} />
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
                <Route
                  path="/update-user"
                  render={(props) => (
                    <UpdateUser {...props} logoutHandler={logout} />
                  )}
                />
                <Route
                  path="/create-user"
                  render={(props) => (
                    <CreateUser {...props} logoutHandler={logout} />
                  )}
                />
              </Switch>
            </>
          )}
        </main>
      </Router>
    </>
  );
}

export default App;
