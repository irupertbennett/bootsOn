import React, { Component } from 'react'

class SiteMap extends Component {
    render() {
        console.log(this.props.activities)
        return (
            <div className="container-fluid pt-4 site-map text-center">
                <div className="row offset-md-2 col-md-8">
                    <div className="col-md-3">
                        <div className=""><a className="text-white" href="/"><span className="">{process.env.REACT_APP_SITE_NAME}</span></a></div>
                            <div className="copyright">
                                © 2020 {process.env.REACT_APP_SITE_NAME}
                            </div>
                        </div>
                        <div className="col-md-2 col-md-offset-1">
                            <h4 className="text-secondary">About</h4>
                            <ul className="list-unstyled">
                                <li><a className="text-white" href="/about">About</a></li>
                            </ul>
                        </div>
                        <div className="col-md-2">
                            <h4 className="text-secondary">Follow</h4>
                            <ul className="list-unstyled">
                                <li><a className="text-white" rel="noreferrer" target="_blank" href="http://www.facebook.com/">Facebook</a></li>
                                <li><a className="text-white" rel="noreferrer" target="_blank" href="http://twitter.com/">Twitter</a></li>
                                <li><a className="text-white" rel="noreferrer" target="_blank" href="http://instagram.com/">Instagram</a></li>
                            </ul>
                        </div>
                        <div className="col-md-2">
                            <h4 className="text-secondary">Help</h4>
                            <ul className="list-unstyled">
                                <li><a className="text-white" target="_blank" href="/contact">Contact Us</a></li>
                            </ul>
                        </div>
                    </div>
                </div>             
        )
    }
}

export default SiteMap
