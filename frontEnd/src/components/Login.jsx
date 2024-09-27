import React from 'react'
// import { Link } from 'react-router-dom';
import "../css/Login.css"

export default function Login() {
    return (
        <>
            <div className="main__wrapper">
                <div className="wrapper_login" id="log">
                    <form role="form" method="post" className='form_login' >
                        <h2>Login</h2>

                        <div className="inputbox">
                            <input
                                type="email"
                                placeholder="User Name / Email"
                                style={{background: 'transparent'}}
                                name="email"
                                id="email"
                            />
                            <i className="fa-solid fa-user"></i>
                        </div>

                        <div className="inputbox">
                            <input
                                type="password"
                                placeholder="Password"
                                style={{background: 'transparent'}}
                                name="password"
                                id="pswd"
                            />
                            <i className="fa-solid fa-lock"></i>
                        </div>

                        <button className="btn1" type="submit">
                            <a className="account__btn">Login</a>
                        </button>

                        <div className="reminber">
                            <p style={{color: "#fff"}}>
                                Create an Account?
                                <a  style={{color: '#FE0094'}}>&nbsp; Signup</a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
