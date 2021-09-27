import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { GET } from "./shared/services/requests";
import "./App.css";
import AdminDashboard from "./components/admin/admin-dashboard/admin-dashboard";
import CreateUser from "./components/admin/create-user/create-user";
import CreateTrainer from "./components/admin/create-trainer/create-trainer";
import Home from "./components/home/home";
import Login from "./components/login/login";
import Profile from "./components/auth/profile/profile";
import Register from "./components/register/register";
import UpdateUser from "./components/admin/update-user/update-user";
import EditProfile from "./components/auth/edit-profile/edit-profile";
import TrainerProfile from "./components/trainer/trainer-profile/trainerProfile";
import Review from "./components/trainer/review/review";
import Menu from "./components/menu/menu";
import LandingPage from "./components/landing-page/landing-page";
import Footer from "./components/footer/footer";

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
        localStorage.removeItem("user");
      })
      .catch((err) => {
        setLoading(false);
        setUserToken(null);
        setIsAdmin(null);

        localStorage.removeItem("token");
        localStorage.removeItem("admin");
        localStorage.removeItem("user");
      });
  };

  return (
    <>
      <Router>
        <main>
          <Route path="/" exact component={LandingPage} />
          {!userToken && (
            <>
              <Switch>
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
              <Menu isAdmin={isAdmin} logoutHandler={logout} />
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
                <Route
                  path="/trainer-profile"
                  exact
                  render={(props) => <TrainerProfile {...props} />}
                />
                <Route
                  path="/trainer-profile/review"
                  render={(props) => <Review {...props} />}
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
      <Footer />
    </>
  );
}

export default App;
