import React, {useReducer, useState} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {solid} from '@fortawesome/fontawesome-svg-core/import.macro'
import coder_image from "../assets/images/coder-image.png"

import "../assets/css/SignUp.css"
import Input from "./ui/Input";
import FormItem from "./ui/FormItem";
import {Link} from "react-router-dom";
import Sidebar from "./ui/Sidebar";

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
			}
		default:
			return state;
	}
}


const SignUp = () => {
	const [data, setData] = useState({
		username: "",
		email: "",
		password: ""
	});

	const [state, dispatch] = useReducer(successReducer, {
		success: "",
		error: ""
	});

	const handleChange = ({currentTarget: input}) => {
		setData({...data, [input.name]: input.value});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const response = await fetch("http://localhost:8080/user/signup", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(data)
			})

			const resData = await response.json();
			if (response.ok) {
				dispatch({type: "SUCCESS", data: resData.message});
			}
			if (!response.ok) {
				throw new Error(resData.message);
			}
		} catch (error) {
			dispatch({type: "ERROR", data: error.message})
		}
	};

	return (
		<>
			<div className={"page-container"}>
				<Sidebar />
				<div className="card-container">
					<div className="card">
						<div className="form-container">
							<div className="card-logo">
								<FontAwesomeIcon icon={solid('code')} />
							</div>
							<div className="card-header">
								<h1>Sign Up</h1>
							</div>
							<form className="form" onSubmit={handleSubmit}>
								<FormItem>
								<span className="form-item-icon">
									<FontAwesomeIcon icon={solid('user')}/>
								</span>
									<Input
										type="text"
										name="username"
										id="username"
										placeholder="Username"
										required={true}
										autoFocus={true}
										onInput={handleChange}
									/>
								</FormItem>
								<FormItem>
								<span className="form-item-icon">
									<FontAwesomeIcon icon={solid('envelope')}/>
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
										pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
										title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
										onInput={handleChange}
									/>
								</FormItem>
								{ state.success && <div className="form-item success" >{state.success}</div> }
								{ state.error && <div className="form-item error" >{state.error}</div> }
								<button type="submit">Sign Up</button>
							</form>
							<div className="card-footer" >
								Already have an account?  <Link to="/auth">Log In</Link>
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
};


export default SignUp;