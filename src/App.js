import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import PrivateRoute from './privatRoute'
import signUp from "./signUp";
import User from "./user";
import Profile from "./profile";
import Login from "./login";
import Dashboard from "./dashboard";
import './route.css';


const App = () => {
  return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route path="/login" component={Login} />
          <Route path="/signUp" component={signUp}/>
          <PrivateRoute path="/users" component={User}/>
          <PrivateRoute path="/editUserDetails/:id" component={signUp}/>
          <PrivateRoute path="/dashBord" component={Dashboard} />
          <PrivateRoute path="/profile" component={Profile}/>
        </Switch>

      </BrowserRouter>
  );
}
export default App;
