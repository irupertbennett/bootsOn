import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class ProfileCard extends Component {
    render() {
        const { profile } = this.props
        var firstName, lastName, city, email, imageUrl = null
        firstName = (profile.firstName ? profile.firstName.toUpperCase() : "")
        lastName = (profile.lastName ? profile.lastName.toUpperCase() : "")
        city = (profile.city ? profile.city.substring(0,1).toUpperCase() + profile.city.substring(1, profile.city.length) : "")
        email = (profile.email ? profile.email : "")
        imageUrl = (profile.url ? profile.url: "userImage.png")
        return (
            <div className="offset-md-1 col-md-10 pb-4">
                <div className="d-none d-sm-block text-center">
                    <div className="row">
                        <div className="col offset-sm-5 col-sm-2">
                            <img id="togglenavimage" className="profile-picture img-fluid" src={ imageUrl } alt="BootsOn" ></img>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <h5>{firstName} {lastName}</h5>
                            <p className="my-0"><b>Location:</b> {city}</p>
                            <p className="my-0"><b>Email:</b> {email}</p>
                            <div className="text-center pt-3">
                                <Link to={{pathname: '/editDetails', state: { details: profile }}} ><button className="btn">Edit details</button></Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row d-sm-none">
                        <div className="col-3">
                            <img id="togglenavimage" className="rounded-circle responsive-image img-fluid" src={ imageUrl } alt="BootsOn" ></img>
                        </div>
                        <div className="col-9">
                            <p className="my-0">{firstName} {lastName}</p>
                            <p className="my-0">{city}<Link className="fa fa-pencil float-right" to={{pathname: '/editDetails', state: { details: profile }}} ></Link></p>
                            <p className="my-0">{email}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProfileCard
