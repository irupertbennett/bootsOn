import React, { Component } from 'react'
import Footsteps from './Loaders/Footsteps'

export class Loading extends Component {
    render() {
        return (
            <div className="d-flex h-100">
                <div className="align-self-center w-100">
                    <Footsteps />
                </div>
            </div>
        )
    }
}

export default Loading
