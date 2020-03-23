import React, { Component } from 'react';
import './tableStyle.css';

const getAll = async () => {
	const result = await fetch('http://localhost:4000/form/', {
		method: 'GET'
	});
	return result.json();
};

class Table extends Component {
	constructor(props) {
		super(props); //since we are extending class Table so we have to use super in order to override Component class constructor
		this.state = {
			//state is by default an object

			users: []
		};
	}
	async componentDidMount() {
		const users = await getAll();
		this.setState({ users: users });
	}

	renderTableData() {
		return this.state.users.map((user, index) => {
			const { _id, firstName, secondName, phone, email } = user; //destructuring
			return (
				<tr key={_id}>
					<td>{_id}</td>
					<td>{firstName}</td>
					<td>{secondName}</td>
					<td>{phone}</td>
					<td>{email}</td>
				</tr>
			);
		});
	}

	render() {
		return (
			<div>
				<h1 id="title">Users</h1>
				<table id="users">
					<tbody>{this.renderTableData()}</tbody>
				</table>
			</div>
		);
	}
	render() {
		//Whenever our class runs, render method will be called automatically, it may have already defined in the constructor behind the scene.
		return (
			<div>
				<h1>Users</h1>
			</div>
		);
	}
	renderTableHeader() {
		let header = [ 'id', 'First Name', 'Second Name', 'Phone', 'email' ];
		return header.map((key, index) => {
			return <th key={index}>{key.toUpperCase()}</th>;
		});
	}

	render() {
		return (
			<div>
				<h1 id="title">Users</h1>
				<table id="users">
					<thead>
						<tr>{this.renderTableHeader()}</tr>{' '}
					</thead>

					<tbody>{this.renderTableData()}</tbody>
				</table>
			</div>
		);
	}
}

export default Table;
