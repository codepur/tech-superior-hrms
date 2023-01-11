import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Form, FormCheck, Image, Row } from "react-bootstrap";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import API from "../../../helpers/api";
import { encodeData } from "../../../helpers/auth";
import { setFamilyList } from "../../../stores/actions/mainPage";
import styles from "../../../styles/ProfileManagement.module.scss";
import { handleErrorMessage } from "../../../utils/commonFunctions";
import Validation from "../../../utils/validations";

export default function FamilyMember() {
  const [formValues, setFormValues] = useState([
    { name: "", relationship: "", dob: "", dependant: false, edit: false },
  ]);

  const [showErrors, setShowErrors] = useState(false);
  const dispatch = useDispatch();
  // const { name, relationship, dob, dependant } = formValues;
  const familyList = useSelector((Gstate) => Gstate.user.familyList);

  useEffect(() => {
    dispatch(setFamilyList());
  }, []);

  useEffect(() => {
    if (familyList?.length) {
      let itemData = familyList?.map((item) => {
        item.save = true;
        return item;
      });
      setFormValues(itemData);
    }
  }, [familyList, familyList?.length]);

  const handleChange = (i, e) => {
    setShowErrors(false);
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] =
      e.target.name == "dependant" ? e.target.checked : e.target.value;
    setFormValues(newFormValues);
  };

  const addFormFields = () => {
    let item = [...formValues];
    let obj = {
      name: "",
      relationship: "",
      dob: "",
      dependant: false,
      edit: false,
    };
    item.push(obj);
    setFormValues(item);
  };

  const removeFormFields = (i, item) => {

    API.apiDeletePost("userFamilyListdelete", {payload:encodeData({ id: item._id })})
      .then((response) => {
        
        if (response.data && response.data.success === true) {
          let newFormValues = [...formValues];
          newFormValues.splice(i, 1);
          setFormValues(newFormValues);

          toast.success(response.data.message, {
            position: "top-right",
            style: {
              padding: "16px",
              color: "#3c5f4b",
              marginRight: "25px",
            },
          });
          dispatch(setFamilyList());
          setRender(!render);
        }
      })
      .catch((err) => {
        handleErrorMessage(err);
      });
  };

  const handleClick = () => {
    setShowErrors(true);
    let isValidForm = true;
    formValues?.forEach((form) => {
      for (const property in form) {
        switch (property) {
          case "name":
            if (!Validation.maxOf(form?.name, 30)) {
              isValidForm = false;
              return;
            }
            break;
          case "relationship":
            if (!Validation.description(form?.relationship)) {
              isValidForm = false;
              return;
            }
            break;
          case "dob":
            if (!Validation.date(form?.dob)) {
              isValidForm = false;
              return;
            }
            break;

          default:
            break;
        }
      }
    });

    if (isValidForm == false) {
      return;
    } else {
      setShowErrors(false);
  
      API.apiPost("userFamilyEmergencyUpdate", {payload:encodeData({ family_member: formValues })})
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
            dispatch(setFamilyList());
          }
        })
        .catch((err) => {
          handleErrorMessage(err);
        });
    }
  };

  const editdata = (i) => {
    let arrdata = [...formValues];
    arrdata[i]["save"] = false;
    setFormValues(arrdata);
  };
  return (
    <>
      <p className={`${styles.info} fw-bold p-2`}>Family Member</p>
      {formValues?.map((item, index) => (
        <Row className="mt-3 p-2" key={index}>
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
            <h4 className=" mb-3 ms-4">{item.course_type}</h4>
          </div>

          <Form.Group className="col-md-3" controlId="formGridEmail">
            <Form.Label className="fw-bold">Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              disabled={item.save == true ? true : false}
              value={item.name}
              name="name"
              onChange={(e) => handleChange(index, e)}
              isInvalid={showErrors && !Validation.maxOf(item.name, 30)}
            />
          </Form.Group>
          <Form.Group className="col-md-3" controlId="formGridPassword">
            <Form.Label className="fw-bold">Relationship Status</Form.Label>
            <Form.Select
              name="relationship"
              value={item.relationship}
              disabled={item.save == true}
              onChange={(e) => handleChange(index, e)}
              isInvalid={
                showErrors && !Validation.description(item.relationship)
              }
            >
              <option hidden>Select Type</option>
              <option value="Brother">Brother</option>
              <option value="Mother">Mother</option>
              <option value="Father">Father</option>
              <option value="Husband">Husband</option>
              <option value="Wife">Wife</option>
              <option value="Son">Son</option>
              <option value="Daughter">Daughter</option>
              <option value="Sister">Sister</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="col-md-3" controlId="formGridAddress1">
            <Form.Label className="fw-bold">Date of Birth</Form.Label>
            <Form.Control
              type="date"
              onChange={(e) => handleChange(index, e)}
              value={item.dob}
              disabled={item.save == true}
              placeholder="Enter your Date of Birth"
              name="dob"
              isInvalid={showErrors && !Validation.date(item.dob)}
            />
          </Form.Group>
          <Form.Group className="col-md-3" controlId="formGridAddress1">
            <Form.Label className="fw-bold">Dependant</Form.Label>
            {/* <Form.Control
              type="text"
              onChange={(e) => handleChange(index, e)}
              value={item.dependant}
              placeholder="Enter Dependent"
              name="dependant"
              isInvalid={showErrors && !item.depandent}
            /> */}
            <FormCheck
              type="checkbox"
              name="dependant"
              disabled={item.save == true}
              value={item.dependant}
              checked={item.dependant}
              label="Enter Dependent"
              onChange={(e) => handleChange(index, e)}
            />
          </Form.Group>
          {/* <a  onClick={removeFormFields} className="col-md-1">
        <Image src="/images/cross.png" width={20}/>
        </a> */}
        </Row>
      ))}
      <div onClick={addFormFields} className="mt-2 mb-2">
        <Image src="/images/add.png" alt="add" />
        <a className="mt-5 ms-2 ">Add</a>
      </div>

      <Button
        variant="primary"
        type="submit"
        className="mt-3 mb-3 bg-btn-green"
        onClick={handleClick}
      >
        Save
      </Button>
    </>
  );
}
