import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class Home extends Component {
    state = {
        showResults: false
    }
    handleClick = (e) => {
        this.setState({
            showResults: true
        })
        setTimeout(function() {
            this.setState({
                showResults: false
            })
        }.bind(this), 5000)
    }
    componentDidMount() {
        window.scrollTo(0, 0)
    }
    render(props) {
        const { auth } = this.props
        
        if(auth.emailVerified) return <Redirect to='/account' />
        return (
            <div className="container pt-5">
                <h1 className="text-center green">WELCOME!</h1>
                <p>Thank you for visiting the ultimate hiking companion at your finger tips! Create an account to get started by clicking the 'Register' tab at the top of this screen</p>
                <p>Built by a back packer - for a backpacker because only a backpacker knows what a backpacker needs!</p>
                <ul>
                    <li>Plan your next trips</li>
                    <li>Log your previous trips</li>
                    <li>Virtually pack your rucksack</li>
                    <li>Manage your gear</li>
                </ul>
                
                {/* <button onClick={this.handleClick}>Click me</button>
                <div>
                    { this.state.showResults ? <Spinner /> : null }
                </div> */}
            </div>
        )
    }
}

const mapStatetoProps = (state) => {
    return{
        auth: state.firebase.auth
    }
}

export default connect(mapStatetoProps)(Home)
