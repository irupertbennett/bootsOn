import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Link, Redirect } from 'react-router-dom'
import { compose } from 'redux'
import moment from "moment"
import { removeLog } from '../store/actions/activityActions'
import HikerIcon from '../Icons/HikerIcon'
import RoadBikeIcon from '../Icons/RoadBikeIcon'
import MTBIcon from '../Icons/MTBIcon'
import RunningIcon from '../Icons/RunningIcon'

class log extends Component {
    state={
        searchActivity: null,
        searchLocation: null,
        searchRoute: null,
        searchDuration: null,
        searchCamping: null,
        searchBagWeight: null,
        searchDate: null,
        searchDistance: null
    }

    searchActivity=(e)=>{
        let keyword = e.target.value;
        this.setState({searchActivity:keyword})
    }
    searchLocation=(e)=>{
        let keyword = e.target.value;
        this.setState({searchLocation:keyword})
    }
    removeLog = (e) => {
        this.props.removeLog(e.target.parentNode.parentNode.id)
    }
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
        const { activities, auth } = this.props
        if(!auth.emailVerified) return <Redirect to='/SignIn' />
        const items = activities && activities.filter((data)=>{
            if((this.state.searchActivity == null) || (this.state.searchActivity === "All")){
                return data
            } 
            else if(data.activity.toLowerCase().includes(this.state.searchActivity.toLowerCase())){
                    return data
            }
        }).map((data,index)=>{
            var days = data.days / 86400
            var hours = data.hours / 3600
            var minutes = data.minutes / 60

            return(
            <tr key={data.id} id={data.id}>
                    <th scope="row">{ index+1 }</th>
                    <td>{ this.getIcon(data.activity) }</td>
                    <td>{data.location}</td>
                    <td>{data.route}</td>
                    <td>{days > 0? days + " days" : null} {days > 0 ? hours > 0 ? hours + " hours" : null : hours > 0 ? hours + " hours" : null} {minutes > 0 ? minutes + " minutes" : null} {data.seconds > 0 ? data.seconds + " seconds": null}</td>
                    <td>{data.camping === true ? "Yes" : "No"}</td>
                    <td>{data.bagWeight}</td>
                    <td>{moment(data.date).format('DD-MM-YYYY')}</td>
                    <td>{data.distance}</td>
                    <td onClick={ this.removeLog }><i className="fa fa-trash" aria-hidden="true"></i></td>
                    <td><a href={'/editLog/' + data.id}><i className="fa fa-pencil" aria-hidden="true"></i></a></td>
                </tr>
            )
        })
        return (
            <div>
                <img id="togglenavimage" className="header-image" src="Image_placeholder_1920_650.jpg" alt="BootsOn" ></img>
                <h1 className="text-center green pt-3">LOGS</h1>
                <div className="">
                    <div className="container pt-3">
                        <label className="green"><b>FILTER LOGS</b></label>
                        <form>
                            <div className="offset-md-1 col-md-10 col-sm-10 offset-sm-1">
                                <div className="form-row">
                                    <div className="form-group col-md-3 col-sm-12">
                                        <select onChange={(e)=>this.searchActivity(e)} className="form-control" id="inputGroupSelect01" placeholder="Activity">
                                            <option value="All">All</option>
                                            <option value="Hiking">Hiking</option>
                                            <option value="mtb">Mountain Biking</option>
                                            <option value="road">Road Bike</option>
                                            <option value="Running">Running</option>
                                        </select>
                                    </div>
                                    <div className="form-group col-md-2 col-sm-12">
                                        <label className="sr-only" htmlFor="inlineFormInput">Location</label>
                                        <input onChange={(e)=>this.searchActivity(e)} type="text" className="form-control" id="inlineFormInput" placeholder="Location" />
                                    </div>
                                    <div className="form-group col-md-2 col-sm-12">
                                        <label className="sr-only" htmlFor="inlineFormInput">distance</label>
                                        <input onChange={(e)=>this.searchLocation(e)} type="text" className="form-control" id="inlineFormInput" placeholder="Distance" />
                                    </div>
                                    <div className="form-group col-md-2 col-sm-12">
                                        <label className="sr-only" htmlFor="inlineFormInput">Date From</label>
                                        <input onChange={(e)=>this.searchSpace(e)} type="text" className="form-control" id="inlineFormInput" placeholder="Date From" />
                                    </div>
                                    <div className="form-group col-md-2 col-sm-12">
                                        <label className="sr-only" htmlFor="inlineFormInput">Date To</label>
                                        <input onChange={(e)=>this.searchSpace(e)} type="text" className="form-control" id="inlineFormInput" placeholder="Date To" />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="container pt-3">
                        <label className="green"><b>MY LOGS</b></label>
                        <div className="container all-borders">
                            <div className="table-responsive-sm">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Activity</th>
                                            <th scope="col">Location</th>
                                            <th scope="col">Route</th>
                                            <th scope="col">Duration</th>
                                            <th scope="col">Camping</th>
                                            <th scope="col">Bag Weight (kg)</th>
                                            <th scope="col">Date</th>
                                            <th scope="col">Distance</th>
                                            <th scope="col"></th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { items }
                                    </tbody>
                                </table>
                            </div>
                            <hr />
                            <div className="text-center pb-3">
                                <Link to="/logActivity"><button className="btn">ADD LOG</button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        activities: state.firestore.ordered.activities,
        auth: state.firebase.auth
    }
}

const mapDispatchtoProps = (dispatch) => {
    return {
        removeLog: (log) => dispatch(removeLog(log))
    }
}
export default compose(
    connect(mapStateToProps, mapDispatchtoProps),
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
)(log)
