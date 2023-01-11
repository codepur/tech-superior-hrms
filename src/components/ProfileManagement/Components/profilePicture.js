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

export default function ProfilePictureComponent() {
  const [imageCrop, setimageCrop] = useState();
  const [images, setImages] = useState([]);
  const [imageURls, setImageURls] = useState([]);
  const [selectedFile, setSelectedFile] = useState();
  const dispatch = useDispatch();

  const userData = useSelector((Gstate) => Gstate.user.userData);
  const imagePath = userData?.Image.split('/')
  const imagePathFilter = imagePath[imagePath.length - 1]

  const upload = "/images/userpic.png";

  const hideModal = () => {
    setimageCrop(false);
    setSelectedFile(null)
  }

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
    const formData = new FormData();
    formData.append('File', selectedFile);
    API.apiPost("userProfilePicture", formData)
      .then((response) => {
        if (response.data) {
          toast.success("Image successfully uploaded", {
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
  const fileName = selectedFile?.name;

  const getPic = () => {
    dispatch(setProfilePicture(imagePathFilter));
  }

  return (
    <>
      <Toaster />
      <h3 className="row mb-2 mx-auto text-center">Profile Picture Update</h3>
      <label for="avatar" className="d-flex justify-content-center" onClick={() => setimageCrop(true)}>
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
              <div className="d-flex flex-column align-items-center">
                <Input type="file" multiple accept="image/*" onChange={changeHandler} />
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

