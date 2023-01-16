import { Button, Form, Image } from "react-bootstrap";
import styles from "../../../styles/ProfileManagement.module.scss";
import Row from "react-bootstrap/Row";
import { useState } from "react";
import Validation from "../../../utils/validations";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setQualificationList } from "../../../stores/actions/mainPage";
import API from "../../../helpers/api";
import { handleErrorMessage } from "../../../utils/commonFunctions";
import toast from "react-hot-toast";
import { encodeData } from "../../../helpers/auth";

export default function QualificationComponent() {
  const [data, setData] = useState([]);
  const [showErrors, setShowErrors] = useState(false);
  const dispatch = useDispatch();
  const qualificationList = useSelector(
    (Gstate) => Gstate.user.qualificationList
  );
  console.log("qualificationList", qualificationList);
  const userData = useSelector((Gstate) => Gstate.user.userData);
  const user_id = encodeData(userData._id);
  useEffect(() => {
    dispatch(setQualificationList(user_id));
  }, []);

  useEffect(() => {
    if (qualificationList.length) {
      let itemData = qualificationList.map((item) => {
        item.save = true;
        return item;
      });
      setData(itemData);
    }
  }, [qualificationList, qualificationList.length]);

  const handleChange = (i, e) => {
    setShowErrors(false);
    let newFormValues = [...data];
    newFormValues[i][e.target.name] = e.target.value;
    setData(newFormValues);
  };

  const removeFormFields = (i, item) => {
    let newFormValues = [...data];
    newFormValues.splice(i, 1);
    setData(newFormValues);

    API.apiPost("deleteQualification", { payload: encodeData(item) })
      .then((response) => {
        if (response.data && response.data.success === true) {
          toast.success(response.data.message, {
            position: "top-right",
            style: {
              padding: "16px",
              color: "#3c5f4b",
              marginRight: "25px",
            },
          });
          setRender(!render);
        }
      })
      .catch((err) => {
        handleErrorMessage(err);
      });
  };

  const addFormFields = () => {
    let item = [...data];
    let obj = {
      qualification_type: "",
      course_name: "",
      course_type: "",
      stream: "",
      course_start_date: "",
      course_end_date: "",
      college_name: "",
      university_name: "",
      save: false,
    };
    item.push(obj);
    setData(item);
  };

  const editdata = (i) => {
    let arrdata = [...data];
    arrdata[i]["save"] = false;
    setData(arrdata);
  };

  const handleClick = (e, item) => {
    e.preventDefault();

    //=============================for future use of validation=================================
    // setShowErrors(true);
    // let isValidForm = true;
    // data?.forEach((form) => {
    //   for (const property in form) {
    //     switch (property) {
    //       case "qualification_type":
    //       // if (form?.qualification_type == "") {
    //       //   isValidForm = false;
    //       //   return;
    //       // }
    //       // break;
    //       case "course_name":
    //         if (!Validation.maxOf(form?.course_name, 30)) {
    //           isValidForm = false;
    //           return;
    //         }
    //         break;
    //       // case "course_type":
    //       //   if (form?.course_type == "") {
    //       //     isValidForm = false;
    //       //     return;
    //       //   }
    //       //   break;
    //       case "stream":
    //         if (!Validation.maxOf(form?.stream, 30)) {
    //           isValidForm = false;
    //           return;
    //         }
    //         break;
    //       case "course_start_date":
    //         if (!Validation.date(form?.course_start_date)) {
    //           isValidForm = false;
    //           return;
    //         }
    //         break;
    //       case "course_end_date":
    //         if (!Validation.date(form?.course_end_date)) {
    //           isValidForm = false;
    //           return;
    //         }
    //         break;
    //       // case "college_name":
    //       //   if (!Validation.maxOf(college_name, 50)) {
    //       //     isValidForm = false;
    //       //     return;
    //       //   }
    //       //   break;
    //       case "university_name":
    //         if (!Validation.maxOf(form?.university_name, 50)) {
    //           isValidForm = false;
    //           return;
    //         }
    //         break;
    //       default:
    //         break;
    //     }
    //   }
    // });
    // if (isValidForm == false) {
    //   return;
    // } else {
    // setShowErrors(false);
    //=============================for future use of validation=================================
    API.apiPost("updateQualification", { payload: encodeData(item) })
      .then((response) => {
        if (response.data && response.data.success === true) {
          toast.success(response.data.message, {
            position: "top-right",
            style: {
              padding: "16px",
              color: "#3c5f4b",
              marginRight: "25px",
            },
          });
          dispatch(setQualificationList());
        }
      })
      .catch((err) => {
        handleErrorMessage(err);
      });
    // }
  };

  return (
    <>
      <div className="row mb-2 p-2">
        <p className={`${styles.info} fw-bold p-2`}> Educational Info</p>
        {data.map((item, i) =>
          item.save == false ? (
            <Form key={i} className={`mb-3 ${styles.formOutline}`}>
              <Row className="mb-2">
                <div
                  className="user-select-none d-flex justify-content-end"
                  onClick={() => removeFormFields(i, item)}
                >
                  <Image src="/images/cancel.svg" alt="add" width={25} />
                </div>
              </Row>
              <Row>
                <Form.Group controlId="formGridState">
                  <Form.Select
                    onChange={(e) => handleChange(i, e)}
                    name="qualification_type"
                    value={item.qualification_type}
                  >
                    <option hidden>Qualification Type</option>
                    <option value="Graduation">Graduation </option>
                    <option value="Post Graduation">Post Graduation </option>
                    <option value="Doctorate">Doctorate </option>
                    <option value="diploma">Diploma</option>
                    <option value="Other Education">Other Education </option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {!item.qualification_type
                      ? "Please Enter Your Qualification"
                      : ""}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="mt-3">
                <Form.Group className="col-md-4" controlId="formGridEmail">
                  <Form.Label className="fw-bold">Course Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Course Name"
                    onChange={(e) => handleChange(i, e)}
                    value={item.course_name}
                    name="course_name"
                    isInvalid={
                      showErrors && !Validation.maxOf(item.course_name, 30)
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {!item.course_name ? "Please Enter Your Course Name" : ""}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="col-md-4" controlId="formGridPassword">
                  <Form.Label className="fw-bold">Course Type</Form.Label>
                  <Form.Select
                    name="course_type"
                    value={item.course_type}
                    onChange={(e) => handleChange(i, e)}
                  >
                    <option hidden>Course Type</option>
                    <option value="Full Time">Full Time</option>
                    <option value="Part Time">Part Time</option>
                    <option value="Part Time">Correspondence</option>
                    <option value="Part Time">Certificate</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {!item.course_type ? "Please Enter Your Course Type" : ""}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="col-md-4" controlId="formGridAddress1">
                  <Form.Label className="fw-bold">Stream</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => handleChange(i, e)}
                    value={item.stream}
                    placeholder="Enter your Stream"
                    name="stream"
                    isInvalid={showErrors && !Validation.maxOf(item.stream, 30)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {!item.stream ? "Please Enter Your Stream" : ""}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="mt-3">
                <Form.Group className="col-md-4" controlId="formGridEmail">
                  <Form.Label className="fw-bold">Course Start Date</Form.Label>
                  <Form.Control
                    type="date"
                    onChange={(e) => handleChange(i, e)}
                    value={item.course_start_date}
                    name="course_start_date"
                    isInvalid={
                      showErrors && !Validation.date(item.course_start_date)
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {!item.course_start_date
                      ? "Please Enter Your Course Starting Date"
                      : ""}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="col-md-4" controlId="formGridPassword">
                  <Form.Label className="fw-bold">Course End Date</Form.Label>
                  <Form.Control
                    type="Date"
                    onChange={(e) => handleChange(i, e)}
                    value={item.course_end_date}
                    name="course_end_date"
                    isInvalid={
                      showErrors && !Validation.date(item.course_end_date)
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {!item.course_end_date
                      ? "Please Enter Your Course End Date"
                      : ""}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="col-md-4" controlId="formGridAddress1">
                  <Form.Label className="fw-bold">College Name</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => handleChange(i, e)}
                    value={item.college_name}
                    name="college_name"
                    placeholder="Enter College Name"
                  />
                </Form.Group>
              </Row>
              <Row className="mt-3">
                <Form.Group controlId="formGridState">
                  <Form.Label className="fw-bold">University Name</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => handleChange(i, e)}
                    value={item.university_name}
                    name="university_name"
                    placeholder="Enter University Name"
                    isInvalid={
                      showErrors && !Validation.maxOf(item.university_name, 50)
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {!item.university_name
                      ? "Please Enter Your UniverSity Name"
                      : ""}
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Button
                variant="primary"
                type="submit"
                className="mb-2 mt-4 bg-btn-green "
                onClick={(e) => handleClick(e, item)}
              >
                Save
              </Button>
            </Form>
          ) : (
            item.status == "Active" && (
              <>
                <div className={`${styles.formCard} d-flex`} key={i}>
                  <div className={`${styles.courseCard} col-md-4`}>
                    <img
                      src="/images/graduationImage.jpg"
                      alt=""
                      className={`${styles.imgCard}`}
                    />
                  </div>
                  <div className={`${styles.courseInfoCard} col-md-7 `}>
                    <div className="col-md-12 d-flex justify-content-center mt-3">
                      <b>{item?.qualification_type}</b>
                    </div>
                    <div className={`${styles.courseTable} d-flex mx-5`}>
                      <tbody>
                        <tr className={`${styles.cardInput}`}>
                          <th className={`${styles.cardPoint}`}>Course</th>
                          <th className="px-4">|</th>
                          <td className={`${styles.cardPoint}`}>{`${
                            item?.course_name ? item?.course_name : "-"
                          }`}</td>
                        </tr>
                        <tr className={`${styles.cardInput}`}>
                          <th className={`${styles.cardPoint}`}>Course Type</th>
                          <th className="px-4">|</th>
                          <td className={`${styles.cardPoint}`}>{`${
                            item?.course_type ? item?.course_type : "-"
                          }`}</td>
                        </tr>
                        <tr className={`${styles.cardInput}`}>
                          <th className={`${styles.cardPoint}`}>Stream</th>
                          <th className="px-4">|</th>
                          <td className={`${styles.cardPoint}`}>{`${
                            item?.stream ? item?.stream : "-"
                          }`}</td>
                        </tr>
                        <tr className={`${styles.cardInput}`}>
                          <th className={`${styles.cardPoint}`}>College</th>
                          <th className="px-4">|</th>
                          <td className={`${styles.cardPoint}`}>{`${
                            item?.college_name ? item?.college_name : "-"
                          }`}</td>
                        </tr>
                        <tr className={`${styles.cardInput}`}>
                          <th className={`${styles.cardPoint}`}>University</th>
                          <th className="px-4">|</th>
                          <td className={`${styles.cardPoint}`}>{`${
                            item?.university_name ? item?.university_name : "-"
                          }`}</td>
                        </tr>
                      </tbody>
                    </div>
                  </div>
                  <div className={`p-2 col-md-1`}>
                    <div
                      className="float-end user-select-none"
                      onClick={() => removeFormFields(i, item)}
                    >
                      <Image src="/images/cancel.svg" alt="add" width={25} />
                    </div>
                    <div
                      className="float-end user-select-none me-2"
                      onClick={() => editdata(i)}
                    >
                      <Image src="/images/edit.png" alt="add" width={20} />
                    </div>
                  </div>
                </div>
              </>
            )
          )
        )}
      </div>

      <div className={`p-2`}>
        <div onClick={addFormFields} className=" user-select-none">
          <Image src="/images/add.png" alt="add" />
          <a className="">Add</a>
        </div>
      </div>
    </>
  );
}
