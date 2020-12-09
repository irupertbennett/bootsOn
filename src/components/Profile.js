import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import RecentActivities from './RecentActivities'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import ActivitySummary from './ActivitySummary'
import ProfileCard from './ProfileCard'

export class Profile extends Component {
    componentDidMount() {
        window.scrollTo(0, 0)
    }
    render() {
        const { activities, auth, profile } = this.props
        
        if(!auth.emailVerified) return <Redirect to='/SignIn' />
        
        profile.id = (this.props.auth.uid ? this.props.auth.uid : null)

        return (
            <div className="pt-2">
                <ProfileCard profile={profile} />

                <ActivitySummary activities={activities} />

                <RecentActivities activities={activities} />
                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        activities: state.firestore.ordered.activities,
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect((props) => {
        const id = props.auth.uid? props.auth.uid : null
        return[
        { 
            collection: 'activities', 
            where:[
                ['createdBy', '==', id]
            ]
        }
    ]})
)(Profile)
