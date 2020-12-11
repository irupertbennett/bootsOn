import React, { Component } from 'react'
import Footsteps from './Loaders/Footsteps'

export class Loading extends Component {
    render() {
        return (
            <div className="d-flex h-100">
                <div className="align-self-center w-100">
                    <h1 className="text-center pb-3">Hold on...Were just getting you app ready!</h1>
                    <Footsteps />
                </div>
            </div>
        )
    }
}

export default Loading
