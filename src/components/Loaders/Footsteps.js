import React, { Component } from 'react'

export class Footsteps extends Component {
    render() {
        return (
            <div className="footsteps offset-md-1 col-md-10">
                <div className="row col-md-12">
                    <div className="col-2 footstep-1"><img className="img-fluid" src="bootprint_left.png"></img></div>
                    <div className="col-2 footstep-3"><img className="img-fluid" src="bootprint_left.png"></img></div>
                    <div className="col-2 footstep-5"><img className="img-fluid" src="bootprint_left.png"></img></div>
                    <div className="col-2 footstep-7"><img className="img-fluid" src="bootprint_left.png"></img></div>
                    <div className="col-2 footstep-9"><img className="img-fluid" src="bootprint_left.png"></img></div>
                </div>  
                <div className="row col-md-12">  
                    <div className="col-1 footstep-0"><img className="img-fluid" src="bootprint_right_half.png"></img></div>
                    <div className="col-2 footstep-2"><img className="img-fluid" src="bootprint_right.png"></img></div>
                    <div className="col-2 footstep-4"><img className="img-fluid" src="bootprint_right.png"></img></div>
                    <div className="col-2 footstep-6"><img className="img-fluid" src="bootprint_right.png"></img></div>
                    <div className="col-2 footstep-8"><img className="img-fluid" src="bootprint_right.png"></img></div>
                    <div className="col-1 footstep-10"><img className="img-fluid" src="bootprint_right_half_back.png"></img></div>
                </div>  
            </div>
        )
    }
}

export default Footsteps
