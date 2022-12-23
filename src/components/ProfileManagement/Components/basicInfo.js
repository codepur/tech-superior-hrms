import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import API from "../../../helpers/api";
import styles from "../../../styles/ProfileManagement.module.scss";
import { handleErrorMessage } from "../../../utils/commonFunctions";
import Validation from "../../../utils/validations";
import swal from "sweetalert";
import { useSelector } from "react-redux";
import { State } from "country-state-city";

const intialState = {
  first_name: "",
  last_name: "",
  dob: "",
  gender: "",
  martial_status: "",
  phone: "",
  address: [],
  Tyears: "",
  Tmonths: "",
  Ryears: "",
  Rmonths: "",
};

export default function BasicInfo() {
  const AllState = State?.getStatesOfCountry("IN");
  const [data, setData] = useState(intialState);
  const userData = useSelector((Gstate) => Gstate.user.userData);
  const [showErrors, setShowErrors] = useState(false);
  const {
    first_name,
    last_name,
    dob,
    gender,
    martial_status,
    phone,
    address_line1,
    city,
    state,
    zip_code,
    Tyears,
    Tmonths,
    Ryears,
    Rmonths,
  } = data;

  const handleChange = (e) => {
    setShowErrors(false);
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClick = (e) => {
    e.preventDefault();
    setShowErrors(true);
    if (
      !Validation.maxOf(first_name, 20) ||
      !Validation.maxOf(last_name, 20) ||
      !Validation.date(dob) ||
      !Validation.maxOf(gender, 10) ||
      !Validation.maxOf(martial_status, 20) ||
      !Validation.numericPhone(phone) ||
      !Validation.maxOf(zip_code, 10) ||
      !Validation.maxOf(state, 30) ||
      !Validation.maxOf(city, 30) ||
      !Validation.maxOf(address_line1, 50)
    ) {
      return;
    } else {
      setShowErrors(false);
      data.email = userData.email;
      data.address.push({
        city: data.city,
        state: data.state,
        zip_code: data.zip_code,
        address_line1: data.address_line1,
      });
      delete data.city;
      delete data.state;
      delete data.zip_code;
      delete data.address_line1;
      

      API.apiPut("getlogin", data)
        .then((response) => {
          if (response.data && response.data.success === true) {
            setData(intialData);
            swal({
              title: response.data.message,
              text: "",
              icon: "success",
            });
          }
        })
        .catch((err) => {
          handleErrorMessage(err);
        });
    }
  };
   


  return (
    <>
      <p className={`${styles.info} fw-bold p-2`}> Basic Information</p>
      <Form>
        <Row className="mb-3">
          <Form.Group className="col-md-4" controlId="formGridEmail">
            <Form.Label className="fw-bold">First Name</Form.Label>
            <Form.Control
              type="text"
              name="first_name"
              placeholder="Enter First Name"
              onChange={handleChange}
              value={first_name}
              isInvalid={showErrors && !Validation.maxOf(first_name, 20)}
            />
            <Form.Control.Feedback type="invalid">
              {!first_name ? "Please Enter First Name" : ""}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="col-md-4" controlId="formGridPassword">
            <Form.Label className="fw-bold">Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Last Name"
              name="last_name"
              onChange={handleChange}
              value={last_name}
              isInvalid={showErrors && !Validation.maxOf(last_name, 20)}
            />

            <Form.Control.Feedback type="invalid">
              {!last_name ? "Please Enter Last Name" : ""}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="col-md-4" controlId="formGridAddress1">
            <Form.Label className="fw-bold">DOB</Form.Label>
            <Form.Control
              type="date"
              onChange={handleChange}
              value={dob}
              name="dob"
              isInvalid={showErrors && !Validation.date(dob)}
            />
            <Form.Control.Feedback type="invalid">
              {!dob ? "Please Enter Your Dob" : ""}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group className="col-md-4" controlId="formGridEmail">
            <Form.Label className="fw-bold">Gender</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your Gender"
              onChange={handleChange}
              value={gender}
              name="gender"
              isInvalid={showErrors && !Validation.maxOf(gender, 10)}
            />
            <Form.Control.Feedback type="invalid">
              {!gender ? "Please Enter Your  Gender" : ""}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="col-md-4" controlId="formGridPassword">
            <Form.Label className="fw-bold">Martial Status</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your Martial Status"
              onChange={handleChange}
              value={martial_status}
              name="martial_status"
              isInvalid={showErrors && !Validation.maxOf(martial_status, 20)}
            />
            <Form.Control.Feedback type="invalid">
              {!martial_status ? "Please Enter Martial Status" : ""}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="col-md-4" controlId="formGridAddress1">
            <Form.Label className="fw-bold">Contact Number</Form.Label>
            <Form.Control
              type="number"
              placeholder="Contact Number"
              onChange={handleChange}
              value={phone}
              name="phone"
              isInvalid={showErrors && !Validation.numericPhone(phone)}
            />
            <Form.Control.Feedback type="invalid">
              {!phone ? "Please Enter Your phone" : ""}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mt-4 fw-bold">
          <Form.Label className="text-start">
            Total Working Expreience
          </Form.Label>
          <Form.Group className="col-md-6" controlId="formGridEmail">
            <Form.Label>Years</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Years"
              value={Tyears}
              name="Tyears"
              onChange={handleChange}
              // isInvalid={
              //   showErrors && (!Tyears || !Validation.minOf(Tyears, 3))
              // }
            />
          </Form.Group>

          <Form.Group className="col-md-6" controlId="formGridPassword">
            <Form.Label>Months</Form.Label>
            <Form.Control
              type="number"
              onChange={handleChange}
              placeholder="Enter Months"
              value={Tmonths}
              name="Tmonths"
              // isInvalid={
              //   showErrors && (!Tmonths || !Validation.minOf(Tmonths, 3))
              // }
            />
          </Form.Group>
        </Row>
        <Row className="mt-4 fw-bold">
          <Form.Label className="text-start">
            Relevant Working Expreience
          </Form.Label>
          <Form.Group className="col-md-6" controlId="formGridAddress1">
            <Form.Label>Years</Form.Label>
            <Form.Control
              placeholder="Enter Years"
              type="number"
              onChange={handleChange}
              value={Ryears}
              name="Ryears"
              // isInvalid={
              //   showErrors && (!Ryears || !Validation.minOf(Ryears, 3))
              // }
            />
          </Form.Group>
          <Form.Group className="col-md-6" controlId="formGridAddress1">
            <Form.Label>Months</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Months"
              onChange={handleChange}
              value={Rmonths}
              name="Rmonths"
              // isInvalid={
              //   showErrors && (!Rmonths || !Validation.minOf(Rmonths, 3))
              // }
            />
          </Form.Group>
        </Row>
        <Row className="mt-1">
          <Form.Group className="mt-4" controlId="formGridAddress2">
            <Form.Label className="fw-bold">Address</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              onChange={handleChange}
              name="address_line1"
              value={address_line1}
              placeholder="Enter Your Address"
              isInvalid={showErrors && !Validation.maxOf(address_line1, 50)}
            />
            <Form.Control.Feedback type="invalid">
              {!address_line1 ? "Please Enter Your Address" : ""}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3 mt-3 ">
          <Form.Group className="col-md-4" controlId="formGridCity">
            <Form.Label className="fw-bold">City</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="city"
              value={city}
              isInvalid={showErrors && !Validation.maxOf(city, 30)}
            />
            <Form.Control.Feedback type="invalid">
              {!city ? "Please Enter City Name" : ""}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="col-md-4" controlId="formGridState">
            <Form.Label className="fw-bold">State</Form.Label>
            <Form.Select
              defaultValue="Choose..."
              onChange={handleChange}
              name="state"
              value={state}
              isInvalid={showErrors && !Validation.maxOf(state, 30)}
            >
              <option hidden>Select Your State</option>
              {AllState?.map((item,index) => (
                <option key={index}>{item.name}</option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {!state ? "Please Select State Name" : ""}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="col-md-4" controlId="formGridzip_code">
            <Form.Label className="fw-bold">Zip</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="zip_code"
              value={zip_code}
              isInvalid={showErrors && !Validation.maxOf(zip_code, 10)}
            />
            <Form.Control.Feedback type="invalid">
              {!zip_code ? "Please Enter Zip Code" : ""}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Button
          variant="primary"
          type="submit"
          className="mb-3"
          onClick={handleClick}
        >
          Submit
        </Button>
      </Form>
    </>
  );
}

