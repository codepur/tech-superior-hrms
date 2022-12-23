import { useState } from "react";
import { Button, Modal, Form, InputGroup } from "react-bootstrap";
import API from "../../helpers/api";
import toast, { Toaster } from "react-hot-toast";
import { handleErrorMessage } from "../../utils/commonFunctions";
import { Label } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setdepartmentList } from "../../stores/actions/ticketManagement";
import { encodeData } from "../../helpers/auth";

const initial = {
  email: "",
  first_name: "",
  last_name: "",
  department: "",
};

const HiringModal = (props) => {
  const { handleClose } = props;
  const [inviteData, setInviteData] = useState(initial);
  const [departmentList] = useSelector((Gstate) => [
    Gstate.ticketManagement?.departmentList,
  ]);
  const [showErrors, setShowErrors] = useState(false);
  const dispatch = useDispatch();
  const { email, first_name, last_name, department } = inviteData;

  const onChangeHandler = (e) => {
    setInviteData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    dispatch(setdepartmentList());
  },[]);

  const submitData = () => {
    let payload = {
      email: inviteData.email,
      first_name: inviteData.first_name,
      last_name: inviteData.last_name,
      department: inviteData.department,
      user_type: "Guest",
    };
    API.apiPost("candidateInvite",  {payload:encodeData(payload)})
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
          setInviteData(initial);
        }
      })
      .catch((err) => {
        handleErrorMessage(err);
      });
  };

  return (
    <>
      <Toaster />
      <Modal.Header closeButton className="modal-header pb-0">
        <Modal.Title className="title fw-bold">Invite Candidates</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <div className="container">
            {/* <div className="title fw-bold">Enter Email</div>     */}
            <div className="row mb-3">
              <Form.Group className="col" controlId="formBasicEmail">
                <Form.Label>
                  <b>Email id</b>
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    name="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={onChangeHandler}
                    required
                  />
                </InputGroup>
              </Form.Group>
            </div>
            <div className="row mt-3">
              <Form.Group className="col-md-6" controlId="formBasicEmail">
                <Form.Label>
                  <b>First Name</b>
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    name="first_name"
                    placeholder="First Name"
                    value={first_name}
                    onChange={onChangeHandler}
                    required
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group className="col-md-6" controlId="formBasicEmail">
                <Form.Label>
                  <b>Last Name</b>
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    value={last_name}
                    onChange={onChangeHandler}
                    required
                  />
                </InputGroup>
              </Form.Group>
            </div>
            <div className="row mt-3">
              <Form.Group className="col">
                <Form.Label>
                  <b>Department</b>
                </Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  value={department}
                  name="department"
                  onChange={onChangeHandler}
                >
                  <option hidden>Department</option>
                  {departmentList?.length &&
                    departmentList?.map((item) => (
                      <option key={item?._id} value={item?._id}>
                        {item?.name || ""}
                      </option>
                    ))}
                </Form.Select>
              </Form.Group>
            </div>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          className="btn"
          size="md"
          onClick={handleClose}
        >
          Cancel
        </Button>

        <Button
          variant="primary"
          className="btn btn-success"
          size="md"
          onClick={submitData}
        >
          Save
        </Button>
      </Modal.Footer>
    </>
  );
};

export default HiringModal;
