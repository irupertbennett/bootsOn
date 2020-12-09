import React from 'react'
import { Link } from 'react-router-dom'
import SignedOutLinks from './Links/SignedOutLinks'
import { connect } from 'react-redux'
import SignedInLinks from './Links/SignedInLinks'
import AdminSignedInLinks from './Links/AdminSignedInLinks'

const Navbar = (props) => {
    
    function closeNav() { 
        var elements = document.getElementById('navbarSupportedContent')
        if(elements)
        elements.classList.remove('show') 
    }
    
    const { auth, profile } = props;
    const links = auth.emailVerified ? profile.accountType === 1 ? <AdminSignedInLinks action={closeNav}/> : <SignedInLinks action={closeNav}/> : <SignedOutLinks action={closeNav}/>

    return (
        <nav className="navbar navbar-expand-md">
            <Link className="navbar-brand d-flex w-50 mr-auto" to="/">
                <img id="togglenavimage" src="apple-touch-icon-57x57.png" alt="BootsOn" ></img>
            </Link>
           <button className="navbar-toggler custom-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            { links }    
        </nav>
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps)(Navbar)