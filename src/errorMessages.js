import React from 'react';

export default function ErrorMessage({ error }) {
	if (error) {
		switch (error.type) {
			case 'required':
				return <p>This is required</p>;
			case 'minLength':
				return <p>Your last name need minimum 2 characters</p>;
			case 'pattern':
				return <p>Enter a valid email address</p>;
			case 'validate':
				return <p>Username is already used</p>;
			case 'phone':
				return <p>Required only numbers </p>;
			default:
				return null;
		}
	}

	return null;
}
