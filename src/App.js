
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import SignIn from "./components/login"
import SignUp from "./components/register"
import ManageContact from "./components/manage-contact"
import ManageUser from "./components/manage-user"
import instance from "./AxiosConfig";

function App() {
  function setToken() {
    if (localStorage.getItem("token") != null) {
      instance.defaults.headers['Authorization'] = localStorage.getItem("token");
    }
  }
  return (
    <Router>
      <Switch>
        <Route path='/' exact>
          <SignIn />
        </Route>
        <Route path='/register' exact>
          <SignUp />
        </Route>
        <Route path='/manage-contact' exact >
          <ManageContact isLogin={setToken} />
        </Route>
        <Route path='/manage-user' exact >
          <ManageUser isLogin={setToken} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
