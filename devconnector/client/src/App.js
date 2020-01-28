import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { Landing } from "./components/layout/Landing";
import { Register } from "./components/auth/Register";
import { Login } from "./components/auth/Login";
import "./App.css";

//Redux
import { Provider } from "react-redux";
import store from "./store";

const App = () => {
	return (
		<Provider store={store}>
			<Router>
				<>
					<Navbar />
					<Route exact path="/" component={Landing} />
					<section className="container">
						<Switch>
							<Route exact path="/login" component={Login} />
							<Route exact path="/register" component={Register} />
						</Switch>
					</section>
				</>
			</Router>
		</Provider>
	);
};

export default App;
