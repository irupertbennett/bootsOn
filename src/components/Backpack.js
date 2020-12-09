import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

class backpack extends Component {
    state= {
        backpackarr: []
    }
    addItem(id){
       // this.state.backpackarr.push(Object.assign({}, this.state.gear[id], {id: id}))
    }
    addItems = (e) => {
        e.preventDefault()
        var items = document.getElementsByName('chkbox');
               for (var i = 0; i < items.length; i++) {
                   if (items[i].checked === true){
                   }
               }
        //this.state.backpackarr.push(Object.assign({}, this.state.gear[e.target.offsetParent.id], {id: e.target.offsetParent.id}))
    }
    render() {
        const { gear, auth } = this.props
        var geararr = []
        if(!auth.emailVerified) return <Redirect to='/SignIn' />
        return (
            <div>
                <h1 className="text-center">Backpack calculator</h1>
                { gear && Object.keys(gear).forEach((item) => {
                    geararr.push(Object.assign({}, gear[item], {id: item}))
                })}
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <table className="table table-sm table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Make</th>
                                        <th scope="col">Model</th>
                                        <th scope="col">Size</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                {geararr && geararr.map((item, index) => {
                                    return <tr onClick={this.handleRowClick} id={item.id}>
                                            <th scope="row">{index+1}</th>
                                            <td>{item.make}</td>
                                            <td>{item.model}</td>
                                            <td>{item.size}</td>
                                            <td><input type="checkbox" name="brand"></input></td>
                                        </tr>
                                })}
                                </tbody>
                            </table>
                        </div>
                        <div className="col">
                            <button className="btn btn-primary" onClick={this.addItems}>Add</button>
                        </div>
                        <div className="col">
                            <table className="table table-sm table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Make</th>
                                        <th scope="col">Model</th>
                                        <th scope="col">Size</th>
                                        <th>col</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {this.state.backpackarr && this.state.backpackarr.map((item, index) => {
                                    return <tr onClick={this.handleRowClick} id={item.id}>
                                            <th scope="row">{index+1}</th>
                                            <td>{item.make}</td>
                                            <td>{item.model}</td>
                                            <td>{item.size}</td>
                                            <td><input type="checkbox" id="chkbox"></input></td>
                                        </tr>
                                })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>                      
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        gear: state.firestore.data.gear,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect(() => {
        return[
        { collection: 'gear' },
    ]})
)(backpack)