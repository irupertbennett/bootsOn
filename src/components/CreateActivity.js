import React, { Component } from 'react'
import { createActivity } from '../store/actions/activityActions'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class CreateActivity extends Component {
    state = {
        activity: '',
        location: '',
        route: '',
        duration: '',
        camping: '',
        bagWeight: '',
        date: '',
        distance: ''
    }
    handleChange = (e) => {
        console.log(e.target.value)
        this.setState({
            [e.target.id]: e.target.value
        })
        console.log(this.state)
    }
    handleSubmit = (e) => {
        e.preventDefault()
        this.props.createActivity(this.state)
        this.props.history.push('/log')
    }
    componentDidMount() {
        window.scrollTo(0, 0)
    }
    render() {
        const { auth } = this.props
        if(!auth.emailVerified) return <Redirect to='/SignIn' />
        return (
            <div className="container">
                <br />
                <h3 className="text-center green">LOG ACTIVITY</h3>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group col-md-10 offset-md-1">
                        <label htmlFor="activity">Activity</label>
                        <select onChange={this.handleChange} className="form-control" id="activity">
                            <option selected disabled>--Please Select--</option>
                            <option value="Hiking">Hiking</option>
                            <option value="Mountain Biking">Mountain Biking</option>
                            <option value="Road Cycling">Road Bike</option>
                            <option value="Running">Running</option>
                        </select>
                    </div>
                    <div className="form-group col-md-10 offset-md-1">
                        <label htmlFor="location">Location</label>
                        <input className="form-control" type="text" id="location" onChange={ this.handleChange } />
                    </div>
                    <div className="form-group col-md-10 offset-md-1">
                        <label htmlFor="route">Route</label>
                        <input className="form-control" type="text" id="route" onChange={ this.handleChange } />
                    </div>
                    <div className="form-group col-md-10 offset-md-1">
                        <label htmlFor="duration">Duration</label>
                        <input className="form-control" type="text" id="duration" onChange={ this.handleChange } />
                    </div>
                    <div className="form-group col-md-10 offset-md-1">
                        <label htmlFor="camping">Camping</label>
                        <select onChange={this.handleChange} className="form-control" id="camping">
                            <option selected disabled>--Please Select--</option>
                            <option value="1">Yes</option>
                            <option value="0">No</option>
                        </select>
                    </div>
                    <div className="form-group col-md-10 offset-md-1">
                        <label htmlFor="bagWeight">Bag Weight</label>
                        <input className="form-control" type="text" id="bagWeight" onChange={ this.handleChange } />
                    </div>
                    <div className="form-group col-md-10 offset-md-1">
                        <label htmlFor="date">Date</label>
                        <input className="form-control" type="date" id="date" onChange={ this.handleChange } />
                    </div>
                    <div className="form-group col-md-10 offset-md-1">
                        <label htmlFor="distance">Distance</label>
                        <input className="form-control" type="text" id="distance" onChange={ this.handleChange } />
                    </div>
                    <div className="form-group text-center">
                        <button className="btn register-btn">Create</button>
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
        auth: state.firebase.auth
    }
}

const mapDispatchtoProps = (dispatch) => {
    return {
        createActivity: (activity) => dispatch(createActivity(activity))
    }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(CreateActivity)
