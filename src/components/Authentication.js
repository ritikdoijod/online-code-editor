import React, { useReducer, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import FormItem from "./ui/FormItem";
import Input from "./ui/Input";

import coder_image from "../assets/images/coder-image.png";

import "../assets/css/SignUp.css";
import { Link } from "react-router-dom";
import {
    Alert,
    Button,
    Container,
    Form,
    InputGroup,
    Modal,
    Nav,
} from "react-bootstrap";
import AlertModal from "./ui/AlertModal";

const formReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                login: true,
                signup: false,
            };

        case "SIGNUP":
            return {
                login: false,
                signup: true,
            };

        case "SUCCESS":
            return {
                success: action.data,
                error: "",
            };

        case "ERROR":
            return {
                success: "",
                error: action.data,
            };

        case "RESET":
            return {
                success: "",
                error: "",
            };

        case "VIEW_HIDE":
            return {
                eye: !action.data,
            };

        default:
            return state;
    }
};

// const Authentication = () => {
// 	const [data, setData] = useState({
// 		username: "",
// 		email: "",
// 		password: ""
// 	});

// 	const [suc_state, suc_dispatch] = useReducer(formReducer, {
// 		success: "",
// 		error: ""
// 	});

// 	const [switch_state, switch_dispatch] = useReducer(formReducer, {
// 		login: true,
// 		signup: false
// 	})

// 	const [eye_state, eye_dispatch] = useReducer(formReducer, {
// 		eye: false
// 	})

// 	const handleChange = ({currentTarget: input}) => {
// 		setData({...data, [input.name]: input.value})
// 	}

// 	const handleLogin = async (event) => {
// 		event.preventDefault();

// 		try {
// 			const response = await fetch("http://localhost:8080/user/auth", {
// 				method: "POST",
// 				headers: {
// 					"Content-Type": "application/json"
// 				},
// 				body: JSON.stringify({
// 					"email": data.email,
// 					"password": data.password
// 				})
// 			});

// 			const resData = await response.json();

// 			localStorage.setItem("token", resData.data)

// 			if (response.status === 200) {
// 				suc_dispatch({type: "SUCCESS", data: resData.message});
// 				console.log(resData)
// 			} else {
// 				throw new Error(resData.message);
// 			}
// 			// window.location = "/"
// 		} catch (error) {
// 			suc_dispatch({type: "ERROR", data: error.message});
// 		}
// 	}

// 	const handleSignUP = async (event) => {
// 		event.preventDefault();

// 		try {
// 			const response = await fetch("http://localhost:8080/user/signup", {
// 				method: "POST",
// 				headers: {
// 					"Content-Type": "application/json"
// 				},
// 				body: JSON.stringify(data)
// 			})

// 			const resData = await response.json();
// 			if (response.ok) {
// 				suc_dispatch({type: "SUCCESS", data: resData.message});
// 			}
// 			if (!response.ok) {
// 				throw new Error(resData.message);
// 			}
// 		} catch (error) {
// 			suc_dispatch({type: "ERROR", data: error.message})
// 		}
// 	};

// 	const handleLoginBtnClick = () => {
// 		switch_dispatch({type: "LOGIN"});
// 		suc_dispatch({type: "RESET"})
// 	}

// 	const handleSignUPBtnClick = () => {
// 		switch_dispatch({type: "SIGNUP"});
// 		suc_dispatch({type: "RESET"})
// 	}

// 	const viewPassToggler = () => {
// 		const password = document.getElementById("password");
// 		const type = password.getAttribute("type") === "password" ? "text" : "password";
// 		password.setAttribute("type", type);
// 		eye_dispatch({type: "VIEW_HIDE", data: eye_state.eye})
// 	}

// 	return (
// 		<>
// 			{/* <div className="page-container">
// 				<Sidebar/>
// 				<div className="card-container">

// 					<div className="wrapper">
// 						<div className="card">
// 							<div className="card-header">
// 								<div className="btn-wrapper">
// 									{switch_state.login &&
// 										<>
// 											<button id="btn-login" type="button" onClick={handleLoginBtnClick} disabled>Login</button>
// 											<button id="btn-signup" type="button" onClick={handleSignUPBtnClick}>SignUP</button>
// 										</>
// 									}
// 									{switch_state.signup &&
// 										<>
// 											<button id="btn-login" type="button" onClick={handleLoginBtnClick}>Login</button>
// 											<button id="btn-signup" type="button" onClick={handleSignUPBtnClick} disabled>SignUP</button>
// 										</>
// 									}
// 								</div>
// 							</div>
// 							<div className="form-container">
// 								{switch_state.login && <>
// 									<form className="form" onSubmit={handleLogin}>
// 										<FormItem>
// 											<span className="form-item-icon">
// 												<FontAwesomeIcon icon={solid('user')}/>
// 											</span>
// 											<Input
// 												type="email"
// 												name="email"
// 												id="email"
// 												placeholder="Email"
// 												required={true}
// 												onInput={handleChange}
// 											/>
// 										</FormItem>
// 										<FormItem>
// 											<span className="form-item-icon">
// 												<FontAwesomeIcon icon={solid('key')}/>
// 											</span>
// 											<Input
// 												type="password"
// 												name="password"
// 												id="password"
// 												placeholder="Password"
// 												required={true}
// 												onInput={handleChange}
// 											/>
// 											<button type="button" className="eye-btn" onClick={viewPassToggler}>
// 												{eye_state.eye && <FontAwesomeIcon id="toggle-eye" icon={solid("eye-slash")} /> }
// 												{!eye_state.eye && <FontAwesomeIcon id="toggle-eye" icon={solid("eye")} /> }
// 											</button>
// 										</FormItem>
// 										{suc_state.success &&
// 											<div className="form-item success">{suc_state.success}</div>}
// 										{suc_state.error && <div className="form-item error">{suc_state.error}</div>}
// 										<button className="submit-btn" type="submit">Login</button>
// 									</form>
// 									<div className="card-footer">
// 										<Link to="#" >Forgot Password?</Link>
// 									</div>
// 								</>}
// 								{switch_state.signup && <>
// 									<form className="form" onSubmit={handleSignUP}>
// 										<FormItem>
// 								<span className="form-item-icon">
// 									<FontAwesomeIcon icon={solid('user')}/>
// 								</span>
// 											<Input
// 												type="text"
// 												name="username"
// 												id="username"
// 												placeholder="Username"
// 												required={true}
// 												autoFocus={true}
// 												onInput={handleChange}
// 											/>
// 										</FormItem>
// 										<FormItem>
// 								<span className="form-item-icon">
// 									<FontAwesomeIcon icon={solid('envelope')}/>
// 								</span>
// 											<Input
// 												type="email"
// 												name="email"
// 												id="email"
// 												placeholder="Email"
// 												required={true}
// 												onInput={handleChange}
// 											/>
// 										</FormItem>
// 										<FormItem>
// 											<span className="form-item-icon">
// 												<FontAwesomeIcon icon={solid('key')}/>
// 											</span>
// 											<Input
// 												type="password"
// 												name="password"
// 												id="password"
// 												placeholder="Password"
// 												required={true}
// 												pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
// 												title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
// 												onInput={handleChange}
// 											/>
// 										</FormItem>
// 										{suc_state.success &&
// 											<div className="form-item success">{suc_state.success}</div>}
// 										{suc_state.error && <div className="form-item error">{suc_state.error}</div>}
// 										<button className="submit-btn" type="submit">Sign Up</button>
// 									</form>
// 								</>}
// 							</div>
// 							<div className="design-container">
// 								<div className="image-container">
// 									<img src={coder_image} alt="design"/>
// 								</div>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			</div> */}
// 		</>
// 	)
// }

const Authentication = (props) => {
    const [data, setData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [ss, ss_dispatch] = useReducer(formReducer, {
        success: "",
        error: "",
    });

    const [fs, fs_dispatch] = useReducer(formReducer, {
        login: true,
        signup: false,
    });

    const [es, es_dispatch] = useReducer(formReducer, {
        eye: false,
    });

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/user/auth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: data.email,
                    password: data.password,
                }),
            });

            const resData = await response.json();

            localStorage.setItem("token", resData.data);

            if (response.status === 200) {
                ss_dispatch({ type: "SUCCESS", data: resData.message });
                console.log(resData);
            } else {
                throw new Error(resData.message);
            }
            // window.location = "/"
        } catch (error) {
            ss_dispatch({ type: "ERROR", data: error.message });
        }
    };

    const handleSignUP = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/user/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const resData = await response.json();
            if (response.ok) {
                ss_dispatch({ type: "SUCCESS", data: resData.message });
            }
            if (!response.ok) {
                throw new Error(resData.message);
            }
        } catch (error) {
            ss_dispatch({ type: "ERROR", data: error.message });
        }
    };

    const handleLoginBtnClick = () => {
        fs_dispatch({ type: "LOGIN" });
        ss_dispatch({ type: "RESET" });
    };

    const handleSignUPBtnClick = () => {
        fs_dispatch({ type: "SIGNUP" });
        ss_dispatch({ type: "RESET" });
    };

    const viewPassToggler = () => {
        const password = document.getElementById("password");
        const type =
            password.getAttribute("type") === "password" ? "text" : "password";
        password.setAttribute("type", type);
        es_dispatch({ type: "VIEW_HIDE", data: es.eye });
    };

    const handleClose = () => {
        props.setOpenModal(false);
    };

    return (
        <>
            <Modal
                show={props.openModal}
                centered
                onHide={handleClose}
                contentClassName="dark"
            >
                <Modal.Dialog contentClassName="dark-1">
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {!fs.login ? (
                                <Button onClick={handleLoginBtnClick}>
                                    Login
                                </Button>
                            ) : (
                                <Button disabled>Login</Button>
                            )}
                            {!fs.signup ? (
                                <Button
                                    onClick={handleSignUPBtnClick}
                                    className="ms-2"
                                >
                                    SignUP
                                </Button>
                            ) : (
                                <Button className="ms-2" disabled>
                                    SignUP
                                </Button>
                            )}
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Form onSubmit={fs.login ? handleLogin : handleSignUP}>
                            {fs.signup && (
                                <Form.Group className="mb-3">
                                    <InputGroup>
                                        <InputGroup.Text>
                                            <FontAwesomeIcon
                                                icon={solid("user")}
                                            />
                                        </InputGroup.Text>
                                        <Form.Control
                                            placeholder="Username"
                                            id="username"
                                            name="username"
                                            required={true}
                                            onInput={handleChange}
                                        />
                                    </InputGroup>
                                </Form.Group>
                            )}
                            <Form.Group className="mb-3">
                                <InputGroup>
                                    <InputGroup.Text>
                                        <FontAwesomeIcon
                                            icon={solid("envelope")}
                                        />
                                    </InputGroup.Text>
                                    <Form.Control
                                        placeholder="Email"
                                        id="email"
                                        name="email"
                                        required={true}
                                        onInput={handleChange}
                                    />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <InputGroup>
                                    <InputGroup.Text>
                                        <FontAwesomeIcon icon={solid("key")} />
                                    </InputGroup.Text>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        id="password"
                                        name="password"
                                        required={true}
                                        onInput={handleChange}
                                    />
                                    <Button>
                                        <FontAwesomeIcon icon={solid("eye")} />
                                    </Button>
                                </InputGroup>
                            </Form.Group>
                            {fs.login ? (
                                <Button type="submit">Login</Button>
                            ) : (
                                <Button type="submit">SignUP</Button>
                            )}
                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                    {ss.success && (
                        <Container className="mt-3">
                            <Alert variant="success">{ss.success}</Alert>
                        </Container>
                    )}

                    {ss.error && (
                        <Container className="mt-3">
                            <Alert variant="danger">{ss.error}</Alert>
                        </Container>
                    )}
                </Modal.Dialog>
            </Modal>
        </>
    );
};

export default Authentication;
