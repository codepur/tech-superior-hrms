import dynamic from "next/dynamic";
import { useState } from "react";
import { Button, Form, Image, Row } from "react-bootstrap";
import styles from "../../../styles/ProfileManagement.module.scss";
import { handleErrorMessage } from "../../../utils/commonFunctions";
import Validation from "../../../utils/validations";
import swal from "sweetalert";
import API from "../../../helpers/api";
import { encodeData } from "../../../helpers/auth";
const initial = {
  oldPassword: "",
  password: "",
  ConfirmPass: "",
};

export default function ChangePasswordComponent() {
  const [state, setState] = useState(initial);
  const [showPass, setShowPass] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const { oldPassword, password, ConfirmPass } = state;
  const handleChange = (e) => {
    setShowErrors(false);
    setState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const passwordHandler = () => {
    setShowPass(!showPass);
  };

  const handleClick = () => {
    setShowErrors(true);
    const { oldPassword, password, ConfirmPass } = state;
    if (
      (!password && !Validation.password(password)) ||
      (!ConfirmPass && !Validation.password(ConfirmPass)) ||
      ConfirmPass !== password ||
      !oldPassword
    ) {
      return;
    } else {
      setShowErrors(false);
      API.apiPost("updatePassword",  {payload:encodeData({
        oldPassword: state.oldPassword,
        password: state.password,
      })})
        .then((response) => {
          if (response.data.success) {
            swal({
              title: response.data.message,
              text: "",
              icon: "success",
            });
            setState(initial);
          }
        })
        .catch((err) => {
          handleErrorMessage(err);
        });
      }
    };
    return (
      <>
  
      <p className={`${styles.info} fw-bold p-2`}>Change Password</p>

      <Row className="mt-5">
        <Form.Group className="col-md-4" controlId="formGridEmail">
          <Form.Label className="fw-bold">Old Password</Form.Label>
          <Form.Control
            type={showPass ? "text" : "password"}
            placeholder="Enter Old Password"
            value={oldPassword}
            name="oldPassword"
            onChange={handleChange}
            isInvalid={
              showErrors && (!oldPassword || !Validation.password(oldPassword))
            }
            required
            maxLength="16"
          />
        </Form.Group>
        <Form.Group className="col-md-4" controlId="formGridPassword">
          <Form.Label className="fw-bold">New Password</Form.Label>
          <Form.Control
            type={showPass ? "text" : "password"}
            placeholder="Enter New Password"
            value={password}
            name="password"
            isInvalid={
              showErrors && (!password || !Validation.password(password))
            }
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group
          className="col-md-4 position-relative"
          controlId="formGridAddress1"
        >
          <Form.Label className="fw-bold">Confirm Password</Form.Label>
          <Form.Control
            type={showPass ? "text" : "password"}
            onChange={handleChange}
            value={ConfirmPass}
            placeholder="Enter Confirm Password"
            isInvalid={
              showErrors && (!ConfirmPass || !Validation.password(ConfirmPass))
            }
            name="ConfirmPass"
          />
          <span className={`${styles.errorPassview}`}>
            <Image
              alt={showPass ? "hide" : "show"}
              src={showPass ? "/images/eyeView.png" : "/images/eyeHide.png"}
              data-toggle="tooltip"
              title={showPass ? "hide" : "show"}
              onClick={passwordHandler}
              className={`${styles.eyeSize}`}
            />
          </span>
        </Form.Group>
      </Row>
      <Button
        variant="primary"
        type="submit"
        className="mt-3 mb-3"
        onClick={handleClick}
      >
        Save
      </Button>
    </>
  );
}
