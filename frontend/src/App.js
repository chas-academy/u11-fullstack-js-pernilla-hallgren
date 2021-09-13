import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import Register from "./shared/components/register/register";

function App() {
  return (
    <>
      <Router>
        <main>
          <Switch>
            <Route path="/register" component={Register} />
          </Switch>
        </main>
      </Router>
    </>
  );
}

export default App;
