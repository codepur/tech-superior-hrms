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

const intialData = {
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

  ref_name: "",
  ref_designation: "",
  ref_companyname: "",
  nominee_name: "",
  nominee_relation: "",
  nominee_dob: "",
  nominee_aadhar: "",
  nominee_contact: "",

  companyContact: "",
  alternateContact: "",
  aadhar: "",
  pan: "",
  bloodGroup: "",
  doj: "",
  permanent_address: "",
  permanent_city: "",
  permanent_state: "",
  personalEmail: "",
};

export default function BasicInfo(props) {  
  const { first_name, last_name, dob, gender, bloodGroup } = props.userData;
  const ALlState = State?.getStatesOfCountry("IN");
  const [data, setData] = useState(intialData);
  const userData = useSelector((Gstate) => Gstate.user.userData);
  const [showErrors, setShowErrors] = useState(false);
  const {
    //first_name,
    //last_name,
    //dob,
    //gender,
    //bloodGroup, 
    marital_status,
    phone,
    address_line1,
    city,
    state,
    zip_code,
    Tyears,
    Tmonths,
    Ryears,
    Rmonths,
    ref_name,
    ref_designation,
    ref_companyname,
    nominee_name,
    nominee_relation,
    nominee_dob,
    nominee_aadhar,
    nominee_contact,

    companyContact,
    alternateContact,
    aadhar,
    pan,
    doj,
    permanent_address,
    permanent_city,
    permanent_state,
    personalEmail,
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
      !Validation.maxOf(marital_status, 20) ||
      !Validation.maxOf(phone, 11) ||
      !Validation.numericPhone(phone) ||
      !Validation.maxOf(zip_code, 6) ||
      !Validation.maxOf(state, 30) ||
      !Validation.maxOf(city, 30) ||
      !Validation.maxOf(address_line1, 50) ||

      !Validation.maxOf(nominee_aadhar, 13) ||
      !Validation.numericPhone(nominee_contact) ||
      !Validation.date(nominee_dob) ||
      !Validation.maxOf(nominee_relation, 20) ||
      !Validation.maxOf(nominee_name, 20) ||

      !Validation.numericPhone(companyContact) ||
      !Validation.numericPhone(alternateContact) ||
      !Validation.maxOf(aadhar, 12) ||
      !Validation.maxOf(pan, 10) ||
      !Validation.date(doj) ||
      !Validation.maxOf(permanent_state, 30) ||
      !Validation.maxOf(permanent_city, 30) ||
      !Validation.maxOf(permanent_address, 50)
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
      <p className={`${styles.info} fw-bold p-2`}> Personal Information <sup className="text-danger" >*</sup></p>
      <Form>
        <Row className="mb-3">
          <Form.Group className="col-md-4" controlId="formGridFirstName">
            <Form.Label className="fw-bold">First Name</Form.Label>
            <Form.Control
              name="first_name"
              value={first_name}
              disabled
            />
          </Form.Group>

          <Form.Group className="col-md-4" controlId="formGridLastName">
            <Form.Label className="fw-bold">Last Name</Form.Label>
            <Form.Control
              name="last_name"
              value={last_name}
              disabled
            />
          </Form.Group>
          <Form.Group className="col-md-4" controlId="formGridDob">
            <Form.Label className="fw-bold">DOB</Form.Label>
            <Form.Control
              type="date"
              value={dob}
              name="dob"
              disabled
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group className="col-md-4" controlId="formGridGender">
            <Form.Label className="fw-bold">Gender</Form.Label>
            <Form.Control
              type="text"
              value={gender ? gender : "-----"}
              name="gender"
              disabled
            />
          </Form.Group>

          <Form.Group className="col-md-4" controlId="formGridBloodGroup">
            <Form.Label className="fw-bold">Blood Group</Form.Label>
            <Form.Control
              type="text"
              value={bloodGroup ? bloodGroup : "-----"}
              name="bloodGroup"
              disabled
            />
          </Form.Group>

          <Form.Group className="col-md-4" controlId="formGridEmail">
            <Form.Label className="fw-bold">Personal Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your Personal Email"
              onChange={handleChange}
              value={personalEmail}
              name="personalEmail"
              maxLength="40"
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group className="col-md-4" controlId="formGridContact">
            <Form.Label className="fw-bold">Contact Number</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Contact Number"
              onChange={handleChange}
              value={phone?.replace(/\D+/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')}
              name="phone"
              isInvalid={showErrors && !Validation.numericPhone(phone)}
              maxLength="10"
            />
            <Form.Control.Feedback type="invalid">
              {!phone ? "Please Enter Your phone" : ""}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="col-md-4" controlId="formGridContact2">
            <Form.Label className="fw-bold">Alternate Contact Number</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Alternate Contact Number"
              onChange={handleChange}
              value={alternateContact?.replace(/\D+/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')}
              name="alternateContact"
              maxLength="10"
            />
          </Form.Group>

          <Form.Group className="col-md-4" controlId="formGridMaritalStatus">
            <Form.Label className="fw-bold">Marital Status</Form.Label>
            <Form.Select
              type="text"
              placeholder="Enter your Marital Status"
              onChange={handleChange}
              value={marital_status}
              name="marital_status"
              aria-label="Default select form"
              isInvalid={showErrors && !Validation.maxOf(marital_status, 20)}
            >
              <option hidden>select</option>
              <option>married</option>
              <option>unmarried</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {!marital_status ? "Please Enter Marital Status" : ""}
            </Form.Control.Feedback>
          </Form.Group>

        </Row>
        <Row className="mb-3">
          <Form.Group className="col-md-4" controlId="formGridAadhar">
            <Form.Label className="fw-bold">Aadhar Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your Aadhar Number"
              onChange={handleChange}
              value={aadhar}
              name="aadhar"
              isInvalid={showErrors && !Validation.maxOf(aadhar, 12)}
            />
            <Form.Control.Feedback type="invalid">
              {!aadhar ? "Please Enter Your Aadhar Number" : ""}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="col-md-4" controlId="formGridPan">
            <Form.Label className="fw-bold">Pan Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your Pan Number"
              onChange={handleChange}
              value={pan}
              name="pan"
              isInvalid={showErrors && !Validation.maxOf(pan, 10)}
            />
            <Form.Control.Feedback type="invalid">
              {!pan ? "Please Enter Pan Number" : ""}
            </Form.Control.Feedback>
          </Form.Group>

        </Row>

        <p className={`${styles.info} fw-bold p-2`}>Total Working Experience</p>
        <Row className=" fw-bold">
          <Form.Group className="col-md-6" controlId="formGridTotalYears">
            <Form.Label>Years</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Years"
              value={Tyears}
              name="Tyears"
              onChange={handleChange}
            // isInvalid={
            //   showErrors && (!Tyears || !Validation.minOf(Tyears, 3))
            // }
            />
          </Form.Group>

          <Form.Group className="col-md-6" controlId="formGridTotalMonths">
            <Form.Label>Months</Form.Label>
            <Form.Control
              type="months"
              onChange={handleChange}
              placeholder="Enter Months"
              value={Tmonths}
              name="Tmonths"
            // isInvalid={
            //   showErrors && (!Tmonths || !Validation.minOf(Tmonths, 3))
            // }
            />
          </Form.Group>
        </Row>
        <Row className="mt-4 fw-bold mb-3">
          <Form.Label className="text-start">
            Relevant Working Experience
          </Form.Label>
          <Form.Group className="col-md-6" controlId="formGridRelYears">
            <Form.Label>Years</Form.Label>
            <Form.Control
              placeholder="Enter Years"
              type="number"
              onChange={handleChange}
              value={Ryears}
              name="Ryears"
            // isInvalid={
            //   showErrors && (!Ryears || !Validation.minOf(Ryears, 3))
            // }
            />
          </Form.Group>
          <Form.Group className="col-md-6" controlId="formGridRelMonths">
            <Form.Label>Months</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Months"
              onChange={handleChange}
              value={Rmonths}
              name="Rmonths"
            // isInvalid={
            //   showErrors && (!Rmonths || !Validation.minOf(Rmonths, 3))
            // }
            />
          </Form.Group>
        </Row>

        <p className={`${styles.info} fw-bold p-2`}>Address Information <sup className="text-danger" >*</sup> </p>
        <Row className="">
          <Form.Group className="" controlId="formGridCorresAdd">
            <Form.Label className="fw-bold">Corresponding Address</Form.Label>

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
              // defaultValue="Choose..."
              onChange={handleChange}
              name="state"
              value={data.state}
              isInvalid={showErrors && !Validation.maxOf(state, 30)}
            >
              <option hidden>Select Your State</option>
              {ALlState.map((item, i) => (
                <option key={i}>{item.name}</option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {!state ? "Please Select State Name" : ""}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="col-md-4" controlId="formGridZipCode">
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

        <Row className="mt-1">
          <Form.Group className="mt-4" controlId="formGridAddress2">
            <Form.Label className="fw-bold">Permanent Address</Form.Label>

            <Form.Control
              as="textarea"
              rows={3}
              onChange={handleChange}
              name="address_line1"
              value={permanent_address}
              placeholder="Enter Your Address"
              isInvalid={showErrors && !Validation.maxOf(permanent_address, 50)}
            />
            <Form.Control.Feedback type="invalid">
              {!permanent_address ? "Please Enter Your Address" : ""}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3 mt-3 ">
          <Form.Group className="col-md-4" controlId="formGridPermanentCity">
            <Form.Label className="fw-bold">City</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="permanent_city"
              value={permanent_city}
              isInvalid={showErrors && !Validation.maxOf(permanent_city, 30)}
            />
            <Form.Control.Feedback type="invalid">
              {!permanent_city ? "Please Enter City Name" : ""}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="col-md-4" controlId="formGridPermanentState">
            <Form.Label className="fw-bold">State</Form.Label>
            <Form.Select
              // defaultValue="Choose..."
              onChange={handleChange}
              name="permanent_state"
              value={data.permanent_state}
              isInvalid={showErrors && !Validation.maxOf(permanent_state, 30)}
            >
              <option hidden>Select Your State</option>
              {ALlState.map((item, i) => (
                <option key={i}>{item.name}</option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {!state ? "Please Select State Name" : ""}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="col-md-4" controlId="formGridPermanentZipCode">
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

        <p className={`${styles.info} fw-bold p-2`}> Reference Information </p>
        <Row className="mt-4">
          <Row className="mb-3">
            <Form.Group className="col-md-4" controlId="formGridRefName">
              <Form.Label className="fw-bold">Name</Form.Label>
              <Form.Control
                type="text"
                name="ref_name"
                placeholder="Enter Name"
                onChange={handleChange}
                value={ref_name}
              />
            </Form.Group>

            <Form.Group className="col-md-4" controlId="formGridRefDesignation">
              <Form.Label className="fw-bold">Designation</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Designation"
                name="ref_designation"
                onChange={handleChange}
                value={ref_designation}
              />
            </Form.Group>
            <Form.Group className="col-md-4" controlId="formGridRefCompany">
              <Form.Label className="fw-bold">Company Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Company Name"
                name="ref_companyname"
                onChange={handleChange}
                value={ref_companyname}
              />
            </Form.Group>
          </Row>
        </Row>

        <p className={`${styles.info} fw-bold p-2`}> Nominee Information <sup className="text-danger" >*</sup></p>
        <Row className="mt-4">
          <Row className="mb-3">
            <Form.Group className="col-md-4" controlId="formGridNomName">
              <Form.Label className="fw-bold">Name</Form.Label>
              <Form.Control
                type="text"
                name="nominee_name"
                placeholder="Enter Name"
                onChange={handleChange}
                value={nominee_name}
                isInvalid={showErrors && !Validation.maxOf(nominee_name, 20)}
              />
              <Form.Control.Feedback type="invalid">
                {!nominee_name ? "Please Enter Name" : ""}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="col-md-4" controlId="formGridNomRelation">
              <Form.Label className="fw-bold">Relationship Status</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Relation"
                name="nominee_relation"
                onChange={handleChange}
                value={nominee_relation}
                isInvalid={showErrors && !Validation.maxOf(nominee_relation, 20)}
              />

              <Form.Control.Feedback type="invalid">
                {!nominee_relation ? "Please Enter Relation" : ""}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="col-md-4" controlId="formGridNomDob">
              <Form.Label className="fw-bold">DOB</Form.Label>
              <Form.Control
                type="date"
                onChange={handleChange}
                value={nominee_dob}
                name="nominee_dob"
                isInvalid={showErrors && !Validation.date(nominee_dob)}
              />
              <Form.Control.Feedback type="invalid">
                {!nominee_dob ? "Please Enter Nominee Dob" : ""}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="mb-4">
            <Form.Group className="col-md-4" controlId="formGridNomContact">
              <Form.Label className="fw-bold">Contact Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Contact Number"
                onChange={handleChange}
                value={nominee_contact}
                name="nominee_contact"
                isInvalid={showErrors && !Validation.numericPhone(nominee_contact)}
              />
              <Form.Control.Feedback type="invalid">
                {!nominee_contact ? "Please Enter Nominee Contact" : ""}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="col-md-4" controlId="formGridNomAadhar">
              <Form.Label className="fw-bold">Aadhar Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Aadhar Number"
                onChange={handleChange}
                value={nominee_aadhar}
                name="nominee_aadhar"
                isInvalid={showErrors && !Validation.maxOf(nominee_aadhar, 13)}
              />
              <Form.Control.Feedback type="invalid">
                {!nominee_aadhar ? "Please Enter Nominee Aadhar" : ""}
              </Form.Control.Feedback>
            </Form.Group>

          </Row>
        </Row>

        <Button
          // variant="primary"
          type="submit"
          className="mb-3 bg-btn-green"
          onClick={handleClick}
        >
          Submit
        </Button>
      </Form>
    </>
  );
}

