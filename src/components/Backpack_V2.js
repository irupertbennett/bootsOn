import React, { Component } from 'react'
import DualListBox from 'react-dual-listbox';
import 'react-dual-listbox/lib/react-dual-listbox.css';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
 
class Backpack_V2 extends Component {
    state = {
        selected: [],
        arr: [
            { item: 'Bags', weight: 0, quantity: 0 },
            { item: 'Tents-Tarps', weight: 0, quantity: 0 },
            { item: 'Sleeping', weight: 0, quantity: 0 },
            { item: 'Clothing', weight: 0, quantity: 0 },
            { item: 'Cooking', weight: 0, quantity: 0 },
            { item: 'Electronics', weight: 0, quantity: 0 },
            { item: 'Other', weight: 0, quantity: 0 }
        ],
        graph: null,
        d: Math.random(),
        totalWeight: 0
    };
 
    onChange = (selected) => {
        this.setState({ selected });
    };
    
    calculate = (selected, gear) => {
        var currentSelection = selected
        var newSelection = []
        var removedSelection = []
        {currentSelection.map((item) => {
            if(!this.state.oldSelection.includes(item))
                newSelection.push(item)
        })}
        {this.state.oldSelection && this.state.oldSelection.map((item) => {
            if(!currentSelection.includes(item))
                removedSelection.push(item)
        })}
        
        var arr = this.state.arr
        this.state.oldSelection = currentSelection
        if(currentSelection.length > 0){
            if((removedSelection.length == 0) && (newSelection.length > 0)){
                newSelection && newSelection.map((id) => {
                    gear && gear.map((item) => {
                        if(item.id === id) {
                            arr.map((arrItem) => {
                                if(arrItem.item.toLocaleUpperCase() === item.type.toLocaleUpperCase()){
                                    arrItem.weight += item.weight
                                    this.state.totalWeight += item.weight
                                    arrItem.quantity += 1
                                }
                            })
                        }
                    })
                })
            } else if ((removedSelection.length > 0) && (newSelection.length == 0)){
                removedSelection && removedSelection.map((id) => {
                    gear && gear.map((item) => {
                        if(item.id === id) {
                            arr.map((arrItem) => {
                                if(arrItem.item.toLocaleUpperCase() === item.type.toLocaleUpperCase()){
                                    arrItem.weight -= item.weight
                                    this.state.totalWeight -= item.weight
                                    arrItem.quantity -= 1
                                }
                            })
                        }
                    })
                })
            } else if ((removedSelection.length > 0) && (newSelection.length > 0)){
                newSelection && newSelection.map((id) => {
                    gear && gear.map((item) => {
                        if(item.id === id) {
                            arr.map((arrItem) => {
                                if(arrItem.item.toLocaleUpperCase() === item.type.toLocaleUpperCase()){
                                    arrItem.weight += item.weight
                                    this.state.totalWeight += item.weight
                                    arrItem.quantity += 1
                                }
                            })
                        }
                    })
                })
                removedSelection && removedSelection.map((id) => {
                    gear && gear.map((item) => {
                        if(item.id === id) {
                            arr.map((arrItem) => {
                                if(arrItem.item.toLocaleUpperCase() === item.type.toLocaleUpperCase()){
                                    arrItem.weight -= item.weight
                                    this.state.totalWeight -= item.weight
                                    arrItem.quantity -= 1
                                }
                            })
                        }
                    })
                })
            } 
        } else {
            {arr && arr.map((arrItem) => {
                arrItem.weight = 0   
                arrItem.quantity = 0
                this.state.totalWeight = 0
            })}
        }
        currentSelection = selected
        newSelection = []
        removedSelection = []
    }
    componentDidMount() {
        window.scrollTo(0, 0)
    }
    render() {
        const { selected } = this.state;
        const { gear, auth } = this.props
        var geararr = []
        var { varFromState } = this.state.d
        
        { gear && Object.keys(gear).forEach((item) => {
            geararr.push(
                Object.assign(
                    {}, 
                    gear[item], 
                    {label: gear[item].make + " " + gear[item].model +  " " + gear[item].size}, 
                    {value: gear[item].id}
                )
            )
        })}
        return (
            <div>
                <img id="togglenavimage" className="header-image" src="Image_placeholder_1920_650.jpg" alt="BootsOn"></img>
                <h1 className="text-center green">BACKPACK ORGANISER</h1>
                <br />
                <div className="container">
                    <br />
                    <div className="row">
                        <h5 className="green">Gear</h5>
                        <h5 className="offset-md-6 green">Backpack</h5>
                    </div>
                    <DualListBox
                        canFilter
                        options={geararr}
                        selected={selected}
                        onChange={this.onChange}
                    />                    
                </div>
                <div className="container-fluid section">
                    { this.calculate(selected, gear) }
                    <div className="text-center">
                        <p>Total pack weight: {Number(this.state.totalWeight).toFixed(2)}kg</p>
                        <p>Total items in pack: {selected.length}</p>
                    </div>
                    <div className="row offset-md-1 col-md-10 col-sm-12">
                        <div className="col-md-6 col-sm-12">
                        <h3 className="text-center">Pack Weight(kg)</h3>
                            <BarChart width={450} height={200} data={this.state.arr} key={Math.random()}>
                                <XAxis dataKey="item" />
                                <YAxis dataKey={varFromState} />
                                <Tooltip />
                                <Legend />
                                <CartesianGrid stroke={"#f5f5f5"} />
                                <Bar dataKey="weight" fill="#31A3DD" />
                            </BarChart>
                        </div>
                        <div className="col-md-6 col-sm-12">
                        <h3 className="text-center">Pack Items</h3>
                            <BarChart width={450} height={200} data={this.state.arr} key={Math.random()}>
                                <XAxis dataKey="item" />
                                <YAxis dataKey={varFromState} />
                                <Tooltip />
                                <Legend />
                                <CartesianGrid stroke={"#f5f5f5"} />
                                <Bar dataKey="quantity" fill="#31A3DD" />
                            </BarChart>
                        </div>
                    </div>
                </div>
                {/*<DrawGraph data={this.state.arr} type="BAR" bkgColor="#f5f5f5" color="#31A3DD" width={650} height={250} interval="preserveStartEnd" varFromState={Math.random()}/> */}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        gear: state.firestore.ordered.gear,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect((props) => {
        const id = props.auth.uid? props.auth.uid : null
        return[
        { collection: 'gear', where:[
            ['createdBy', '==', id]
        ] },
    ]})
)(Backpack_V2)