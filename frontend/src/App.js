import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
    [isAdmin, setIsAdmin] = useState(localStorage.getItem("admin"));

  const logout = () => {
    setUserToken(null);
    setIsAdmin(null);

    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    localStorage.removeItem("user");
  };

  return (
    <>
      <div id="app-wrapper">
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
                  <Route path="/profile" exact component={Profile} />
                  <Route path="/profile/edit" component={EditProfile} />
                  <Route
                    path="/trainer-profile"
                    exact
                    component={TrainerProfile}
                  />
                  <Route path="/trainer-profile/review" component={Review} />
                </Switch>
              </>
            )}

            {isAdmin && (
              <>
                <Switch>
                  <Route path="/admin-dashboard" component={AdminDashboard} />
                  <Route path="/create-user" component={CreateUser} />
                  <Route path="/update-user" component={UpdateUser} />
                  <Route path="/create-trainer" component={CreateTrainer} />
                </Switch>
              </>
            )}
          </main>
        </Router>
        <Footer />
      </div>
    </>
  );
}

export default App;
