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
import Calendar from "./components/calendars/Calendar";
import CalendarTest from "./components/calendars/Calendar";
import Destinations from "./components/destinations/Destinations";
import CreateDestination from "./components/destinations/CreateDestination";
import DestinationById from "./components/destinations/DestinationById";
import EditDestination from "./components/destinations/EditDestination"
import CreateDestinationSlider from "./components/destinations/CreateDestinationSlider";
import EditDestinationSlider from "./components/destinations/EditDestinationSlider";
import CreateCalendar from "./components/calendars/CreateCalendar";
import CreateCalendarSlider from "./components/calendars/CreateCalendarSlider"
import CalendarById from "./components/calendars/CalendarById";
import EditCalendar from "./components/calendars/EditCalendar"
import EditCalendarSlider from "./components/calendars/EditCalendarSlider";
import MapCreate from "./components/MapCreate";
import GoogleCalendar from "./components/calendars/GoogleCalendar";


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
        </Route>
        <Route path="/sign-up" exact={true}>
          <SignUpForm/>
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
        {/* <ProtectedRoute path="/destinations/create" exact={true} >
          <CreateDestination/>
        </ProtectedRoute> */}
        <ProtectedRoute path="/destinations/create" exact={true} >
          <MapCreate/>
          {/* <CreateDestinationSlider/> */}
        </ProtectedRoute>
        <ProtectedRoute path="/destinations/:id" exact={true} >
          <DestinationById/>
        </ProtectedRoute>
        <ProtectedRoute path="/destinations/:id/edit" exact={true} >
          <DestinationById/>
          {/* <EditDestination/> */}
          <EditDestinationSlider/>
        </ProtectedRoute>
        <ProtectedRoute path="/calendar" exact={true} >
          <Calendar/>
        </ProtectedRoute>
         <ProtectedRoute path="/googlecalendar" exact={true} >
          <GoogleCalendar/>
        </ProtectedRoute>
        <ProtectedRoute path="/calendar/create" exact={true} >
          <GoogleCalendar/>
        </ProtectedRoute>
        <ProtectedRoute path="/calendar/:id" exact={true} >
          <CalendarById/>
        </ProtectedRoute>
        <ProtectedRoute path="/calendar/:id/edit" exact={true} >
          <CalendarById/>
          {/* <EditCalendar/> */}
          <EditCalendarSlider/>
        </ProtectedRoute>
      </Switch>

    </BrowserRouter>
  );
}

export default App;
