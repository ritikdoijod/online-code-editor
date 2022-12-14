import React, {useReducer, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";
import FormItem from "./ui/FormItem";
import Input from "./ui/Input";
import {Link} from "react-router-dom";

import coder_image from "../assets/images/coder-image.png"
import Sidebar from "./ui/Sidebar";

const switchReducer = (state, action) => {
	switch (action.type) {
		case "LOGIN":
			return {
				login_state: true,
				signup_state: false
			};

		case "SIGNUP":
			return {
				login_state: false,
				signup_state: true
			};

		default:
			return state;
	}
};


const successReducer = (state, action) => {
	switch (action.type) {
		case "SUCCESS":
			return {
				success: action.data,
				error: ""
			};

		case "ERROR":
			return {
				success: "",
				error: action.data
			};

		default:
			return state;
	}
};

const Auth = () => {
	const [data, setData] = useState({
		email: "",
		password: ""
	});

	const [state, dispatch] = useReducer(successReducer, {
		success: "",
		error: ""
	})

	const handleChange = ({currentTarget: input}) => {
		setData({...data, [input.name]: input.value})
	}

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const response = await fetch("http://localhost:8080/user/auth", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(data)
			});

			const resData = await response.json();

			localStorage.setItem("token", resData.data)

			if (response.status === 200) {
				dispatch({type: "SUCCESS", data: resData.message});
			} else {
				throw new Error(resData.message);
			}
			// window.location = "/"
		} catch (error) {
			dispatch({type: "ERROR", data: error.message});
		}
	}

	return (
		<>
			<div className="page-container">
				<Sidebar />
				<div className="card-container">
					<div className="card">
						<div className="form-container">
							<div className="card-logo">
								<FontAwesomeIcon icon={solid('code')}/>
							</div>
							<div className="card-header">
								<h1>Login</h1>
							</div>
							<form className="form" onSubmit={handleSubmit}>
								<FormItem>
								<span className="form-item-icon">
									<FontAwesomeIcon icon={solid('user')}/>
								</span>
									<Input
										type="email"
										name="email"
										id="email"
										placeholder="Email"
										required={true}
										onInput={handleChange}
									/>
								</FormItem>
								<FormItem>
								<span className="form-item-icon">
									<FontAwesomeIcon icon={solid('key')}/>
								</span>
									<Input
										type="password"
										name="password"
										id="password"
										placeholder="Password"
										required={true}
										onInput={handleChange}
									/>
								</FormItem>
								{ state.success && <div className="form-item success" >{state.success}</div> }
								{ state.error && <div className="form-item error" >{state.error}</div> }
								<button type="submit">Login</button>
							</form>
							<div className="card-footer">
								New to Code? <Link to="/signup">Create an account</Link>
							</div>
						</div>
						<div className="design-container">
							<div className="image-container">
								<img src={coder_image} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Auth;