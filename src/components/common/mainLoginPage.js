import React, { useEffect, useState } from "react";
import router from "next/router";
import styles from "../../styles/login.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../stores/actions/mainPage";
import { encodeData } from "../../helpers/auth";
import { isAuth } from "../../helpers/auth";
import { Form, Image } from "react-bootstrap";
import API from "../../helpers/api";
import { handleErrorMessage } from "../../utils/commonFunctions";
import Validation from "../../utils/validations";
import toast, { Toaster } from "react-hot-toast";

function MainLoginPage(props) {
  const dispatch = useDispatch();
  const [showErrors, setShowErrors] = useState(false);
  const userData = useSelector((Gstate) => [Gstate.user.auth]);
  const [data, setData] = useState({
    email: "",
    password: "",
    emailReset: "",
  });
  const { email, password, emailReset } = data;

  const handleSubmit = (e) => {
    setShowErrors(true);
    if (!Validation.email(email)) {
      return;
    }
    e.preventDefault();
    let payload = {
      email: data.email,
      password: data.password,
    };
    dispatch(login(payload));
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (isAuth()) {
      router.push("/employee-dashboard");
    }
  });

  const [state, setState] = useState({
    firstPageLogin: true,
    resetPassword: false,
  });

  const { firstPageLogin, resetPassword } = state;

  const forgotPass = (e) => {
    e.preventDefault();
    setState({
      ...state,
      firstPageLogin: false,
      resetPassword: true,
    });
  };

  const sendEmail = (e) => {
    setShowErrors(true);
    if (!Validation.email(emailReset)) {
      return;
    }
    setState({
      ...state,
      firstPageLogin: true,
      resetPassword: false,
    });

    API.apiPost("sendResetEmail", {
      payload: encodeData({ email: data.emailReset }),
    })
      .then((response) => {
        if (response.data && response.data.success === true) {
          setShowErrors(false);
          toast.success(response.data.message, {
            position: "top-right",
            style: {
              padding: "16px",
              color: "#3c5f4b",
              marginRight: "25px",
            },
          });
        }
      })
      .catch((err) => {
        handleErrorMessage(err);
      });
  };

  return (
    <>
      <div className={`${styles.outerbox} row`}>
        <Image src="./images/clock.png" alt="clock" className="clockImg" />
        <Image src="./images/officeLaptop.png" alt="" className="laptopImg" />
        <Image src="./images/graph.png" alt="" className="graph" />
        <Image src="./images/win.png" alt="" className="win" />
        <Image src="./images/laptop.png" alt="" className="laptop" />
        {/* <Image src="./images/win2.png" alt="" className="win2" /> */}
        <Image src="./images/checkList6.png" alt="" className="checkList6" />
        <div className={`${styles.backgroundFirsthalf}`}>
          <div className={`${styles.loginCard} row`}>
            <div className={` col-md-6 ${styles.divide}`}>
              <Image
                src="/images/LogoTSC.svg"
                alt="LogoMain"
                className={`img-fluid ${styles.logoTsc}`}
              />
              <Image
                src="/images/LogoMain.svg"
                alt="LogoMain"
                className={`img-fluid ${styles.logo}`}
              />
              <p>Developing Solutions For The Future</p>
            </div>
            {firstPageLogin && (
              // <div className={`col-md-6 row ${styles.backgroundSecondHalf} `}>
              // <div className={`col-md-8 ${styles.formStyle} parent`}>
              <div className={`col-md-6`}>
                <Form.Group className={`${styles.Authform}`}>
                  <div className={`${styles.AuthFormContent}`}>
                    <h3
                      className={` ${styles.sparkle} ${styles.uhoversparkle} ${styles.Authformtitle}`}
                    >
                      Sign In
                    </h3>
                    <div className="form-group mt-3">
                      <Form.Label>
                        <b>Email</b>
                      </Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        className="form-control mt-1 p-2"
                        placeholder="Enter email"
                        isInvalid={showErrors && !Validation.email(email)}
                        onChange={handleChange}
                        value={email}
                      />
                    </div>
                    <div className="form-group mt-3">
                      <Form.Label>
                        <b>Password</b>
                      </Form.Label>
                      <Form.Control
                        type="password"
                        name="password"
                        className="form-control mt-1 p-2"
                        placeholder="Enter password"
                        onChange={handleChange}
                        value={password}
                      />
                    </div>
                    <div>
                      <p className="forgot-password text-right mt-2">
                        <a
                          href=""
                          onClick={forgotPass}
                          className={`${styles.forgetLinks}`}
                        >
                          Forgot password?
                        </a>
                      </p>
                    </div>
                    <div className="d-grid gap-2 mt-3">
                      <button
                        type="button"
                        className={`btn ${styles.LoginBtn}`}
                        onClick={handleSubmit}
                      >
                        Sign In
                      </button>
                    </div>
                    <div className={`row ${styles.powerdByLogo} p-3`}>

                      <div className={` ${styles.poweredBy} px-4`}>Powered By</div>
                      <div className={`${styles.logoImage}`}>
                        <Image
                          src="/images/LogoMain.svg"
                          alt="LogoMain"
                          className={`img-fluid ${styles.poweredLogo}`}
                        />
                      </div>
                    </div>
                  </div>
                </Form.Group>
                {/* </div> */}

              </div>
            )}
            {resetPassword && (
              <div className={`col-md-6 row ${styles.backgroundSecondHalf}`}>
                <div className={`col-md-8 ${styles.formStyle}`}>
                  <Form.Group className={`${styles.AuthformReset}`}>
                    <div className={`${styles.AuthFormContent}`}>
                      <h3
                        className={` ${styles.sparkle} ${styles.uhoversparkle} ${styles.Authformtitle}`}
                      >
                        Reset Password
                      </h3>
                      <div className="form-group mt-3">
                        <Form.Label>
                          <b>Email</b>
                        </Form.Label>
                        <Form.Control
                          type="email"
                          name="emailReset"
                          isInvalid={showErrors && !Validation.email(emailReset)}
                          className="form-control mt-1 p-2"
                          placeholder="Enter email"
                          onChange={handleChange}
                          value={emailReset}
                        />
                      </div>
                      <div className="d-grid gap-2 mt-3">
                        <button
                          type="submit"
                          className={`btn ${styles.LoginBtn}`}
                          onClick={sendEmail}
                        >
                          Send Email
                        </button>
                      </div>
                    </div>
                  </Form.Group>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>

    </>
  )
}
export default MainLoginPage;

