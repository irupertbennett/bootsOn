import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'

const SignedInLinks = (props) => {
    
    function action() { 
        props.action()
    }

    return (
        <div className="collapse navbar-collapse w-100" id="navbarSupportedContent">
            <ul className="navbar-nav w-100 justify-content-center">  
                <li className="nav-item" onClick={action}><NavLink className="nav-link px-4 text-md-center" to='/account'><i className="fa fa-user" aria-hidden="true"></i><span className="d-md-block d-sm-inline pl-xs-2"><span className="pl-3 d-md-none"></span>ACCOUNT</span></NavLink></li>
                <li className="nav-item" onClick={action}><NavLink className="nav-link px-4 text-md-center" to='/log'><i className="fas fa-shoe-prints"></i><span className="d-md-block d-sm-inline"><span className="pl-3 d-md-none"></span>LOGS</span></NavLink></li>
                <li className="nav-item" onClick={action}><NavLink className="nav-link px-4 text-md-center" to='/backpackv2'><i className="fas fa-suitcase"></i><span className="d-md-block d-sm-inline"><span className="pl-3 d-md-none"></span>PACK</span></NavLink></li>
                <li className="nav-item" onClick={action}><NavLink className="nav-link px-4 text-md-center" to='/gear'><i className="fas fa-hiking" aria-hidden="true"></i><span className="d-md-block d-sm-inline"><span className="pl-3 d-md-none"></span>GEAR</span></NavLink></li>
            </ul>
            <ul className="navbar-nav ml-auto w-100 justify-content-end">
                <li className="nav-item" onClick={action}><a className="nav-link px-4 text-md-center text-white" onClick={ props.signOut }><i className="fa fa-sign-out" aria-hidden="true"></i><span className="d-md-block d-sm-inline"><span className="pl-3 d-md-none"></span>LOG OUT</span></a></li>
            </ul>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(null,mapDispatchToProps)(SignedInLinks)