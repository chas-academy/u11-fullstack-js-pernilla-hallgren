import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import Home from "./components/home/home";
import Login from "./components/login/login";
import Register from "./components/register/register";

function App() {
  return (
    <>
      <Router>
        <main>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
          </Switch>
        </main>
      </Router>
    </>
  );
}

export default App;
