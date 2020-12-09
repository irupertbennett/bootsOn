import React, { Component } from 'react'
import HikerIcon from '../Icons/HikerIcon'
import MTBIcon from '../Icons/MTBIcon'
import RoadBikeIcon from '../Icons/RoadBikeIcon'
import RunningIcon from '../Icons/RunningIcon'
import moment from 'moment'

class ActivitySummary extends Component {
    getStats(activities, type) {
        console.log(activities)
        var duration = 0
        var distance = 0
        var totalActivities = 0
        const lastWeek = moment().subtract(7, 'days').format('YYYY-MM-DD');
        const today = moment().format('YYYY-MM-DD');
        const thisMonth = moment().format('YYYY-MM');

        return (
            <div className="container-fluid">
                <h4 className="text-center">This Month</h4>
                { activities && activities.map(activity => {
                    const activityMonth = moment(activity.date).format('YYYY-MM')
                    if((activity.activity === type) && (activityMonth == thisMonth) && (activity.date <= today)){
                        duration += parseInt(activity.duration)
                        totalActivities += 1;
                    }
                })}
                <div className="row">
                    <div className="offset-md-3 col-md-2">
                        <p className="text-center">Total Activities</p>
                        <h1 className="text-center"> { totalActivities } </h1>
                        <p className="text-center"></p>
                    </div>
                    <div className="col-md-2">
                        <p className="text-center">Total Duration</p>
                        <h1 className="text-center"> { duration } </h1>
                        <p className="text-center">Hours</p>
                    </div>
                    <div className="col-md-2">
                        <p className="text-center">Total Distance</p>
                        <h1 className="text-center"> { distance } </h1>
                        <p className="text-center">Miles</p>
                    </div>
                </div>
            </div>
        )
    }
    render() {
        var activities = this.props.activities
        return (
            <div className="activitySummary offset-md-1 col-md-10 mb-4">
                <ul className="nav-justified nav nav-pills mb-3" id="pills-tab" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link active" id="hiking-tab-tab" data-toggle="pill" href="#hiking-tab" role="tab" aria-controls="hiking-tab" aria-selected="true"><HikerIcon /></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="mtb-tab-tab" data-toggle="pill" href="#mtb-tab" role="tab" aria-controls="mtb-tab" aria-selected="false"><MTBIcon /> </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="road-tab-tab" data-toggle="pill" href="#road-tab" role="tab" aria-controls="road-tab" aria-selected="false"><RoadBikeIcon/></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" id="running-tab-tab" data-toggle="pill" href="#running-tab" role="tab" aria-controls="running-tab" aria-selected="false"><RunningIcon/></a>
                    </li>
                </ul>
                <div className="tab-content" id="pills-tabContent">
                    <div className="tab-pane fade show active" id="hiking-tab" role="tabpanel" aria-labelledby="hiking-tab-tab">
                        { this.getStats(activities, "Hiking") }
                    </div>
                    <div className="tab-pane fade" id="mtb-tab" role="tabpanel" aria-labelledby="mtb-tab-tab">
                        { this.getStats(activities, "Mountain Biking") }
                    </div>
                    <div className="tab-pane fade" id="road-tab" role="tabpanel" aria-labelledby="road-tab-tab">
                        { this.getStats(activities, "Road Cycling") }
                    </div>
                    <div className="tab-pane fade" id="running-tab" role="tabpanel" aria-labelledby="running-tab-tab">
                        { this.getStats(activities, "Running") }
                    </div>
                </div>
            </div>
        )
    }
}

export default ActivitySummary
