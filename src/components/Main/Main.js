import React, { useState, Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Projects from "../Projects/Projects";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";

class ProtectedRoute extends Component {
  render() {
    const { component: Component, ...props } = this.props;

    return (
      <Route
        {...props}
        render={(props) =>
          this.props.authenticated ? (
            <Component {...props} />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    );
  }
}

const Main = () => {
  const [isUserAuthenticated, setUserAuthenticated] = useState(true);

  const loginHandler = () => {
    setUserAuthenticated(true);
  };

  return (
    <Switch>
      <Route
        path="/login"
        render={(props) => (
          <Login
            {...props}
            loginHandler={loginHandler}
            authState={isUserAuthenticated}
          />
        )}
      />
      {/*{isUserAuthenticated ? (
        <Route path="/profile" component={Profile} />
      ) : null}
      
      {isUserAuthenticated ? (
        <Route path="/projects" component={Projects} />
      ) : null}

      {isUserAuthenticated ? <Redirect from="/" to="/projects" /> : null}
     
      */}

      <ProtectedRoute
        path="/profile"
        component={Profile}
        authenticated={isUserAuthenticated}
      />
      <ProtectedRoute
        path="/projects"
        component={Projects}
        authenticated={isUserAuthenticated}
      />

      <Redirect from="/" to="/projects" />

      <Redirect from="/" to="/login" />
    </Switch>
  );
};

export default Main;
