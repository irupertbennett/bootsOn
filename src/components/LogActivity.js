import React, { Component } from 'react'
import { logActivity } from '../store/actions/activityActions'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class LogActivity extends Component {
    state = {
        activity: '',
        location: '',
        route: '',
        duration: '',
        camping: null,
        bagWeight: '',
        date: '',
        distance: '',
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    }
    handleChange = (e) => {
        if([e.target.id] == "days"){
            this.setState({
                [e.target.id]: parseInt(e.target.value) * 86400
            })
        } else if([e.target.id] == "hours"){
            this.setState({
                [e.target.id]: parseInt(e.target.value) * 3600
            })
        } else if([e.target.id] == "minutes"){
            this.setState({
                [e.target.id]: parseInt(e.target.value) * 60
            })
        } else if([e.target.id] == "camping"){
            if(e.target.value === "1"){
                this.setState({
                    [e.target.id]: true
                })
            } else {
                this.setState({
                    [e.target.id]: false
                })
            }
        } else {
            this.setState({
                [e.target.id]: e.target.value
            })
        }
    }
    handleSubmit = (e) => {
        e.preventDefault()
        this.props.logActivity(this.state)
        this.props.history.push('/log')
    }
    componentDidMount() {
        window.scrollTo(0, 0)
    }
    showCamping(){
        if((this.state.days + this.state.hours + this.state.minutes + parseInt(this.state.seconds)) > 86400){
            return (<div className="form-group col-md-10 offset-md-1">
                        <label htmlFor="camping">Camping</label>
                        <select onChange={this.handleChange} className="form-control" id="camping">
                            <option selected disabled>--Please Select--</option>
                            <option value="1">Yes</option>
                            <option value="0">No</option>
                        </select>
                    </div>
        )} else{
            return null
        }
    }
    showBagWeight(){
        if(this.state.activity === "Hiking"){
            return (<div className="form-group col-md-10 offset-md-1">
                        <label htmlFor="bagWeight">Bag Weight (Kg)</label>
                        <input className="form-control" type="text" id="bagWeight" onChange={ this.handleChange } />
                    </div>
        )} else{
            return null
        }
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
                    {/* <div className="form-group col-md-10 offset-md-1">
                        <label htmlFor="duration">Duration</label>
                        <input className="form-control" type="time" id="duration" onChange={ this.handleChange } />
                    </div> */}
                    <div className="form-group col-md-10 offset-md-1">
                        <label htmlFor="duration">Duration</label>
                        <div className="row">
                            <div className="form-group col-md-2">
                                <label htmlFor="duration">Days</label>
                                <input className="form-control" type="number" id="days" name="days" defaultValue="0" min="00" max="90" onChange={ this.handleChange } />
                            </div>
                            <div className="form-group col-md-2 offset-md-1">
                                <label htmlFor="duration">Hours</label>
                                <input className="form-control" type="number" id="hours" name="hours" defaultValue="0" min="00" max="23" onChange={ this.handleChange } />
                            </div>
                            <div className="form-group col-md-2 offset-md-1">
                                <label htmlFor="duration">Minutes</label>
                                <input className="form-control" type="number" id="minutes" name="minutes" defaultValue="0" min="00" max="59" onChange={ this.handleChange } />
                            </div>
                            <div className="form-group col-md-2 offset-md-1">
                                <label htmlFor="duration">Seconds</label>
                                <input className="form-control" type="number" id="seconds" name="seconds" defaultValue="0" min="00" max="59" onChange={ this.handleChange } />
                            </div>
                        </div>
                    </div>
                    { this.showCamping() }
                    { this.showBagWeight() }
                    <div className="form-group col-md-10 offset-md-1">
                        <label htmlFor="date">Date</label>
                        <input className="form-control" type="date" id="date" onChange={ this.handleChange } />
                    </div>
                    <div className="form-group col-md-10 offset-md-1">
                        <label htmlFor="distance">Distance (miles)</label>
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
        logActivity: (activity) => dispatch(logActivity(activity))
    }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(LogActivity)
