import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import moment from 'moment'
import Footsteps from './Loaders/Footsteps'

const LogDetails = (props) => {
    const { activities, id } = props;
    var activity = null 
    activities && activities.map(a => {
        if(a.id === id){
            activity = a
        }
    })
    console.log(activity)
    if(activity){
        return(
            <div className="container project-details">
                <div className="card text-center">
                    <div className="card-body">
                        <h5 className="card-title">Activity Details</h5>
                        <p className="card-text">Location: { activity.location }</p>
                        <p className="card-text">Duration: { activity.duration }</p>
                        <p className="card-text">Camping: { activity.camping }</p>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="container center">
                <Footsteps />
            </div>    
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id
    const activities = state.firestore.ordered.activities
    return {
        activities: activities,
        id: id
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'activities'}
    ])
)(LogDetails)
