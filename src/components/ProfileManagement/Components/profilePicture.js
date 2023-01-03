import { ImageAspectRatio } from "@material-ui/icons";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

export default function ProfilePictureComponent() {
  const[images,setImages]=useState([]);
  const [imageURls,setImageURls]=useState([]);



  useEffect(()=>{
    if (images.length < 1)return;
    const newURLs=[];
    images.forEach(image=>{
      newURLs.push(URL.createObjectURL(image))
    })
    setImageURls(newURLs);
  },[images]);

  const onImageChange=(e)=> {
    setImages([...e?.target?.files])  
  }

  return (
    <>
     
      <div>
        <div className="row">
          <div className="col-md-6">
            <label className="btn btn-default p-0">
              <input type="file"  multiple accept="image/*"  onChange={onImageChange}/>
              
            </label>
          </div>

          <div className="col-6 float-end">
            <button
              className="btn btn-success btn-sm"
              // disabled={!currentFile}
              // onClick={this.upload}
              // onClick={onImageChange}
            >
              Upload
            </button>
            </div>
            <div className="row">
            <Card className='w-50 '>
            {imageURls.map(imageSrc=>
            <img className="w-100" src={imageSrc}/>
            )}
            </Card>
            </div>

          </div>
      
    </div>
    </>
  );
}
