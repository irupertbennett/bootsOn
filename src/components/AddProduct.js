import React, { Component } from 'react'
import { addProduct } from '../store/actions/activityActions'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class AddProduct extends Component {
    state = {
        make: '',
        model: '',
        type: '',
        size: '',
        weight: null
    }
    handleChange = (e) => {
        if(e.target.id === "weight"){
            this.setState({
                [e.target.id]: parseFloat(e.target.value)
            })
        } else{
            this.setState({
                [e.target.id]: e.target.value
            })
        }
    }
    handleSubmit = (e) => {
        e.preventDefault()
        this.props.addProduct(this.state)
        //this.props.history.push('/log')
    }
    componentDidMount() {
        window.scrollTo(0, 0)
    }
    render() {
        const { auth } = this.props
        if(!auth.emailVerified) return <Redirect to='/SignIn' />
        return (
            <div className="container">
                <br />
                <h3 className="text-center green">ADD PRODUCT</h3>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group col-md-10 offset-md-1">
                        <label htmlFor="make">Make</label>
                        <input className="form-control" type="text" id="make" onChange={ this.handleChange } />
                    </div>
                    <div className="form-group col-md-10 offset-md-1">
                        <label htmlFor="model">Model</label>
                        <input className="form-control" type="text" id="model" onChange={ this.handleChange } />
                    </div>
                    <div className="form-group col-md-10 offset-md-1">
                        <label htmlFor="type">Type</label>
                        <select defaultValue="pleaseSelect" onChange={this.handleChange} className="form-control" id="type">
                            <option value="pleaseSelect"disabled>--Please Select--</option>
                            <option value="bags">Bags</option>
                            <option value="tents-tarps">Tents/Tarps</option>
                            <option value="sleeping">Sleeping</option>
                            <option value="clothing">Clothing</option>
                            <option value="cooking">Cooking</option>
                            <option value="electronics">Electronics</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="form-group col-md-10 offset-md-1">
                        <label htmlFor="size">Size</label>
                        <input className="form-control" type="text" id="size" onChange={ this.handleChange } />
                    </div>
                    <div className="form-group col-md-10 offset-md-1">
                        <label htmlFor="weight">Weight</label>
                        <input className="form-control" type="text" id="weight" onChange={ this.handleChange } />
                    </div>
                    <div className="form-group text-center">
                        <button className="btn register-btn">Add</button>
                    </div>
                </form>
                <br />
                <br />
            </div>
        )
    }
}

const mapStatetoProps = (state) => {
    return{
        auth: state.firebase.auth
    }
}

const mapDispatchtoProps = (dispatch) => {
    return {
        addProduct: (product) => dispatch(addProduct(product))
    }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(AddProduct)
