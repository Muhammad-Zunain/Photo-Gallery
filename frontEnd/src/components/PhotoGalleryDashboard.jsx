import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import "../css/PhotoDashboard.css";
import profile from "../assets/profile.jpg";
import '@fortawesome/fontawesome-free/css/all.min.css';

function PhotoGalleryDashboard() {
    return (
        <section className="photogallery">
            <div className="main__user__dashboard">
                <div className="profile__dashboard">
                    <div className="profile__view">
                        <img src={profile} alt="profile" />
                        <h4>muhammadzunain7</h4>
                        <p>muhammadzunain@gmail.com</p>
                    </div>

                    <ul className="select__view">
                        <li>
                            <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'buttonActive' : '')} end>
                                <i className="fas fa-house-chimney"></i>
                                Dashboard
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/reviews" className={({ isActive }) => (isActive ? 'buttonActive' : '')}>
                                <i className="fas fa-user"></i>
                                Reviews
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/upload-photo" className={({ isActive }) => (isActive ? 'buttonActive' : '')} id="user-upload">
                                <i className="fas fa-upload"></i>
                                Upload Photo
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/signout" className={({ isActive }) => (isActive ? 'buttonActive' : '')} id="user-signout">
                                <i className="fas fa-right-from-bracket"></i>
                                Sign Out
                            </NavLink>
                        </li>
                    </ul>
                </div>

                <div className="photo__dashboard">
                    <Outlet />
                </div>
            </div>
        </section>
    );
}

export default PhotoGalleryDashboard;
