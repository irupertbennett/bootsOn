import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { signIn } from '../../store/actions/authActions'

class SignIn extends Component {
    state = {
        email: '',
        password: ''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        this.props.signIn(this.state);
    }
    render() {
        const { authError, auth } = this.props
        if(auth.emailVerified) return <Redirect to='/account' />
        return (
            <div className="container pt-5">
                <form onSubmit={this.handleSubmit}>
                    <h3 className="text-center">Sign In</h3>
                    <div className="form-group col-md-10 offset-md-1">
                        <label htmlFor="email">Email</label>
                        <input className="form-control" type="email" id="email" onChange={ this.handleChange } />
                    </div>
                    <div className="form-group col-md-10 offset-md-1">
                        <label htmlFor="password">Password</label>
                        <input className="form-control" type="password" id="password" onChange={ this.handleChange } />
                    </div>
                    <Link className="text-center" to="/resetPassword"><p>Forgoten Password?</p></Link>
                    <div className="form-group text-center">
                        <button className="btn register-btn">Login</button>
                        <div className="auth-error text-center">
                        { authError ? authError==="Thank you for signing up! An email has be sent to your account, please follow the instructions there."? null: <p>{ authError }</p> : null }
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (credentials) => dispatch(signIn(credentials))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
