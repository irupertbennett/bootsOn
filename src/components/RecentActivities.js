import React, { Component } from 'react'
import HikerIcon from '../Icons/HikerIcon'
import RoadBikeIcon from '../Icons/RoadBikeIcon'
import MTBIcon from '../Icons/MTBIcon'
import RunningIcon from '../Icons/RunningIcon'
import { Link } from 'react-router-dom'

class RecentActivities extends Component {
    getIcon(activity){
        if(activity === "Hiking")
            return <HikerIcon />
        else if (activity === "Running")
            return <RunningIcon />
        else if (activity === "Road Cycling")
            return <RoadBikeIcon />
        else if (activity === "Mountain Biking")
            return <MTBIcon />
    }
    render() {
        var activities = this.props.activities? this.props.activities.map((activity) => {
            return (
                <tr>
                    <td>{ this.getIcon(activity.activity) }</td>
                    <Link to={"/logDetails/" + activity.id} className=""><td className="pl-4 text-white">{activity.location}</td></Link>
                </tr>
                    
            )
        }) : "No activities to display yet - head over the the logs page and add you recent activities"
        return (
            <div className="container-fluid bg-secondary text-white py-4">
                <div className="offset-md-1 col-md-8">
                    <h3>RECENT ACTIVITIES</h3>
                    <table>
                        <tbody>
                            { activities }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default RecentActivities
