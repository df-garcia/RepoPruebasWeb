import React, { useState, Component, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import AuthService from "../../services/auth.service";

import Projects from "../Projects/Projects";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";

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
  const [isUserAuthenticated, setUserAuthenticated] = useState(false);

  useEffect(() => {
    loginHandler();
  }, []);

  const loginHandler = () => {
    const tokenValidation = AuthService.validateCurrentUserToken();

    setUserAuthenticated(tokenValidation);
  };

  return (
    <Switch>
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

      {isUserAuthenticated ? (
        <Redirect to="/projects" />
      ) : (
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
      )}

      <Route
        path="/signup"
        render={(props) => (
          <Signup
            {...props}
            loginHandler={loginHandler}
            authState={isUserAuthenticated}
          />
        )}
      />

      <Redirect from="/" to="/projects" />

      <Redirect from="/" to="/login" />
    </Switch>
  );
};

export default Main;
