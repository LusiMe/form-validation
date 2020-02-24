import React from 'react';
import ReactDOM from 'react-dom';
import { useForm } from 'react-hook-form';
import ErrorMessages from './errorMessages';
import handleChange from './handleChange';
import './App.css';

function App() {
	const { handleSubmit, register, minLength, errors } = useForm();

	const onSubmit = (data) => {
		alert(JSON.stringify(data));
	};

	return (
		<form className="App" onSubmit={handleSubmit(onSubmit)}>
			<h1>Sign Up</h1>
			<label>Name</label>
			<input
				name="firstName"
				ref={register({ required: true })}
				onChange={(event) => handleChange(event, 'firstName')}
			/>
			<ErrorMessages error={errors.firstName} />

			<label>Last Name</label>
			<input name="lastName" ref={register({ required: true, minLength: 2 })} />
			<ErrorMessages error={errors.lastName} />

			<label>email</label>
			<input name="email" ref={register({ required: true, pattern: /^\S+@\S+$/i })} />
			<ErrorMessages error={errors.email} />

			<label>phone</label>
			<input name="phone" ref={register({ required: true, phone: /^\d{10}$/ })} />
			<ErrorMessages error={errors.phone} />

			<input type="submit" />
		</form>
	);
}
const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);

export default App;
