import React, { useEffect, useState } from "react";
import router, { useRouter } from "next/router";
import styles from "../../styles/login.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../stores/actions/mainPage";
import { decodeData, encodeData } from "../../helpers/auth";
import { isAuth } from "../../helpers/auth";
import Validation from "../../utils/validations";
import { Form, Image, OverlayTrigger, Popover } from "react-bootstrap";
import API from "../../helpers/api";
import { handleErrorMessage } from "../../utils/commonFunctions";
import swal from "sweetalert";

function SetPassword(props) {
  const dispatch = useDispatch();
  const userData = useSelector((Gstate) => [Gstate.user.auth]);
  const router = useRouter();
  const [showErrors, setShowErrors] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [data, setData] = useState({
    new_password: "",
    confirm_password: "",
  });
  let queryRoute = router.query.query;
  const decodedQuery = decodeData(queryRoute);
  const { confirm_password, new_password } = data;

  const onChangeHandler = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (isAuth()) {
      router.push("/profile-management");
    }
  });

  const updatePassword = () => {
    setShowErrors(true);
    setShowPass(false);

    if (
      !Validation.password(new_password) ||
      !Validation.password(confirm_password)
    ) {
      return;
    }
    if (confirm_password != new_password) {
      alert(
        "Please enter same password in the New Password and Confirm Password fields"
      );
      return;
    }
    let encodedpayload = encodeData({
      email: decodedQuery.email,
      password: new_password,
    });

    API.apiPost("resetUserPassword", {payload:encodedpayload})
      .then((response) => {
        if (response.data && response.data.success === true) {
          setData({
            ...data,
            new_password: "",
            confirm_password: "",
          });
          setShowErrors(false);
          swal({
            title: response.data.message,
            text: "",
            icon: "success",
          });
          router.push("/");
        }
      })
      .catch((err) => {
        handleErrorMessage(err);
      });
  };

  const popoverButton = (
    <Popover id="popover-positioned-bottom" className={` ${styles.popIcon}`}>
      • Password must be alphanumeric, contain between 8 to 16 characters.
      <br />• Password must contain at least 3 numeric characters. <br />•{" "}
      Password must contain at least 1 uppercase character.
      <br /> •Password must contain at least 1 lowercase character.
      <br />• Password must contain at least 1 Special Character
    </Popover>
  );

  return (
    <div className={`row ${styles.outerbox}`}>
      <div className={`col-md-6 row ${styles.backgroundFirsthalf}`}>
        <div className="col-md-4"></div>
        <div className={`col-md-8 ${styles.divide}`}>
          <Image
            src="/images/LogoTSC.svg"
            className={`img-fluid ${styles.logoTsc}`}
            alt="TSClogo"
          ></Image>
          <Image
            src="/images/LogoMain.svg"
            className={`img-fluid ${styles.logo}`}
            alt="logo"
          ></Image>
          <div>
            <p className={` ${styles.tagline}`}>
              Developing Solutions For The Future
            </p>
          </div>
        </div>
      </div>
      <div className={`col-md-6 row ${styles.backgroundSecondHalf}`}>
        <div className={`col-md-8 ${styles.formStyle}`}>
          <Form.Group className={`${styles.Authform}`}>
            <div className={`${styles.AuthFormContent}`}>
              <h3
                className={` ${styles.sparkle} ${styles.uhoversparkle} ${styles.Authformtitle}`}
              >
                Update Password
              </h3>
              <div className="form-group mt-3">
                <Form.Label>
                  <b>New Password</b>
                  <span>
                    <OverlayTrigger placement="bottom" overlay={popoverButton}>
                      <span>
                        <Image
                          src="/images/information.svg"
                          className={`mx-2 ${styles.hoverInfo}`}
                          alt="information"
                        ></Image>
                      </span>
                    </OverlayTrigger>
                  </span>
                </Form.Label>
                <Form.Control
                  type={showPass ? "text" : "password"}
                  value={new_password}
                  name="new_password"
                  isInvalid={showErrors && !Validation.password(new_password)}
                  className="form-control mt-1 p-2"
                  placeholder="New Password"
                  onChange={onChangeHandler}
                  required
                />
              </div>
              <div className="form-group mt-3">
                <Form.Label>
                  <b>Confirm Password</b>
                </Form.Label>

                <Form.Control
                  type={showPass ? "text" : "password"}
                  className="form-control mt-1 p-2"
                  placeholder="Confirm Password"
                  name="confirm_password"
                  isInvalid={
                    showErrors && !Validation.password(confirm_password)
                  }
                  value={confirm_password}
                  onChange={onChangeHandler}
                  required
                />
              </div>
              <div className="d-grid gap-2 mt-3">
                <button
                  type="submit"
                  onClick={updatePassword}
                  className={`btn ${styles.LoginBtn}`}
                >
                  Update Password
                </button>
              </div>
            </div>
          </Form.Group>
        </div>
        <div className={`${styles.poweredByLogo}`}>
          <p className={` ${styles.poweredBy} px-3`}>
            <b>Powered By</b>
          </p>
          <div className={`${styles.mainLogo}`}>
          <Image
            src="/images/LogoMain.svg"
            className={`img-fluid ${styles.poweredLogo}`}
            alt="logo"
          ></Image>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SetPassword;
