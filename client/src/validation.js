import React from 'react';
import ReactDOM from 'react-dom';
import { useForm } from 'react-hook-form';

function App() {
	const { handleSubmit, register, minLength } = useForm();

	const onSubmit = (data) => {
		alert(JSON.stringify(data));
	};

	return (
		<form className="App" onSubmit={handleSubmit(onSubmit)}>
			<h1>Sign Up</h1>
			<label>Name</label>
			<input name="firstName" ref={register({ required: true })} />

			<label>Last Name</label>
			<input name="lastName" ref={register({ required: true, minLength: 2 })} />

			<label>email</label>
			<input name="email" ref={register({ required: true, pattern: /^\S+@\S+$/i })} />

			<label>phone</label>
			<input name="phone" ref={register({ required: true, pattern: /^\d{10}$/ })} />

			<input type="submit" />
		</form>
	);
}
const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
