import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { useEffect } from "react";

function Login() {
	const googleAuth = () => {
		window.open(
			`${import.meta.env.VITE_API_URL}/auth/google/callback`,
			"_self"
		);

		// Assuming this is in your frontend after successful login
		
fetch('http://localhost:8080/auth/login/success', { method: 'GET' })
.then(response => response.json())
.then(data => {
	if (data && data.user && data.user.token) {
		// Store token in Chrome storage
		// localStorage.setItem('authToken', data.user.token);
		chrome.storage.local.set({ authToken: data.user.token }, function() {
			console.log('Token saved');
		});
		console.log(data.user.token);
		// chrome.storage.local.set({ authToken: data.user.token }, function () {
		// 	console.log('Auth token saved in Chrome local storage.');
		// });
	} else {
		console.error('Token not found in response data');
	}
})
.catch(error => console.error('Error fetching token:', error));

	};

	
	// // Listen for the auth token from the extension
	// useEffect(() => {
	// 	// Retrieve the auth token from chrome storage
	// 	chrome.storage.local.get(['authToken'], function (result) {
	// 		if (result.authToken) {
	// 			console.log("Auth Token:", result.authToken);
	// 			// You can store it in your app's state or use it in API requests
	// 		}
	// 	});
	// }, []);

	return (
		<div className={styles.container}>
			<h1 className={styles.heading}>Log in Form</h1>
			<div className={styles.form_container}>
				<div className={styles.left}>
					<img className={styles.img} src="./images/login.jpg" alt="login" />
				</div>
				<div className={styles.right}>
					<h2 className={styles.from_heading}>Members Log in</h2>
					<input type="text" className={styles.input} placeholder="Email" />
					<input type="text" className={styles.input} placeholder="Password" />
					<button className={styles.btn}>Log In</button>
					<p className={styles.text}>or</p>
					<button className={styles.google_btn} onClick={googleAuth}>
						<img src="./images/google.png" alt="google icon" />
						<span>Sign in with Google</span>
					</button>
					<p className={styles.text}>
						New Here ? <Link to="/signup">Sign Up</Link>
					</p>
				</div>
			</div>
		</div>
	);
}

export default Login;