import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Button, Form, Image, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import API from "../../../helpers/api";
import { encodeData } from "../../../helpers/auth";
import styles from "../../../styles/ProfileManagement.module.scss";
import { handleErrorMessage } from "../../../utils/commonFunctions";
import Validation from "../../../utils/validations";
import { setFamilyList } from "../../../stores/actions/mainPage";

export default function EmergenctContact() {
  const [formValues, setFormValues] = useState([
    { name: "", relationship: "", phone: "" },
  ]);
  console.log('formValues', formValues)
  const familyList = useSelector((Gstate) => Gstate.user.familyList);
  const { emergency_contact } = familyList;

  const { name, relationship, phone } = formValues;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setFamilyList());
  }, []);

  useEffect(() => {
    if (emergency_contact?.length) {
      let itemData = emergency_contact?.map((item) => {
        item.save = true;
        return item;
      });
      setFormValues(itemData);
    }
  }, [emergency_contact, emergency_contact?.length]);


  const addFormFields = () => {
    let item = [...formValues];
    let obj = {
      name: "",
      relationship: "",
      phone: "",
    };
    item.push(obj);
    setFormValues(item);
  };


  const [showErrors, setShowErrors] = useState(false);

  const handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value
    setFormValues(newFormValues);

    // setFormValues((prev) => ({
    //   ...prev,
    //   [e.target.name]: e.target.value,
    //   newFormValues
    // }));
  };
  const handleClick = () => {
    setShowErrors(true);
    if (
      !Validation.maxOf(name, 30) ||
      !Validation.description(relationship) ||
      !Validation.numericPhone(phone)
    ) {
      return;
    } else {
      setShowErrors(false);

      API.apiPost("userFamilyEmergencyUpdate", { payload: encodeData({ emergency_contact: formValues }) })
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

  const removeFormFields = (i) => {
    formValues?.splice(i, 1);
    console.log('Values', formValues)
    setFormValues([...formValues]);
  }

  return (
    <>
      <p className={`${styles.info} fw-bold p-2`}>Emergency Contact</p>
      {formValues && formValues?.map((item, index) => (
        < Row className="mt-3" key={index}>
          <div>
            <div
              className="float-end user-select-none"
              onClick={() => removeFormFields(index, item)}
            >
              <Image src="/images/cancel.svg" alt="add" width={25} />
            </div>
            {item.save && (
              <div
                className="float-end user-select-none me-2"
                onClick={() => editdata(index)}
              >
                <Image src="/images/edit.png" alt="add" width={20} />
              </div>
            )}
          </div>

          <Form.Group className="col-md-4" controlId="formGridEmail">
            <Form.Label className="fw-bold">Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              value={item?.name}
              disabled={item?.save ? true : false}
              name="name"
              onChange={(e) => handleChange(index, e)}
              isInvalid={
                showErrors && !Validation.maxOf(name, 30)
              }
            />
          </Form.Group>
          <Form.Group className="col-md-4" controlId="formGridPassword">
            <Form.Label className="fw-bold">Relationship Status</Form.Label>
            <Form.Select
              name="relationship"
              value={item?.relationship}
              disabled={item?.save ? true : false}
              onChange={(e) => handleChange(index, e)}
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
            <Form.Label className="fw-bold">Phone Number</Form.Label>
            <Form.Control
              type="tel"
              onChange={(e) => handleChange(index, e)}
              value={item?.phone ? item?.phone : phone?.replace(/\D+/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')}
              disabled={item?.save ? true : false}
              placeholder="Enter your Phone Number"
              name="phone"
              maxLength={10}
              isInvalid={
                showErrors && !Validation.numericPhone(phone)
              }
            />
          </Form.Group>
        </Row>
      ))
      }
      <div className="mt-2 mb-2" onClick={addFormFields} >
        <Image src="/images/add.png" alt="add" />
        <a className="mt-5 ms-2 ">Add</a>
      </div>

      <Button
        variant="primary"
        type="submit"
        className="mt-3 mb-3 btn bg-btn-green"
        onClick={handleClick}
      >
        Save
      </Button>
    </>
  );
}
