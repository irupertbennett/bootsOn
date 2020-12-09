import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { addGear, removeGear } from '../store/actions/gearActions'
import BedIcon from '../Icons/BedIcon'
import BagIcon from '../Icons/BagIcon'
import ClothingIcon from '../Icons/ClothingIcon'
import OtherIcon from '../Icons/OtherIcon'
import ElectronicsIcon from '../Icons/ElectronicsIcon'
import TentIcon from '../Icons/TentIcon'
import CookingIcon from '../Icons/CookingIcon'

class gear extends Component {
    state = {
        makeVisable: false,
        modelVisable: false,
        sizeVisable: false,
        buttonVisable: false,
        typeVal: '',
        makeVal: "",
        modelVal: "",
        sizeVal: "",
        modelarr: [],
        makearr: [],
        sizearr: [],
        optionsStateMake: "default",
        optionsStateModel: "default",
        optionsStateSize: "default",
        optionsStateType: "default",
        geararr: [],
        ref: null
    }
    handleChange = (e) => {
        if(e.target.id === "makeSelect"){
            this.setState({
                modelVisable: true,
                makeVal: e.target.value
            });
        } else if(e.target.id === "modelSelect"){
            this.setState({
                sizeVisable: true,
                modelVal: e.target.value
            });
        } else if(e.target.id === "sizeSelect"){
            this.setState({
                sizeVal: e.target.value
            });
        }  
    }
    handleChangeType = (e, products) => {
        this.setState({
            optionsStateType: e.target.value,
            optionsStateMake: "default",
            optionsStateModel: "default",
            optionsStateSize: "default",
            makeVisable: false,
            modelVisable: false,
            sizeVisable: false,
            buttonVisable: false,
            makearr: []
        })
        this.state.makearr.length = 0;
        var marr = this.state.makearr
        Object.keys(products[e.target.value]).forEach((n) => {
            Object.keys(products[e.target.value][n]).forEach((item) => {
                if(marr.indexOf(products[e.target.value][n][item].make) === -1){
                    marr.push(products[e.target.value][n][item].make)
                }
            })
        })
        this.setState({
            makeVisable: true,
            typeVal: e.target.value,
            makearr: marr
        });
    }

    handleChangeMake = (e, products) => {
        this.setState({
            optionsStateMake: e.target.value,
            optionsStateModel: "default",
            optionsStateSize: "default",
            modelVisable: false,
            sizeVisable: false,
            buttonVisable: false,
            modelarr: []
        })
        this.state.modelarr.length = 0;
        var marr = this.state.modelarr
        Object.keys(products[this.state.typeVal]).forEach((n) => {
            Object.keys(products[this.state.typeVal][n]).forEach((item) => {
                if(marr.indexOf(products[this.state.typeVal][n][item].model) === -1){
                    if(products[this.state.typeVal][n][item].make === e.target.value)
                        marr.push(products[this.state.typeVal][n][item].model)
                }
            })
        })
        this.setState({
            modelVisable: true,
            makeVal: e.target.value,
            modelarr: marr
        });
    }

    handleChangeModel = (e, products) => {
        this.setState({
            optionsStateModel: e.target.value,
            optionsStateSize: "default",
            sizeVisable: false,
            buttonVisable: false,
            sizearr: []
        })
        this.state.sizearr.length = 0;
        var sarr = this.state.sizearr
        Object.keys(products[this.state.typeVal]).forEach((n) => {
            Object.keys(products[this.state.typeVal][n]).forEach((item) => {
                if(sarr.indexOf(products[this.state.typeVal][n][item].size) === -1){
                    if((products[this.state.typeVal][n][item].make === this.state.makeVal) && (products[this.state.typeVal][n][item].model === e.target.value)){
                        sarr.push(products[this.state.typeVal][n][item].size)
                    }
                }
            })
        })
        this.setState({
            sizeVisable: true,
            modelVal: e.target.value,
            sizearr: sarr
        });
    }

    handleChangeSize = (e, products) => {
        this.setState({
            optionsStateSize: e.target.value,
            buttonVisable: true,
            sizeVal: e.target.value
        });
    }
    getProduct = (products) => {
        var id = null
        var weight = null
        { products && Object.keys(products).forEach((product) => {
            Object.keys(products[product]).forEach((n) => {
                Object.keys(products[product][n]).forEach((item) => {
                    if((products[product][n][item].type === this.state.typeVal) 
                    && (products[product][n][item].make === this.state.makeVal) 
                    && (products[product][n][item].model === this.state.modelVal) 
                    && (products[product][n][item].size === this.state.sizeVal)){
                        id = product
                        weight = products[product][n][item].weight
                    }
                })
            })
        })}
        if(id !== null){
            var test = {
                id, weight
            }
            return test
        }
        else 
            return null
    }

    handleAddGear = (e, products) => {
        e.preventDefault()
        this.setState({
            optionsStateMake: "default",
            optionsStateModel: "default",
            optionsStateSize: "default",
            optionsStateType: "default",
            makeVisable: false,
            modelVisable: false,
            sizeVisable: false,
            buttonVisable: false
        })
        
        var type = this.getProduct(products)
        if(type !== null){
            var gear = {
                make: this.state.makeVal,
                model: this.state.modelVal,
                size: this.state.sizeVal,
                type: type.id,
                weight: type.weight
            }
            this.props.addGear(gear)
        }
        else
            console.log("Error")
    }
    handleRemoveGear = (id) => {
        if(id != null){
            this.props.removeGear(id)
            const del = this.state.geararr.filter((item) => item.id !== id)
            this.setState({
                geararr: del
            })
        }
    }
    sort( a, b ) {
        if ( a.type < b.type ){
            return -1;
        }
        if ( a.type > b.type ){
            return 1;
        }
        return 0;
    }
    
    renderHead(){
        return (
            <tr>
                <th scope="col">#</th>
                <th scope="col">Category</th>
                <th scope="col">Make</th>
                <th scope="col">Model</th>
                <th scope="col">Size</th>
                <th scope="col">Weight</th>
            </tr>
        )
    }
    renderBody(geararr){
        
        if(this.state.geararr.length === 0){
            { this.props.gear && Object.keys(this.props.gear).forEach((item) => {
                this.state.geararr.push(Object.assign({}, this.props.gear[item], {id: item}))
            })}
            this.state.geararr.sort(this.sort)
        }
        return geararr && geararr.map((item, index) => {
            return <tr id={item.id}>
                <th scope="row">{index+1}</th>
                {/*<td>{item.type.substring(0,1).toUpperCase() + item.type.substring(1,item.type.length)}</td>*/}
                {this.getIcon(item.type)}
                <td>{item.make}</td>
                <td>{item.model}</td>
                <td>{item.size}</td>
                <td>{item.weight}</td>
                <td id={item.id} onClick={() => this.handleRemoveGear(item.id)}><i className="fa fa-trash" aria-hidden="true"></i></td>
            </tr>
        })
    }
    renderTypeOptions(products) {
        return (
            <select id="typeSelect" value={this.state.optionsStateType} className="form-control" onChange={(e) => this.handleChangeType(e, products) }>
                <option disabled value="default">--Please Select--</option>
                <option value="bags">Bags</option>
                <option value="tents-tarps">Tents/Tarps</option>
                <option value="sleeping">Sleeping</option>
                <option value="clothing">Clothing</option>
                <option value="cooking">Cooking</option>
                <option value="electronics">Electronics</option>
                <option value="other">Other</option>
            </select>
        )
    }
    renderMakeOptions(products){
        return (
            <select disabled={this.state.makeVisable ? null : true} value={this.state.optionsStateMake} id="makeSelect" className="form-control" onChange={(e) => this.handleChangeMake(e, products) }>
                <option disabled value="default">Make</option>
                { this.state.makearr && this.state.makearr.map(item => {
                    return <option value={item}>{item}</option> 
                })}
            </select> 
        )
    }
    renderModelOptions(products) {
        return ( 
            <select disabled={this.state.modelVisable ? null : true} value={this.state.optionsStateModel} id="modelSelect" className="form-control" onChange={(e) => this.handleChangeModel(e, products) }>
                <option disabled value="default">Model</option>
                { this.state.modelarr && this.state.modelarr.map(item => {
                    return <option value={item}>{item}</option>
                })}
            </select>
        )
    }
    renderSizeOptions(products) {
        return (
            <select disabled={this.state.sizeVisable ? null : true} value={this.state.optionsStateSize} id="sizeSelect" className="form-control" onChange={(e) => this.handleChangeSize(e, products) }>
                <option disabled value="default">Size</option>
                { this.state.sizearr && this.state.sizearr.map(item => {
                    return <option value={item}>{item}</option>
                })}
            </select>
        )
    }
    getIcon(activity){
        if(activity === "sleeping")
            return <BedIcon />
        else if (activity === "tent-tarp")
            return <TentIcon />
        else if (activity === "bags")
            return <BagIcon />
        else if (activity === "clothing")
            return <ClothingIcon />
        else if (activity === "cooking")
            return <CookingIcon />
        else if (activity === "electronics")
            return <ElectronicsIcon />
        else if (activity === "other")
            return <OtherIcon />
    }
    componentDidMount() {
        window.scrollTo(0, 0)
    }
    render() {
        const { products, auth, docRef } = this.props
        
        if(this.state.ref !== docRef){
            if(this.props.gear){
                if(this.props.gear[this.props.docRef]){
                    this.state.geararr.push(Object.assign({}, this.props.gear[this.props.docRef], {id: this.props.docRef}))
                    this.setState({
                        ref: docRef
                    })
                }
            }
        }
        

        if(!auth.emailVerified) return <Redirect to='/SignIn' />
        return (
            <div>
                <img id="togglenavimage" className="header-image" src="Image_placeholder_1920_650.jpg" alt="BootsOn" ></img>
                <h1 className="text-center green">My Gear</h1>
                <div className="section">
                <br />
                    <div className="container">
                        <label className="green"><b>Add Gear</b></label>
                        <form>
                            <div className="offset-md-1 col-md-10 col-sm-10 offset-sm-1">
                                <div className="form-row">
                                    <div className="form-group col-md-3 col-sm-12">
                                        { this.renderTypeOptions(products) }
                                    </div>
                                    <div className="form-group col-md-2 col-sm-12">
                                        { this.renderMakeOptions(products) }
                                    </div>
                                    <div className="form-group col-md-2 col-sm-12">
                                        { this.renderModelOptions(products) }
                                    </div>
                                    <div className="form-group col-md-2 col-sm-12">
                                        { this.renderSizeOptions(products) }
                                    </div>
                                    <div className="form-group col-md-2 col-sm-12">
                                        <button disabled={this.state.buttonVisable ? null : true} className="btn form-control" onClick={(e) => this.handleAddGear(e, products, docRef) }>Add Item</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <br/> 
                    <div className="container">
                        <label><b>My Gear</b></label>
                        <div className="table-responsive-sm">
                            <table className="table table-sm table-hover">
                                <thead>
                                    { this.renderHead() }
                                </thead>
                                <tbody>
                                    { this.renderBody(this.state.geararr) }
                                </tbody>
                            </table>
                        </div>
                    </div>  
                    <div className="container">
                        <p>Cant find your item in the list? Click <a href="/SubmitGear">here</a> to submit your item for approval.</p>
                    </div>  
                </div>         
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        products: state.firestore.data.products,
        auth: state.firebase.auth,
        gear: state.firestore.data.gear,
        docRef: state.gear.docref
    }
}

const mapDispatchtoProps = (dispatch) => {
    return {
        addGear: (gear) => dispatch(addGear(gear)),
        removeGear: (gear) => dispatch(removeGear(gear))
    }
}
export default compose(
    connect(mapStateToProps, mapDispatchtoProps),
    firestoreConnect((props) => {
        const id = props.auth.uid? props.auth.uid : null
        return[
        { collection: 'products', where:[
            ['createdBy', '==', id]
        ] },
        { collection: 'products', doc: 'bags', subcollections: [
            {collection: 'items' }
        ] },
        { collection: 'products', doc: 'tents-tarps', subcollections: [
            {collection: 'items' }
        ] },
        { collection: 'products', doc: 'sleeping', subcollections: [
            {collection: 'items' }
        ] },
        { collection: 'products', doc: 'clothing', subcollections: [
            {collection: 'items' }
        ] },
        { collection: 'products', doc: 'cooking', subcollections: [
            {collection: 'items' }
        ] },
        { collection: 'products', doc: 'electronics', subcollections: [
            {collection: 'items' }
        ] },
        { collection: 'products', doc: 'other', subcollections: [
            {collection: 'items' }
        ] },
        { collection: 'gear', where:[
            ['createdBy', '==', id]
        ] }
    ]})
)(gear)