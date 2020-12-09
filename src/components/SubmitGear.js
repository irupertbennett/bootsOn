import React, { Component } from 'react'
import { submitGear } from '../store/actions/gearActions'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

class SubmitGear extends Component {
    state = {
        type: '',
        make: '',
        model: '',
        size: '',
        weight: '',
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handleSubmit = (e, profile) => {
        e.preventDefault()
        axios.post(
            'https://us-central1-hikingapp-af497.cloudfunctions.net/sendMail?dest=irupertbennett@gmail.com',
            {   type: this.state.type,
                make: this.state.make,
                model: this.state.model,
                size: this.state.size,
                weight: this.state.weight,
                firstName: profile.firstName,
                lastName: profile.lastName,
                email: profile.email
            }
        ).then(res => {
            this.props.submitGear(res)
        })
        this.props.history.push('/log')
    }
    componentDidMount() {
        window.scrollTo(0, 0)
    }
    render() {
        const { auth, profile } = this.props
        if(!auth.emailVerified) return <Redirect to='/SignIn' />
        return (
            <div className="container">
                <br />
                <h3 className="text-center green">Submit Gear</h3>
                <form onSubmit={(e) => this.handleSubmit(e, profile) }>
                    <div className="form-group col-md-10 offset-md-1">
                        <label htmlFor="type">Type</label>
                        <select onChange={this.handleChange} className="form-control" id="type">
                            <option selected disabled>--Please Select--</option>
                            <option value="Bags">Bags</option>
                            <option value="Tents/Tarps">Tents/Tarps</option>
                            <option value="Sleeping">Sleeping</option>
                            <option value="Clothing">Clothing</option>
                            <option value="Cooking">Cooking</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="form-group col-md-10 offset-md-1">
                        <label htmlFor="make">Make</label>
                        <input className="form-control" type="text" id="make" onChange={ this.handleChange } />
                    </div>
                    <div className="form-group col-md-10 offset-md-1">
                        <label htmlFor="model">Model</label>
                        <input className="form-control" type="text" id="model" onChange={ this.handleChange } />
                    </div>
                    <div className="form-group col-md-10 offset-md-1">
                        <label htmlFor="size">Size</label>
                        <input className="form-control" type="text" id="size" onChange={ this.handleChange } />
                    </div>
                    <div className="form-group col-md-10 offset-md-1">
                        <label htmlFor="weight">Weight</label>
                        <input className="form-control" type="text" id="weight" onChange={ this.handleChange } />
                    </div>
                    <div className="form-group text-center">
                        <button className="btn register-btn">Submit</button>
                    </div>
                </form>
                <br />
                <br />
            </div>
        )
    }
}

const mapStatetoProps = (state) => {
    return{
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

const mapDispatchtoProps = (dispatch) => {
    return {
        submitGear: (gear) => dispatch(submitGear(gear))
    }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(SubmitGear)
