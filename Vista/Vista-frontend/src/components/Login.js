import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import './Login.css';

function Login({ setUser }) {

	const onSuccess = (res) => {
		var tokenData = jwt_decode(res.credential);
		var loginData = {
			googleId: tokenData.sub,
			...tokenData
		}
		setUser(loginData);
		localStorage.setItem("login", JSON.stringify(loginData));
		console.log('Login Success: currentUser:', loginData);
	};

	const onFailure = (res) => {
		console.log('Login failed: res:', res);
	}

	return (
		<div id='googleAuth'>
			<GoogleLogin
				type='icon'
				id='login'
				shape='circle'
				size='large'
				onSuccess={onSuccess}
				onFailure={onFailure}
				cookiePolicy={'single_host_origin'}
				isSignedIn={true}
				auto_select={true}
			/>
		</div>
	);
}

export default Login;