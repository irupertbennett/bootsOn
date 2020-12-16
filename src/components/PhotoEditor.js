import React, {Component} from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
 
class PhotoEditor extends Component {
    state = {
        image: null,
        cropData: null,
        cropper: null
    }
    
    _crop() {
        //console.log(this.cropper.getCroppedCanvas().toDataURL());
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
        if (typeof this.state.cropper !== "undefined") {
            this.setState({
                cropData: this.state.cropper.getCroppedCanvas().toDataURL()
            })
            
            
        }
    };

    render() {
        return (
            <div className="container">
                <div className="text-center">
                    <input className="py-3" type="file" onChange={this.onChange} />
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
                    <div className="row">
                        <div className="col pt-3">
                            <button className="btn" onClick={this.getCropData}>Crop Image</button>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <h1>Preview</h1>
                        <div className="img-preview" style={{ width: "100%", float: "left", height: "300px", overflow: "hidden" }}/>
                    </div>
                    
                    <div className="box" style={{ width: "300px", float: "right" }}>
                        <img src={this.state.cropData} style={{ width: "100%", float: "left", height: "300px", overflow: "hidden" }} alt="cropped" />
                    </div>
                </div>
                <br style={{ clear: "both" }} />
            </div>
        );
    }
}

export default PhotoEditor;