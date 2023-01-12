import { ImageAspectRatio } from "@material-ui/icons";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Input } from "reactstrap";
import { Button, Card } from "react-bootstrap";
import React from 'react'
import AvatarEditor from 'react-avatar-editor'
 

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
  );
}
