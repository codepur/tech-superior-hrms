/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import styles from "../../../styles/ProfileManagement.module.scss";
import { Button, Card, Modal } from "react-bootstrap";
import API from "../../../helpers/api";
import { encodeData } from "../../../helpers/auth";
import { handleErrorMessage } from "../../../utils/commonFunctions";
import toast, { Toaster } from "react-hot-toast";
import { Input } from "reactstrap";
import { IconPencil } from "@tabler/icons";
import { useDispatch, useSelector } from "react-redux";
import { setProfilePicture } from "../../../stores/actions/profilePicture";
import Avatar from 'react-avatar-edit';

export default function ProfilePictureComponent() {
  const [imageCrop, setimageCrop] = useState();
  const [images, setImages] = useState([]);
  const [imageURls, setImageURls] = useState([]);
  const [selectedFile, setSelectedFile] = useState();
  const dispatch = useDispatch();
  const [preview, setPreview] = useState(false);

  const userData = useSelector((Gstate) => Gstate.user.userData);
  const imagePath = userData?.Image?.split('/');
  const imagePathFilter = imagePath ? imagePath[imagePath?.length - 1] : "";

  const upload = "/images/userpic.png";

  const hideModal = () => {
    setimageCrop(false);
    setSelectedFile(null)
  }
  // console.log("PREVIEW", preview)
  useEffect(() => {
    if (images.length < 1) return;
    const newURLs = [];
    images.forEach(image => {
      newURLs.push(URL.createObjectURL(image))
    })
    setImageURls(newURLs);
  }, [images]);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setImages([...event?.target?.files])
  };

  const uploadPic = () => {
    setimageCrop(false);
    // console.log(preview)
    const formData = new FormData();
    formData.append('File', preview);
    API.apiPost("userProfilePicture", formData)
      .then((response) => {
        if (response.data) {
          toast.success("Image submitted successfully, kindly refresh the page to update your profile picture", {
            position: "top-right",
            style: {
              padding: "16px",
              color: "#3c5f4b",
              marginRight: "25px",
            },
          });
        }
        // response.json()
      })
      .catch((err) => {
        handleErrorMessage(err);
      });
  }  

  const getPic = () => {
    dispatch(setProfilePicture(imagePathFilter));
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

  const onCrop = (view) => {
    // var src = window.URL.createObjectURL(view);
    // console.log('src', src)
    var binaryData = [];
    binaryData.push(view);
    const cc = window.URL.createObjectURL(new Blob(binaryData, { type: "application/zip" }))
    console.log('window.URL.createObjectURL(new Blob(binaryData, {type: "image/jpeg/png/jpg"}))', cc)

    console.log('binaryData', binaryData)

    setPreview(cc);
  };

  const onClose = () => {
    setPreview(null);
  };

  return (
    <>
      <Toaster />
      <h3 className="row mb-2 mx-auto text-center">Profile Picture Update</h3>
      <label htmlFor="avatar" className="d-flex justify-content-center" onClick={() => setimageCrop(true)}>
        Choose a profile picture:
      </label>
      <div className="d-flex justify-content-center my-4">
        <div
          className={`d-flex flex-column justify-content-center algin-items-center ${styles.imageDiv}`}
        >
          <IconPencil onClick={() => setimageCrop(true)} className={`${styles.editIcon}`} />
          {
            selectedFile ?
              imageURls.map((imageSrc, i) =>
                // eslint-disable-next-line @next/next/no-img-element
                <img key={i}
                  className="w-100"
                  src={imageSrc}
                  alt=""
                />
              )
              :
              <img
                alt="hh"
                src={upload}
              />
          }
          <Modal
            show={imageCrop}
            centered
            onHide={hideModal}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Update Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* <div className="d-flex flex-column align-items-center">
                <Input type="file" multiple accept="image/*" onChange={changeHandler} />
                {selectedFile && <div className="row">
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
                }
              </div> */}
              <div className="d-flex flex-column align-items-center">
                <Avatar
                  width={300}
                  height={300}
                  onCrop={onCrop}
                  onClose={onClose}
                //onBeforeFileLoad={onFileLoad}
                //src={src}
                />
              </div>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-center">
              <Button variant="primary" onClick={uploadPic}>
                submit
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
      <Button variant="primary"
        onClick={getPic}
      >
        get
      </Button>
    </>
  );
}

