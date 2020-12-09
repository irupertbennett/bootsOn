import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateDetails } from '../store/actions/accountActions'
import { Link, Redirect } from 'react-router-dom'
import 'firebase/storage'
import { storage } from '../config/fbConfig'
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

class EditDetails extends Component {
    state = {
        title: '',
        firstName: '',
        lastName: '',
        email: '',
        city: '',
        id: '',
        file: null,
        url: '',
        image: null,
        cropData: '',
        cropper: null,
        blob: null
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleImageChange = (e) => {
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
          files = e.dataTransfer.files;
        } else if (e.target) {
          files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
            this.setState({
                image: reader.result,
                file: files[0]
            })
        };
        reader.readAsDataURL(files[0]);
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.getCropData()
        let blob = this.state.cropper.getCroppedCanvas().toBlob(blob => {
            if (!blob) {
                alert("Canvas is empty");
            }
            blob.name = this.state.file.name;
            console.log("blob")
            console.log(blob)

            const uploadInitialImage = storage.ref("images/" + this.props.location.state.details.id + "/" + this.state.file.name.split(".")[0] + "_original").put(this.state.file);
            const uploadTask = storage.ref("images/" + this.props.location.state.details.id + "/" + this.state.file.name.split(".")[0] + "_cropped").put(blob);
            uploadTask.on(
                "state_changed",
                snapshot => {},
                error => {
                    console.log(error);
                },
                () => {
                    storage
                    .ref("images/" + this.props.location.state.details.id)
                    .child(this.state.file.name.split(".")[0] + "_cropped")
                    .getDownloadURL()
                    .then(url => {
                        this.setState({
                            url
                        })
                        var newDetails = {
                            title: this.state.title,
                            firstName: this.state.firstName,
                            lastName: this.state.lastName,
                            email: this.state.email,
                            city: this.state.city,
                            id: this.state.id,
                            url: this.state.url
                        }
                        console.log(newDetails)
                        this.props.updateDetails(newDetails)
                        this.props.history.push('/account')
                    });
                }
            )
        }, "image/jpeg");
    }

    componentDidMount() {
        this.setState({
            title: this.props.location.state.details.title,
            firstName: this.props.location.state.details.firstName,
            lastName: this.props.location.state.details.lastName,
            email: this.props.location.state.details.email,
            city: this.props.location.state.details.city,
            id: this.props.location.state.details.id
        })
        window.scrollTo(0, 0)
    }

    _crop() {
        console.log(this.cropper.getCroppedCanvas().toDataURL());
    }
 
    onCropperInit(cropper) {
        this.cropper = cropper;
    }

    onChange = (e) => {
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
          files = e.dataTransfer.files;
        } else if (e.target) {
          files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
            this.setState({
                image: reader.result
            })
        };
        reader.readAsDataURL(files[0]);
      };
    
    getCropData = () => {
        this.setState({
            cropData: this.state.cropper.getCroppedCanvas().toDataURL()
        }, () => console.log(this.state))  
    };

    render() {
        const { auth } = this.props
        if(!auth.emailVerified) return <Redirect to='/SignIn' />
            return (
                <div className="container">
                    <h3 className="text-center green pt-3">Edit Your Details</h3>
                    <form onSubmit={(e) => this.handleSubmit(e) }>
                        <div className="form-group col-md-10 offset-md-1">
                            <label htmlFor="title">Title</label>
                            <select defaultValue={this.props.location.state.details.title} onChange={this.handleChange} className="form-control" id="title">
                                <option value="">--Please Select--</option>
                                <option value="Mr">Mr</option>
                                <option value="Mrs">Mrs</option>
                                <option value="Miss">Miss</option>
                                <option value="Ms">Ms</option>
                            </select>
                        </div>
                        <div class="form-group col-md-10 offset-md-1">
                            <input className="py-3" type="file" onChange={this.handleImageChange} />
                            <Cropper className="col"
                                style={{ height: 400, border: "1px solid black" }}
                                aspectRatio={9/9}
                                preview=".img-preview"
                                src={this.state.image}
                                viewMode={1}
                                guides={true}
                                minCropBoxHeight={10}
                                minCropBoxWidth={10}
                                background={false}
                                responsive={true}
                                autoCropArea={1}
                                checkOrientation={false}
                                onInitialized={(instance) => {
                                    this.setState({
                                        cropper: instance
                                    })
                                }}
                            />
                        </div>
                        <div className="form-group col-md-10 offset-md-1">
                            <label htmlFor="firstName">First Name</label>
                            <input disabled className="form-control" type="text" id="firstName" defaultValue={this.props.location.state.details.firstName} onChange={ this.handleChange } />
                        </div>
                        <div className="form-group col-md-10 offset-md-1">
                            <label htmlFor="lastName">Last Name</label>
                            <input disabled className="form-control" type="text" id="lastName" defaultValue={this.props.location.state.details.lastName} onChange={ this.handleChange } />
                        </div>
                        <div className="form-group col-md-10 offset-md-1">
                            <label htmlFor="city">City</label>
                            <input className="form-control" type="text" id="city" defaultValue={this.props.location.state.details.city} onChange={ this.handleChange } />
                        </div>
                        <div className="form-group col-md-10 offset-md-1">
                            <label htmlFor="email">Email Address</label>
                            <input disabled className="form-control" type="text" id="email" defaultValue={this.props.location.state.details.email} onChange={ this.handleChange } />
                        </div>
                        <div className="form-group text-center">
                            <button className="btn">UPDATE DETAILS</button>
                        </div>
                    </form>
                </div>
            )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

const mapDispatchtoProps = (dispatch) => {
    return {
        updateDetails: (details) => dispatch(updateDetails(details))
    }
}

export default connect(mapStateToProps, mapDispatchtoProps)(EditDetails)
