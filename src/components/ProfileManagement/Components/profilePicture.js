import { ImageAspectRatio } from "@material-ui/icons";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Input } from "reactstrap";
import { Button, Card } from "react-bootstrap";
<<<<<<< HEAD
import React from 'react'
import AvatarEditor from 'react-avatar-editor'
 
=======
import API from "../../../helpers/api";
import { encodeData } from "../../../helpers/auth";
import { toast, Toaster } from "react-hot-toast";
>>>>>>> 7c82e1c8dece7febeb5eac16e7cf069088121902

export default function ProfilePictureComponent() {
  // const [images, setImages] = useState([]);
  // const [imageURls, setImageURls] = useState([]);

  // useEffect(() => {
  //   if (images.length < 1) return;
  //   const newURLs = [];
  //   images.forEach(image => {
  //     newURLs.push(URL.createObjectURL(image))
  //   })
  //   setImageURls(newURLs);
  // }, [images]);

<<<<<<< HEAD
  // const onImageChange = (e) => {
  //   setImages([...e?.target?.files])
  // }

  return (
   <>
    <AvatarEditor
        image="https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fimages%2Fsearch%2Fflowers%2F&psig=AOvVaw22-PIcAZKl9YEcxg7Sy5TT&ust=1673585630873000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCIiSn7mewfwCFQAAAAAdAAAAABAE"
        width={250}
        height={250}
        border={50}
        color={[255, 255, 255, 0.6]} // RGBA
        scale={1.2}
        rotate={0}
      />
   </>
=======
  const onImageChange = (e) => {
    setImages([...e?.target?.files])
  }
  const uploadImage = () =>{
    API.apiPost("userProfilePicture", {payload: encodeData()})
      .then((response) => {
        if (response.data && response.data.success === true) {
          toast.success(response.data.message, {position: "top-right"});
        }
      })
      // .catch((err) => {
      //   handleErrorMessage(err);
      // });
  }

  return (
    <>
     <Toaster/>
      <div className="container py-5">
        <div className="row">
          <div className="col-md-6">
            <label className="btn btn-default p-0">
              <Input type="file" multiple accept="image/*" onChange={onImageChange} />
            </label>
          </div>

          <div className="col-6 float-end">
            <Button
              className="btn bg-btn-green btn-sm "
            >
              Upload
            </Button>
          </div>
          <div className="row">
            <Card className='w-25 m-3'>
              {imageURls.map((imageSrc, i) =>
                // eslint-disable-next-line @next/next/no-img-element
                <img key={i}
                  className="w-100"
                  src={imageSrc}
                  alt=""
                />
              )}
            </Card>
          </div>

        </div>

      </div>
    </>
>>>>>>> 7c82e1c8dece7febeb5eac16e7cf069088121902
  );
}
