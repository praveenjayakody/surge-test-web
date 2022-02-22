import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import Route from "./RouteWrapper";

import SignIn from "../pages/SignIn.js";

import Home from "../pages/Home.js";

export default function Routes() {
  return (
	<BrowserRouter basename={process.env.REACT_APP_BASENAME}>
		<Switch>
		  <Route path="/" exact component={SignIn} />

		  <Route path="/home" component={Home} isPrivate />

		  {/* redirect user to SignIn page if route does not exist and user is not authenticated */}
		  <Route component={SignIn} />
		</Switch>
	</BrowserRouter>
  );
}
