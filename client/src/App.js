import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Form from './formPage';
import './App.css';
import Table from './tablePage';

export default function App() {
	return (
		<Router>
			<div>
				<nav>
					<ul>
						<li>
							<Link to="/formPage">Form</Link>
						</li>
						<li>
							<Link to="/tablePage">Table</Link>
						</li>
					</ul>
				</nav>

				{/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
				<Switch>
					<Route path="/formPage">
						<FormPage />
					</Route>
					<Route path="/tablePage">
						<Table />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

function FormPage() {
	return <Form />;
}

function TablePage() {
	return <h2>Table</h2>;
}
