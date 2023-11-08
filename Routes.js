// Routes.js
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Layout from "./components/RouteLayout";
import Home from "./components/Home";
import About from "./components/About";

const Routes = () => (
	<BrowserRouter>
		<Layout>
			<Switch>
				<Route exact path='/' component={Home} />
				<Route path='/about' component={About} />
				{/* <Route path='/contact' component={Contact} /> */}
			</Switch>
		</Layout>
	</BrowserRouter>
);

export default Routes;
