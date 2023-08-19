import React from 'react';
import Button from 'react-bootstrap/Button';
import { googleLogout } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import "./Logout.css";

function Logout({ setUser }) {
	const navigate = useNavigate();
  const onClick = () => {
		googleLogout();
		setUser(null);
		localStorage.setItem("login", null);
		console.log('Logout made successfully');
		navigate("/");
	};

	return (
		<div>
			<Button 
				onClick={onClick}
				>Logout</Button>
		</div>
	);
}

export default Logout;