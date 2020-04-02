import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Form from './formPage';
import './App.css';
import Table from './tablePage';

export default function App() {
	return (
		<Router>
			<div className="wrapper">
				{/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
				<Switch>
					<Route exact path="/">
						<Table />
					</Route>
					<Route path="/formPage/:_id?">
						<FormPage />
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
