import React, { Component } from 'react'
import Icon from "../Icon";

export class SocialMedia extends Component {
    render() {
        return (
            <div className="container-fluid my-4">
                <div className="contents">
                    <div className="outer">
                        <div className="iconimage">
                            <div className="spansurrond">
                                <Icon className="icon icon-linkedin" icon="linkedin" />
                            </div>
                        </div>
                    </div>
                    <div className="outer">
                        <div className="iconimage">
                            <div className="spansurrond">
                                <Icon className="icon icon-gmail" icon="gmail" />
                            </div>
                        </div>
                    </div>
                    <div className="outer">
                        <div className="iconimage">
                            <div className="spansurrond">
                                <Icon className="icon icon-facebook" icon="facebook"/>
                            </div>
                        </div>
                    </div>
                    <div className="outer">
                        <div className="iconimage">
                            <div className="spansurrond">
                                <Icon className="icon icon-github" icon="github"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SocialMedia
