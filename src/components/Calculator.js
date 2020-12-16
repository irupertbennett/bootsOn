import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

class calculator extends Component {
    componentDidMount() {
        window.scrollTo(0, 0)
    }
    render() {
        const { products, auth } = this.props
        const makes = []
        if(!auth.emailVerified) return <Redirect to='/SignIn' />
        return (
            <div>
                <h1 className="text-center">Backpack calculator</h1>

                <div className="input-group offset-md-2 col-md-8 mb-3">

                        {/* {products && products.map((product, index) => (
                            <select className="form-control mb-2" id="inputGroupSelect01" placeholder="Model">
                            <option value="" selected disabled>Make</option>
                             {product.items && product.items.map((item, index) => (
                                <option value="All">{ item.Make }</option>
                            ))} 
                            </select>
                        ))} */}
                        {products && products.map((product, index) => (
                            <>
                            {product.items && product.items.map((item, index) => {
                            if(makes.indexOf(item.Make) === -1){
                                makes.push(item.Make)
                            }
                            })}
                            </> 
                        ))}
                        <select className="form-control mb-2" id="inputGroupSelect01">
                            <option value="" selected disabled>Make</option>
                        {makes && makes.map((product) => (
                            <option value="All">{ product }</option>
                        ))} 
                           </select>
                        {products && products.map((product, index) => (
                            <select className="form-control mb-2" id="inputGroupSelect01" placeholder="Model">
                            <option value="" selected disabled>Model</option>
                             {product.items && product.items.map((item, index) => (
                                <option value="All">{ item.Model }</option>
                            ))} 
                            </select>
                        ))}
                        {products && products.map((product, index) => (
                            <select className="form-control mb-2" id="inputGroupSelect01" placeholder="Size">
                            <option value="" selected disabled>Size</option>
                             {product.items && product.items.map((item, index) => (
                                <option value="All">{ item.Size }</option>
                            ))} 
                            </select>
                        ))}
                </div>            
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        products: state.firestore.ordered.products,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect(() => {
        return[
        { collection: 'products', doc: 'backpacks', subcollections: [
            {collection: 'items' }
        ] },
    ]})
)(calculator)