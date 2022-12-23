import dynamic from "next/dynamic";
import { useState } from "react";
import { Button, Form, Image, Row } from "react-bootstrap";
import API from "../../../helpers/api";
import { encodeData } from "../../../helpers/auth";
import styles from "../../../styles/ProfileManagement.module.scss";
import { handleErrorMessage } from "../../../utils/commonFunctions";
import Validation from "../../../utils/validations";

export default function EmergenctContact() {
  const [formValues, setFormValues] = useState(
    { name: "", relationship: "", phone: "" },
  );

  const {name,relationship,phone}=formValues;

  const [showErrors, setShowErrors] = useState(false);

  const handleChange = (e) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleClick = () => {
    setShowErrors(true);
    if (
      !Validation.maxOf(name,30) ||
      !Validation.description(relationship) ||
      !Validation.numericPhone(phone) 
    ) {
      return;
    } else {
      setShowErrors(false);
    
    API.apiPost("userFamilyEmergencyUpdate",  {payload:encodeData({emergency_contact:formValues})})
    .then((response) => {
      if (response.data && response.data.success === true) {
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
}


  return (
    <>
      <p className={`${styles.info} fw-bold p-2`}>Emergency Contact</p>
        <Row className="mt-3">
          <Form.Group className="col-md-4" controlId="formGridEmail">
            <Form.Label className="fw-bold">Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              value={name}
              name="name"
              onChange={(e) => handleChange(e)}
              isInvalid={
                showErrors && !Validation.maxOf(name,30)
              }
            />
          </Form.Group>
          <Form.Group className="col-md-4" controlId="formGridPassword">
            <Form.Label className="fw-bold">Relationship Status</Form.Label>
            <Form.Select
              name="relationship"
              value={relationship}
              onChange={(e) => handleChange( e)}
              isInvalid={
                showErrors &&
                  !Validation.description(relationship)
              }
            >
              <option hidden>Select Type</option>
              <option value="Brother">Brother</option>
              <option value="Mother">Mother</option>
              <option value="Father">Father</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="col-md-4" controlId="formGridAddress1">
            <Form.Label className="fw-bold">PhoneNumber</Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => handleChange( e)}
              value={phone}
              placeholder="Enter your Phone Number"
              name="phone"
              isInvalid={
                showErrors &&  !Validation.numericPhone(phone)
              }
            />
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
