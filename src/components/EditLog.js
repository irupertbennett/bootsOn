import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import firebase from 'firebase/app'
import { updateLog } from '../store/actions/activityActions'

class EditLog extends Component {
    state = {
        activity: '',
        location: '',
        camping: null,
        date: '',
        duration: '',
        distance: '',
        route: '',
        id: '',
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
            if(e.target.value === "true"){
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
        var updatedLog = {
            activity: this.state.activity,
            location: this.state.location,
            camping: this.state.camping,
            date: this.state.date,
            duration: this.state.duration,
            distance: this.state.distance,
            route: this.state.route,
            id: this.state.id,
            days: this.state.days,
            hours: this.state.hours,
            minutes: this.state.minutes,
            seconds: this.state.seconds
        }
        this.props.updateLog(updatedLog)
        this.props.history.push('/log')
    }
    async componentDidMount(){
        firebase.firestore().collection('activities').where("id", "==", this.props.id).get()
        .then((snapshot) => {
            snapshot.docs.forEach(doc => {
                this.setState({
                    ...doc.data(),
                    id: this.props.id
                })
            })
        })
        .then(() => {
            this.setState({
                activity: this.props.log.activity,
                location: this.props.log.location,
                camping: this.props.log.camping,
                date: this.props.log.date,
                duration: this.props.log.duration,
                distance: this.props.log.distance,
                route: this.props.log.route,
                id: this.props.id,
                days: this.state.days,
                hours: this.state.hours,
                minutes: this.state.minutes,
                seconds: this.state.seconds
            })
        })
     }
    showCamping(log){
        if((this.state.days + this.state.hours + this.state.minutes + parseInt(this.state.seconds)) > 86400){
            return (<div className="form-group col-md-10 offset-md-1">
                        <label htmlFor="camping">Camping</label>
                        <select defaultValue={ log.camping.toString() } onChange={this.handleChange} className="form-control" id="camping">
                            <option disabled>--Please Select--</option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>
        )} else{
            return null
        }
    }
    showBagWeight(log){
        if(this.state.activity === "Hiking"){
            return (<div className="form-group col-md-10 offset-md-1">
                        <label htmlFor="bagWeight">Bag Weight (Kg)</label>
                        <input className="form-control" defaultValue={log.bagWeight} type="text" id="bagWeight" onChange={ this.handleChange } />
                    </div>
        )} else{
            return null
        }
    }
    render() {
        const { auth, log } = this.props
        if(!auth.emailVerified) return <Redirect to='/SignIn' />
            if(log){
                return (
                    <div className="container">
                    <br />
                        <h3 className="text-center green">EDIT LOG</h3>
                        <form onSubmit={ this.handleSubmit }>
                            <div className="form-group col-md-10 offset-md-1">
                                <label htmlFor="activity">Activity</label>
                                <select defaultValue={ log.activity } onChange={this.handleChange} className="form-control" id="activity">
                                    <option selected disabled>--Please Select--</option>
                                    <option value="Hiking">Hiking</option>
                                    <option value="Mountain Biking">Mountain Biking</option>
                                    <option value="Road Cycling">Road Bike</option>
                                    <option value="Running">Running</option>
                                </select>
                            </div>
                            <div className="form-group col-md-10 offset-md-1">
                                <label htmlFor="location">Location</label>
                                <input className="form-control" id="location" defaultValue={log.location} onChange={ this.handleChange }></input>
                            </div>
                            <div className="form-group col-md-10 offset-md-1">
                                <label htmlFor="route">Route</label>
                                <input className="form-control" id="route" defaultValue={log.route} onChange={ this.handleChange }></input>
                            </div>
                            <div className="form-group col-md-10 offset-md-1">
                                <label htmlFor="duration">Duration</label>
                                <div className="row">
                                    <div className="form-group col-md-2">
                                        <label htmlFor="duration">Days</label>
                                        <input className="form-control" type="number" id="days" name="days" defaultValue={ log.days / 86400 } min="00" max="90" onChange={ this.handleChange } />
                                    </div>
                                    <div className="form-group col-md-2 offset-md-1">
                                        <label htmlFor="duration">Hours</label>
                                        <input className="form-control" type="number" id="hours" name="hours" defaultValue={ log.hours / 3600 } min="00" max="23" onChange={ this.handleChange } />
                                    </div>
                                    <div className="form-group col-md-2 offset-md-1">
                                        <label htmlFor="duration">Minutes</label>
                                        <input className="form-control" type="number" id="minutes" name="minutes" defaultValue={ log.minutes / 60} min="00" max="59" onChange={ this.handleChange } />
                                    </div>
                                    <div className="form-group col-md-2 offset-md-1">
                                        <label htmlFor="duration">Seconds</label>
                                        <input className="form-control" type="number" id="seconds" name="seconds" defaultValue={ log.seconds } min="00" max="59 " onChange={ this.handleChange } />
                                    </div>
                                </div>
                            </div>
                            { this.showCamping(log) }
                            { this.showBagWeight(log) }
                            <div className="form-group col-md-10 offset-md-1">
                                <label htmlFor="date">Date</label>
                                <input className="form-control" id="date"  defaultValue={log.date} onChange={ this.handleChange }></input>
                            </div>
                            <div className="form-group col-md-10 offset-md-1">
                                <label htmlFor="distance">Distance (miles)</label>
                                <input className="form-control" id="distance"  defaultValue={log.distance} onChange={ this.handleChange }></input>
                            </div>
                            
                            <div className="form-group text-center">
                                <button className="btn">UPDATE LOG</button>
                            </div>
                        </form>
                        <br />
                        <br />
                    </div>
                )
            } else {
                return (
                    <div>
                        <h5>Loading..</h5>
                    </div>
                )
            }
            
        } 
    }

    const mapStateToProps = (state, ownProps) => {
        const id = ownProps.match.params.id
        const logs = state.firestore.data.activities
        const log = logs ? logs[id] : null
        return {
            auth: state.firebase.auth,
            log: log,
            id: id
        }
    }

    const mapDispatchtoProps = (dispatch) => {
        return {
            updateLog: (updatedLog) => dispatch(updateLog(updatedLog))
        }
    }
    
   
    export default compose(
        connect(mapStateToProps,mapDispatchtoProps),
        firestoreConnect([
            { collection: 'activities'}
        ])
    )(EditLog)
