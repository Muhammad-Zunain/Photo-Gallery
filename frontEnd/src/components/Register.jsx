import React from 'react'
import "../css/Register.css"

function Register() {
    return (
        <>
            <div className="main__wrapper">
                <div className="wrapper_register" id="log">
                    <form method="post" action="" role="form" className='form_register'>
                        <h2>Signup</h2>

                        <div className="inputbox">
                            <input
                                type="text"
                                placeholder="First name"
                                style={{background: 'transparent'}}
                                id="first_name"
                                name="first_name"
                            />
                            <i className="fa-solid fa-user"></i>
                        </div>

                        <div className="inputbox">
                            <input
                                type="text"
                                placeholder="Last name"
                                style={{background: 'transparent'}}
                                id="last_name"
                                name="last_name"
                            />
                            <i className="fa-solid fa-user"></i>
                        </div>
                        <div className="inputbox">
                            <input
                                type="text"
                                placeholder="User name"
                                style={{background: 'transparent'}}
                                id="user_name"
                                name="user_name"
                            />
                            <i className="fa-solid fa-user"></i>
                        </div>
                        <div className="inputbox">
                            <input
                                type="email"
                                placeholder="Email"
                                id="email"
                                name="email"
                                style={{background: 'transparent'}}
                            />
                            <i className="fa-solid fa-envelope"></i>
                        </div>

                        <div className="inputbox">
                            <input
                                type="password"
                                placeholder="Password"
                                id="password"
                                name="password"
                                style={{background: 'transparent'}}
                            />
                            <i className="fa-solid fa-lock"></i>
                        </div>

                        <button className="btn1" type="submit">
                            <a className="account__btn">Signup</a>
                        </button>

                        <div className="remember">
                            <p style={{color: "#fff"}}>
                                Have an Account?
                                <a href="" style={{color: "#FE0094"}}>&nbsp; Login</a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register