import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { signUp } from '../../store/actions/authActions'

class Register extends Component {
    state = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        confirmPassword: '',
        errors: {},
        input: {}
    }
    handleChange = (e) => {
        let input = this.state.input;
        input[e.target.id] = e.target.value;
        this.setState({
            [e.target.id]: e.target.value,
            input
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        if(this.validate()){
            let input = {};
            input["name"] = "";
            input["email"] = "";
            input["password"] = "";
            input["confirmPassword"] = "";
            this.props.signUp(this.state);
        }
    }
    validate(){
        let input = this.state.input;
        let errors = {};
        let isValid = true;
    
        if (!input["email"]) {
          isValid = false;
          errors["email"] = "Please enter your email Address.";
        }
    
        if (typeof input["email"] !== "undefined") {
            
          var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
          if (!pattern.test(input["email"])) {
            isValid = false;
            errors["email"] = "Please enter a valid email address.";
          }
        }
    
        if (!input["password"]) {
          isValid = false;
          errors["password"] = "Please enter a password.";
        }
    
        if (input["password"].length < 6) {
          isValid = false;
          errors["password"] = "Your password must be at least 6 characters";
        }
    
        if (!input["confirmPassword"]) {
          isValid = false;
          errors["confirmPassword"] = "Please confirm your password.";
        }
    
        if (typeof input["password"] !== "undefined" && typeof input["confirmPassword"] !== "undefined") {
            
          if (input["password"] !== input["confirmPassword"]) {
            isValid = false;
            errors["password"] = "Your passwords don't match.";
          }
        } 
    
        this.setState({
          errors: errors
        });
    
        return isValid;
      }
    render() {
        const { authError, auth } = this.props
        if(auth.emailVerified) return <Redirect to='/account' />
        return (
            <div className="container pt-5">
                <form onSubmit={this.handleSubmit}>
                    <h3 className="text-center">Welcome! Register an account to get started</h3>
                    <div className="form-group col-md-10 offset-md-1">
                        <label htmlFor="email"><span className="auth-error">*</span>Email</label>
                        <input className="form-control" type="email" id='email' autoComplete="on" onChange={this.handleChange} />
                        <div className="text-danger">{this.state.errors.email}</div>
                    </div>
                    <div className="form-group col-md-10 offset-md-1">
                        <label htmlFor="password"><span className="auth-error">*</span>Password</label>
                        <input className="form-control" type="password" id='password' autoComplete="on"  onChange={this.handleChange} required="required"/>
                        <div className="text-danger">{this.state.errors.password}</div>
                    </div>
                    <div className="form-group col-md-10 offset-md-1">
                        <label htmlFor="password"><span className="auth-error">*</span>Retype Password</label>
                        <input className="form-control" type="password" id='confirmPassword' autoComplete="on" onChange={this.handleChange} />
                        <div className="text-danger">{this.state.errors.confirmPassword}</div>
                    </div>
                    <div className="form-group col-md-10 offset-md-1">
                        <label htmlFor="firstName">First Name</label>
                        <input className="form-control" type="text" id='firstName' autoComplete="on" onChange={this.handleChange} />
                        <div className="text-danger">{this.state.errors.firstName}</div>
                    </div>
                    <div className="form-group col-md-10 offset-md-1">
                        <label htmlFor="lastName">Last Name</label>
                        <input className="form-control" type="text" id='lastName' autoComplete="on" onChange={this.handleChange} />
                        <div className="text-danger">{this.state.errors.lastName}</div>
                    </div>
                    <div className="form-group text-center">
                        <button className="text-center btn register-btn z-depth-0">Sign Up</button>
                        <div className="auth-error text-center">
                        { authError? <p>{ authError }</p> : null }
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        authError: state.auth.authError
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        signUp: (newUser) => dispatch(signUp(newUser))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)
