import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { GET } from "./shared/services/requests";
import "./App.css";
import AdminDashboard from "./components/admin-dashboard/adminDashboard";
import CreateUser from "./components/create-user/createUser";
import CreateTrainer from "./components/create-trainer/createTrainer";
import Home from "./components/home/home";
import Login from "./components/login/login";
import Navbar from "./components/navbar/navbar";
import Profile from "./components/profile/profile";
import Register from "./components/register/register";
import UpdateUser from "./components/update-user/updateUser";
import EditProfile from "./components/edit-profile/editProfile";

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
              <Navbar isAdmin={isAdmin} logoutHandler={logout} />
              <Switch>
                <Route path="/home" exact component={Home} />
                <Route
                  path="/profile"
                  exact
                  render={(props) => <Profile {...props} />}
                />
                <Route
                  path="/profile/edit"
                  render={(props) => <EditProfile {...props} />}
                />
              </Switch>
            </>
          )}

          {isAdmin && (
            <>
              <Switch>
                <Route
                  path="/admin-dashboard"
                  render={(props) => <AdminDashboard {...props} />}
                />
                <Route
                  path="/create-user"
                  render={(props) => <CreateUser {...props} />}
                />
                <Route
                  path="/update-user"
                  render={(props) => <UpdateUser {...props} />}
                />
                <Route
                  path="/create-trainer"
                  render={(props) => <CreateTrainer {...props} />}
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
