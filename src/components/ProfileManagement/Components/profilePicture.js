import { ImageAspectRatio } from "@material-ui/icons";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Input } from "reactstrap";
import { Button, Card } from "react-bootstrap";

export default function ProfilePictureComponent() {
  const [images, setImages] = useState([]);
  const [imageURls, setImageURls] = useState([]);

  useEffect(() => {
    if (images.length < 1) return;
    const newURLs = [];
    images.forEach(image => {
      newURLs.push(URL.createObjectURL(image))
    })
    setImageURls(newURLs);
  }, [images]);

  const onImageChange = (e) => {
    setImages([...e?.target?.files])
  }

  return (
    <>
      <div className="container py-5">
        <div className="row">
          <div className="col-md-6">
            <label className="btn btn-default p-0">
              <Input type="file" multiple accept="image/*" onChange={onImageChange} />
            </label>
          </div>

          <div className="col-6 float-end">
            <Button
              className="btn btn-success btn-sm"
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
  );
}
