import React, {useState} from "react";
import "../../assets/css/Sidebar.css"
import {Link} from "react-router-dom";

import user_image from "../../assets/images/Ritik_3D_Avtarb.jpg"

import "../../assets/css/profile-viewer-circle.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {solid} from "@fortawesome/fontawesome-svg-core/import.macro";

const Sidebar = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<div className={isOpen ? "sidebar" : "sidebar-mini"}>
				<div className="logo-content">
					<div className="logo">
						<FontAwesomeIcon className={isOpen ? "logo-icon" : "hide"} icon={solid("code")}/>
						<div className={isOpen ? "logo-name" : "hide"}>Code Editor</div>
					</div>
					<button type="button" id="menu-btn" onClick={() => setIsOpen(!isOpen)}>
						<FontAwesomeIcon className="menu-btn-icon" icon={solid("bars")}/>
					</button>
				</div>
				<ul className={isOpen ? "nav-list" : "nav-list__mini"}>
					<li>
						<Link className="links" to="#">
							<FontAwesomeIcon className="links-icon" icon={solid("object-group")}/>
							{isOpen && <span>Dashboard</span>}
						</Link>
					</li>
					<li>
						<Link className="links" to="#">
							<FontAwesomeIcon className="links-icon" icon={solid("object-group")}/>
							{isOpen && <span>Dashboard</span>}
						</Link>
					</li>
					<li>
						<Link className="links" to="#">
							<FontAwesomeIcon className="links-icon" icon={solid("object-group")}/>
							{isOpen && <span>Dashboard</span>}
						</Link>
					</li>
					<li>
						<Link className="links" to="#">
							<FontAwesomeIcon className="links-icon" icon={solid("object-group")}/>
							{isOpen && <span>Dashboard</span>}
						</Link>
					</li>
				</ul>
				<div className="profile-content">
					<div className="profile">
						<div className="profile-details">
							<div className="profile-image">
								<img src={user_image}/>
							</div>
							{isOpen && <div className="name">RITIK DOIJOD</div>}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Sidebar;