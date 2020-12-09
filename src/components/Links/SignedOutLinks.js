import React from 'react'
import { NavLink } from 'react-router-dom'

const SignedOutLinks = (props) => {
    return (
        <div className="collapse navbar-collapse w-100" id="navbarSupportedContent">
            <ul className="navbar-nav w-100 justify-content-center">  
                <li className="nav-item"><NavLink className="nav-link text-md-center" to='/'><i className="fas fa-home" aria-hidden="true"></i><span className="d-md-block d-sm-inline"><span className="pl-3 d-md-none"></span>HOME</span></NavLink></li>
            </ul>
            <ul className="navbar-nav ml-auto w-100 justify-content-end">
                <li className="nav-item"><NavLink className="nav-link text-md-center" to='/register'><i className="far fa-edit" aria-hidden="true"></i><span className="d-md-block d-sm-inline"><span className="pl-3 d-md-none"></span>REGISTER</span></NavLink></li>
                <li className="nav-item"><NavLink className="nav-link text-md-center" to='/SignIn'><i className="fas fa-sign-in-alt" aria-hidden="true"></i><span className="d-md-block d-sm-inline"><span className="pl-3 d-md-none"></span>SIGN IN</span></NavLink></li>
            </ul>
        </div>
    )
}

export default SignedOutLinks