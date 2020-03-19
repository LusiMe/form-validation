import React, { useState, useEffect } from 'react';

const emailCheck = /[a-z0-9._%+!$&*=^|~#%'`?{}/-]+@([a-z0-9-]+\.){1,}([a-z]{2,16})/;
const phoneCheck = /^\d+$/;
const nameCheck = /^[A-Za-z]*$/;

const App = () => {
	const [ firstName, setName ] = useState('');
	const [ secondName, setSecondName ] = useState('');
	const [ phone, setPhone ] = useState('');
	const [ email, setEmail ] = useState('');

	const [ errorName, setErrorName ] = useState('');
	const [ errorSecondName, setErrorSecondName ] = useState('');
	const [ errorPhone, setErrorPhone ] = useState('');
	const [ errorEmail, setErrorEmail ] = useState('');

	const getForm = async (id) => {
		const result = await fetch(`http://localhost:4000/form/${id}`, {
			method: 'GET'
		});
		return result.json();
	};

	const save = async (params) => {
		const headers = { 'Content-Type': 'application/json' };
		let result;
		const _id = localStorage.getItem('_id');
		if (_id) {
			//updating on lust ID
			result = await fetch(`http://localhost:4000/form/${_id}`, {
				method: 'PUT',
				body: JSON.stringify(params),
				headers: headers
			});
		} else {
			result = await fetch('http://localhost:4000/form', {
				method: 'POST',
				body: JSON.stringify(params),
				headers: headers
			});
		}

		if (result && !_id) {
			const res = await result.json();
			localStorage.setItem('_id', res._id);
		}
	};
	useEffect(() => {
		const setForm = async () => {
			const waitForForm = await getForm(localStorage.getItem('_id'));
			setName(waitForForm.firstName);
			setSecondName(waitForForm.secondName);
			setPhone(waitForForm.phone);
			setEmail(waitForForm.email);
		};
		if (localStorage.getItem('_id')) {
			setForm();
		}
	}, []);
	useEffect(
		() => {
			if (firstName.length < 2 && firstName.length > 0) {
				setErrorName('too short name');
			} else if (!nameCheck.test(firstName)) {
				setErrorName('can include only letters');
			} else {
				setErrorName('');
			}

			if (secondName.length < 2 && secondName.length > 0) {
				setErrorSecondName('too short name');
			} else if (!nameCheck.test(secondName)) {
				setErrorSecondName('can include only letters');
			} else {
				setErrorSecondName('');
			}

			if (!phoneCheck.test(phone) && phone.length > 0) {
				setErrorPhone('only numbers required');
			} else {
				setErrorPhone('');
			}

			if (!emailCheck.test(email) && email.length > 2) {
				setErrorEmail('invalid email');
			} else {
				setErrorEmail('');
			}
		},
		[ firstName, secondName, phone, email ]
	);

	return (
		<div className="row">
			<h1 className="text-center">Form Validaton</h1>
			<div>
				<h3>First Name</h3>
				<input placeholder="first name" value={firstName} onChange={(e) => setName(e.target.value)} />
				<div style={{ display: errorName.length === 0 ? 'none' : 'block' }}>{errorName} </div>

				<h3>Second Name</h3>
				<input placeholder="second name" value={secondName} onChange={(e) => setSecondName(e.target.value)} />
				<div style={{ display: errorSecondName.length === 0 ? 'none' : 'block' }}>{errorSecondName} </div>

				<h3>Phone</h3>
				<input placeholder="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
				<div style={{ display: errorPhone.length === 0 ? 'none' : 'block' }}>{errorPhone}</div>

				<h3>Email</h3>
				<input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
				<div style={{ display: errorEmail.length === 0 ? 'none' : 'block' }}>{errorEmail}</div>

				<button onClick={() => save({ firstName, secondName, email, phone })}>Verify</button>
			</div>
		</div>
	);
};
export default App;
