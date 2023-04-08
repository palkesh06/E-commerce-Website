import React, { Component } from "react";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

class FileUploader extends Component {
  constructor(props) {
    super(props);
    this.state = { file: null, imageData: [] };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    axios
      .get("http://localhost:8000/upload-image")
      .then((result) => {
        this.setState({ imageData: result.data });
      })
      .catch((err) => console.log(err));
  }

  onChange(e) {
    this.setState({ file: e.target.files[0] });
  }

  onSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", this.state.file);
    const url = "http://localhost:8000/upload-image";
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    axios
      .post(url, formData, config)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const { imageData } = this.state;
    const images = imageData && imageData.map((singleImage) => {
      const base64String = btoa(
        String.fromCharCode(...new Uint8Array(singleImage.image.data.data))
      );
      return <img key={uuidv4()} src={`data:image/jpeg;base64, ${base64String}`} width={300} />;
    });
    return (
      <>
        <form onSubmit={this.onSubmit}>
          <label>
            Upload File:
            <input type="file" onChange={this.onChange} />
          </label>
          <button type="submit">Submit</button>
        </form>
        <div>{images}</div>
      </>
    );
  }
}

export default FileUploader;
