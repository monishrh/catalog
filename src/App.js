/*
Author: Monish R H
filename: App.js
*/
import React, { useCallback, useState } from "react";
// cuid is a simple library to generate unique IDs
import cuid from "cuid";
import Dropzone from "./components/DropZone";
import ImageList from "./components/ImageList";

import './styles/App.css';
import './styles/style.css';
import './styles/bootstrap.min.css';
function App() {
  // Create a state called images using useState hooks and pass the initial value as empty array
  const [images, setImages] = useState([]);
  const [type, settype] = useState('main');
  const [catalog, setcatalog] = useState();
  const [description, setdescription] = useState();
  const inputSetCatalogue = (text) => {
    setcatalog(text.target.value);
  }

  const inputSetDescription = (text) => {
    setdescription(text.target.value);
  }
  const changeview = (text) => {
    settype(text);
  }
  const onDrop = useCallback(acceptedFiles => {
    // Loop through accepted files
    acceptedFiles.map(file => {
      // Initialize FileReader browser API
      const reader = new FileReader();
      // onload callback gets called after the reader reads the file data
      reader.onload = function (e) {
        // add the image into the state. Since FileReader reading process is asynchronous, its better to get the latest snapshot state (i.e., prevState) and update it. 
        setImages(prevState => [
          ...prevState,
          { id: cuid(), src: e.target.result }
        ]);
      };
      // Read the file as Data URL (since we accept only images)
      reader.readAsDataURL(file);
      return file;
    });
  }, []);
  return (
    <div className="contents card-body p-0 pt-2 px-2 pb-3">
      <div className="header">
        <div className="input-group-append float-right">

          {type === 'main' ? <button className="btn btn-outline-primary" onClick={() => changeview('preview')} type="button" >Preview</button> : <button className="btn btn-outline-primary" onClick={() => changeview('main')} type="button" >Edit</button>}
          <button className="btn btn-outline-primary ml-2" type="button">Saven & Exit</button>
        </div>
      </div>
      {type === 'main' ? (<div style={{ marginTop: '90px', alignSelf: 'center', justifyContent: 'center', alignContent: 'center', width: '50%', marginLeft: '25%' }}>

        <div className="col-sm-12">
          <label htmlFor="example-text-input-sm" className="col-form-label">Catalogue Name</label>
          <input type="text" className="form-control form-control-sm" id="name" name="name" value={catalog} onChange={(text) => inputSetCatalogue(text)} />

        </div>
        <div className="col-sm-12">
          <label htmlFor="example-text-input-sm" className="col-form-label">Catalogue Description</label>
          <textarea type="text" rows='4' className="form-control form-control-sm" id="description" name="description" value={description} onChange={(text) => inputSetDescription(text)} />

        </div>
        <br></br>
        <div className="main col-sm-12">
          <h4>Preview Videos</h4>
          <Dropzone onDrop={onDrop} accept={"image/*"} />
        </div>
        <ImageList images={images} />
      </div>) : (
        <div style={{ marginTop: '90px', alignSelf: 'center', justifyContent: 'center', alignContent: 'center', width: '50%', marginLeft: '25%' }}>
          <h1>{catalog}</h1>
          <ImageList images={images} />
          <p>{description}</p>
        </div>
      )
      }

    </div>
  );

}

export default App;