import React, { Component } from 'react'
import HikerIcon from '../Icons/HikerIcon'
import MTBIcon from '../Icons/MTBIcon'
import RoadBikeIcon from '../Icons/RoadBikeIcon'
import RunningIcon from '../Icons/RunningIcon'
import moment from 'moment'

class ActivitySummary extends Component {
    getStats(activities, type) {
        var days = 0
        var hours = 0
        var minutes = 0
        var seconds = 0
        var distance = 0
        var totalActivities = 0
        var totalSeconds = 0
        //const lastWeek = moment().subtract(7, 'days').format('YYYY-MM-DD');
        const today = moment().format('YYYY-MM-DD');
        const thisMonth = moment().format('YYYY-MM');

        return (
            <div className="container-fluid">
                <h4 className="text-center">This Month</h4>
                { activities && activities.map(activity => {
                    const activityMonth = moment(activity.date).format('YYYY-MM')
                    if((activity.activity === type) && (activityMonth == thisMonth) && (activity.date <= today)){
                        totalSeconds += parseInt(activity.days)
                        totalSeconds += parseInt(activity.hours)
                        totalSeconds += parseInt(activity.minutes)
                        totalSeconds += parseInt(activity.seconds)
                        {/* days += (parseInt(activity.days) / 86400)
                        hours += parseInt(activity.hours) / 3600
                        minutes += parseInt(activity.minutes) / 60
                        seconds += parseInt(activity.seconds) */}
                        totalActivities += 1;
                        distance += parseFloat(activity.distance)
                    }
                    days = totalSeconds / 86400
                    hours = (totalSeconds - (Math.trunc(days) * 86400)) / 3600
                    minutes = (totalSeconds - (Math.trunc(days) * 86400) - (Math.trunc(hours) * 3600)) / 60
                    seconds = (totalSeconds - (Math.trunc(days) * 86400) - (Math.trunc(hours) * 3600) - (Math.trunc(minutes) * 60))
                })}
                <div className="row pt-3">
                    <div className="offset-md-2 col-md-2">
                        <h5 className="text-center">Total Activities</h5>
                        <h1 className="text-center"> { totalActivities } </h1>
                        <p className="text-center">Recorded</p>
                    </div>
                    <div className="offset-md-1 col-md-2">
                        <h5 className="text-center">Total Duration</h5>
                        <div className="row">
                            <div className="col-md-3">
                                <div className="text-center">
                                    <h1 className="text-center"> { Math.trunc(days) > 0 ? Math.trunc(days) : 0 } </h1>
                                    <p>Days</p>
                                </div>
                            </div>
                            <div className="col-md-3 text-center">
                                <div className="text-center">
                                    <h1 className="text-center"> { Math.trunc(hours) > 0 ? Math.trunc(hours) : 0 } </h1>
                                    <p>Hours</p>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="text-center">
                                    <h1 className="text-center"> { Math.trunc(minutes) > 0 ? Math.trunc(minutes) : 0 } </h1>
                                    <p>Mins</p>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="text-center">
                                    <h1 className="text-center"> { Math.trunc(seconds) > 0 ? Math.trunc(seconds) : 0 } </h1>
                                    <p>Seconds</p>
                                </div>
                            </div>
                        </div>                      
                    </div>
                    <div className="offset-md-1 col-md-2">
                        <h5 className="text-center">Total Distance</h5>
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
