import React, { Component } from 'react';
import './tableStyle.css';
import { Link } from 'react-router-dom';
import trashItem from './img/icons8-trash.svg';
import addItem from './img/icons8-add-80.png';
import editItem from './img/icons8-edit.svg';

const getAll = async () => {
	const result = await fetch('http://localhost:4000/form/', {
		method: 'GET'
	});
	return result.json();
};

class Table extends Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: '',
			email: '',
			users: []
		};
		this.removeButtonOnClick = this.removeButtonOnClick.bind(this);
	}

	async componentDidMount() {
		const users = await getAll();
		this.setState({ users: users });
	}

	async removeButtonOnClick(_id) {
		const result = await fetch(`http://localhost:4000/form/${_id}`, {
			method: 'DELETE'
		});
		this.removeRow(_id);
	}
	async editButtonOnClick(_id) {
		const result = await fetch(`http://localhost:4000/form/${_id}`, {
			method: 'PUT'
		});
		this.editRow(_id);
	}

	editRow(_id) {}

	removeRow(_id) {
		const fl = this.state.users.filter((user) => user._id !== _id);
		this.setState({ users: fl });
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
					<td>
						<button className="removeButton" onClick={() => this.removeButtonOnClick(_id)}>
							<img className="trash-icon" src={trashItem} />
						</button>
						<Link to="/formPage">
							<button className="addButton">
								<img className="add-icon" src={addItem} />
							</button>
						</Link>
						<Link to={`/formPage/${_id}`}>
							<button className="editButton">
								<img className="edit-icon" src={editItem} />
							</button>
						</Link>
					</td>
				</tr>
			);
		});
	}

	renderTableHeader() {
		let header = [ 'id', 'First Name', 'Second Name', 'Phone', 'email', 'actions' ];
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
