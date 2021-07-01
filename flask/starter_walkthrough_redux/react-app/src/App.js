import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import NavBarNew from "./components/NavBarNew";
import { authenticate } from "./store/session";
import Map from "./components/Map"
import Calendar from "react-calendar";
import CalendarTest from "./components/Calendar";
import Destinations from "./components/destinations/Destinations";
import CreateDestination from "./components/destinations/CreateDestination";
import DestinationById from "./components/destinations/DestinationById";

function App() {
  // const [authenticated, setAuthenticated] = useState(false);
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      {/* <NavBar /> */}
      <NavBarNew />

      <Switch>
        <Route path="/login" exact={true}>
          <LoginForm />
          <SignUpForm />
        </Route>
        <Route path="/sign-up" exact={true}>

        </Route>
        <ProtectedRoute path="/users" exact={true}>
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true}>
          <User />
        </ProtectedRoute>
        <ProtectedRoute path="/" exact={true} >
          <Map/>
        </ProtectedRoute>
        <ProtectedRoute path="/destinations" exact={true} >
          <Destinations/>
        </ProtectedRoute>
        <ProtectedRoute path="/destinations/create" exact={true} >
          <CreateDestination/>
        </ProtectedRoute>
        <ProtectedRoute path="/destinations/:id" exact={true} >
          <DestinationById/>
        </ProtectedRoute>
        <ProtectedRoute path="/calendar" exact={true} >
          <CalendarTest/>
        </ProtectedRoute>
      </Switch>

    </BrowserRouter>
  );
}

export default App;
