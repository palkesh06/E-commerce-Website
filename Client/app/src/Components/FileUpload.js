import React, { Component } from "react";
import axios from "axios";
class FileUploader extends Component {
  constructor(props) {
    super(props);
    this.state = { file: null, imageData: null };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    axios
      .get("http://localhost:8000/upload-image")
      .then((data) => {
        this.setState({ imageData: data }, ()=>{console.log(this.state);});
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
    return (
        <form onSubmit={this.onSubmit}>
          <label>
            Upload File:
            <input type="file" onChange={this.onChange} />
          </label>
          <button type="submit">Submit</button>
        </form>
    );
  }
}

export default FileUploader;
