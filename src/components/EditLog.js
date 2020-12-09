import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import firebase from 'firebase'
import { updateLog } from '../store/actions/activityActions'

class EditLog extends Component {
    state = {
        activity: '',
        location: '',
        camping: '',
        date: '',
        duration: '',
        distance: '',
        route: '',
        id: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        })
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
            id: this.state.id
        }
        console.log(updatedLog)
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
                id: this.props.id
            })
        })
     }
    render() {
        const { auth, log } = this.props
        if(!auth.emailVerified) return <Redirect to='/SignIn' />
            if(log){
                return (
                    <div className="container">
                    <br />
                        <h1 className="text-center">EDIT LOG</h1>
                        <form onSubmit={ this.handleSubmit }>
                            <div className="form-group col-md-10 offset-md-1">
                                <label htmlFor="activity">Activity</label>
                                <input className="form-control" type="text" id="activity" defaultValue= {log.activity} onChange={ this.handleChange }/>
                            </div>
                            <div className="form-group col-md-10 offset-md-1">
                                <label htmlFor="bagWeight">Bag Weight</label>
                                <input className="form-control" type="text" id="bagWeight" defaultValue= {log.bagWeight} onChange={ this.handleChange }/>
                            </div>
                            <div className="form-group col-md-10 offset-md-1">
                                <label htmlFor="camping">Camping</label>
                                <input className="form-control" id="camping"  defaultValue={log.camping} onChange={ this.handleChange }></input>
                            </div>
                            <div className="form-group col-md-10 offset-md-1">
                                <label htmlFor="date">Date</label>
                                <input className="form-control" id="date"  defaultValue={log.date} onChange={ this.handleChange }></input>
                            </div>
                            <div className="form-group col-md-10 offset-md-1">
                                <label htmlFor="duration">Duration</label>
                                <input className="form-control" id="duration" defaultValue={log.duration} onChange={ this.handleChange }></input>
                            </div>
                            <div className="form-group col-md-10 offset-md-1">
                                <label htmlFor="distance">Distance</label>
                                <input className="form-control" id="distance"  defaultValue={log.distance} onChange={ this.handleChange }></input>
                            </div>
                            <div className="form-group col-md-10 offset-md-1">
                                <label htmlFor="location">Location</label>
                                <input className="form-control" id="location" defaultValue={log.location} onChange={ this.handleChange }></input>
                            </div>
                            <div className="form-group col-md-10 offset-md-1">
                                <label htmlFor="route">Route</label>
                                <input className="form-control" id="route" defaultValue={log.route} onChange={ this.handleChange }></input>
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
