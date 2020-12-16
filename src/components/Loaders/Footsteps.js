import React, { Component } from 'react'

export class Footsteps extends Component {
    render() {
        return (
            <div className="footsteps offset-md-1 col-md-10">
                <div className="row col-md-12">
                    <div className="col-2 footstep-1"><img alt="footprint1" className="img-fluid" src="bootprint_left.png"></img></div>
                    <div className="col-2 footstep-3"><img alt="footprint3" className="img-fluid" src="bootprint_left.png"></img></div>
                    <div className="col-2 footstep-5"><img alt="footprint5" className="img-fluid" src="bootprint_left.png"></img></div>
                    <div className="col-2 footstep-7"><img alt="footprint7" className="img-fluid" src="bootprint_left.png"></img></div>
                    <div className="col-2 footstep-9"><img alt="footprint9" className="img-fluid" src="bootprint_left.png"></img></div>
                </div>  
                <div className="row col-md-12">  
                    <div className="col-1 footstep-0"><img alt="footprint0" className="img-fluid" src="bootprint_right_half.png"></img></div>
                    <div className="col-2 footstep-2"><img alt="footprint2" className="img-fluid" src="bootprint_right.png"></img></div>
                    <div className="col-2 footstep-4"><img alt="footprint4" className="img-fluid" src="bootprint_right.png"></img></div>
                    <div className="col-2 footstep-6"><img alt="footprint6" className="img-fluid" src="bootprint_right.png"></img></div>
                    <div className="col-2 footstep-8"><img alt="footprint8" className="img-fluid" src="bootprint_right.png"></img></div>
                    <div className="col-1 footstep-10"><img alt="footprint10" className="img-fluid" src="bootprint_right_half_back.png"></img></div>
                </div>  
            </div>
        )
    }
}

export default Footsteps
