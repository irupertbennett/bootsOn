import React, { Component } from 'react'
import DualListBox from 'react-dual-listbox';
import 'react-dual-listbox/lib/react-dual-listbox.css';
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
 
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
    
    handleToggle = (e) => {
            if(this.state[e.target.id] === true){
                var array = [...this.state.selected]
                console.log(array)
                var index = array.indexOf([e.target.id][0].split("_")[0])
                console.log([e.target.id][0].split("_")[0])
                console.log(index)
                if(index !== -1){
                    array.splice(index, 1)
                    this.setState({
                        [e.target.id]: false,
                        selected: array
                    },() => {console.log(this.state)})
                }
            }
            else {
                this.setState({
                    [e.target.id]: true,
                    selected: [...this.state.selected, [e.target.id][0].split("_")[0]]
                },() => {console.log(this.state)})
            }
            
    };

    getGearDropdown = (gear, geararr) => {
        return (
            <div class="card-group">
                <div className="card">
                    { gear && gear.map(item => {
                        return(
                            <div>
                                <div className="card-header collapsed" aria-expanded="false" data-toggle="collapse" href={"#collapse" + item.item}>
                                    <h4 className="card-title">
                                        { item.item }
                                        <span><i class="fas fa-chevron-circle-down pull-right"></i></span>
                                    </h4>
                                </div>
                                <div id={"collapse" + item.item} class="collapse">
                                    <ul className="list-group">
                                        { geararr && geararr.map(ownItem => {
                                            if(ownItem.type.toLocaleUpperCase() === item.item.toLocaleUpperCase()){
                                                return(
                                                    <li id={`${ownItem.id}_isActive`} className={`list-group-item ${this.state[ownItem.id+"_isActive"] ? "active" : ""}`} onClick={this.handleToggle}>
                                                        { ownItem.label} 
                                                        <span class={`${this.state[ownItem.id+"_isActive"] ? "far fa-check-square pull-right" : "far fa-square pull-right"}`} aria-hidden="true"></span>
                                                    </li>
                                                )
                                            }
                                        })}
                                    </ul>
                                </div>
                            </div>
                        )
                    })}
                   
                </div>
            </div>
        )
    }

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
                <h1 className="text-center green py-3">BACKPACK ORGANISER</h1>
                <h4 className="text-center">Virtually pack your bag here by selecting the items you wish to take on your trip!</h4>
                <p className="text-center">Can't find your item? Head to the <a href="/Gear">Gear</a> page to add your item to your inventory</p>
                
                <div className="container-fluid section">
                    <div className="offset-md-2 col-md-8 col pb-3">
                        { this.getGearDropdown(this.state.arr, geararr) }
                    </div>
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
                            <ResponsiveContainer width="100%" height="80%">
                                <BarChart  data={this.state.arr} key={Math.random()}>
                                    <XAxis dataKey="item" />
                                    <YAxis dataKey={varFromState} />
                                    <Tooltip />
                                    <Legend />
                                    <CartesianGrid stroke={"#f5f5f5"} />
                                    <Bar dataKey="weight" fill="#31A3DD" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="col-md-6 col-sm-12">
                            <h3 className="text-center">Pack Items</h3>
                            <ResponsiveContainer width="100%" height="80%">
                                <BarChart data={this.state.arr} key={Math.random()}>
                                    <XAxis dataKey="item" />
                                    <YAxis dataKey={varFromState} />
                                    <Tooltip />
                                    <Legend />
                                    <CartesianGrid stroke={"#f5f5f5"} />
                                    <Bar dataKey="quantity" fill="#31A3DD" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
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