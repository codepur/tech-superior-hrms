import { Modal, Form } from "react-bootstrap";
import styles from "../../styles/ticket.module.scss";
import { Dropdown } from "react-bootstrap";
import { Icon123, IconCircleDot } from "@tabler/icons";
import e from "cors";
import { useState } from "react";
import API from "../../helpers/api";
import { encodeData } from "../../helpers/auth";

const TicketModal = (props) => {
  const initial = {
    status: props.index.status,
     
  };
  const { index,userData,userList } = props;
  const indexData = index;
  const [data, setData] = useState(initial);
  const { status } = props.index;
  const handleChange = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit=()=>{
    indexData._id = props?.userData?._id;
    API.apiPost("ticketUpdate", { payload: encodeData(data) })
      .then((response) => {
        if (response.data && response.data.success === true) {
          setData(initial);
          dispatch(setTicketList());
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
      props.handleClose();
  }
  return (
    <>
      <Modal.Header closeButton className="modal-header pb-0">
        <Modal.Title className={`title fw-bold ${styles.ticketHeader}`}>
          Ticket View
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <div className="container">
            <div className={`row mb-3`}>
              <table className="table">
                <tbody>
                  <tr className={`${styles.ticketRows}`}>
                    <td className={`${styles.ticketHeadings}`}>
                      <b>Ticket Code :</b>
                    </td>
                    <td>
                      {indexData.ticket_code ? indexData.ticket_code : "-"}
                    </td>
                  </tr>

                  <tr className={`${styles.ticketRows}`}>
                    <td className={`${styles.ticketHeadings}`}>
                      <b>Ticket Subject :</b>
                    </td>
                    <td>{indexData.subject ? indexData.subject : "-"}</td>
                  </tr>
                  <tr className={`${styles.ticketRows}`}>
                    <td className={`${styles.ticketHeadings}`}>
                      <b>Assignee :</b>
                    </td>
                    <td>
                      {indexData?.user_id?.first_name +
                        " " +
                        indexData?.user_id?.last_name}
                    </td>
                  </tr>
                  <tr className={`${styles.ticketRows}`}>
                    <td className={`${styles.ticketHeadings}`}>
                      <b>Ticket Description :</b>
                    </td>
                    <td
                      className={styles.discriptionData}
                      dangerouslySetInnerHTML={{
                        __html: indexData?.description
                          ? indexData?.description
                          : "-",
                      }}
                    ></td>
                  </tr>
                  <tr className={`${styles.ticketRows}`}>
                    <td className={`${styles.ticketHeadings}`}>
                      <b>Ticket Priority :</b>
                    </td>
                    <td>
                      <Form.Select
                        aria-label="Default select example"
                        onChange={handleChange}
                        name="priority"
                        value={indexData.priority}
                        disabled
                      >
                        <option>Select Priority</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </Form.Select>
                    </td>
                  </tr>
                  <tr className={`${styles.ticketRows}`}>
                    <td className={`${styles.ticketHeadings}`}>
                      <b>Department :</b>
                    </td>
                    <td>
                      <Form.Select
                        aria-label="Default select example"
                        onChange={handleChange}
                        name="department"
                        value={indexData.department.name}
                        disabled
                      >
                        <option>Select Department</option>
                        <option value="ADMIN">Admin</option>
                        <option value="HR">HR</option>
                        <option value="ENGINEERING">Engineering</option>
                      </Form.Select>
                    </td>
                  </tr>

                  <tr className={`${styles.ticketRows}`}>
                    <td className={`${styles.ticketHeadings}`}>
                      <b>Category :</b>
                    </td>
                    <td>
                      <Form.Select
                        aria-label="Default select example"
                        name="category"
                        onChange={handleChange}
                        disabled
                      >
                        <option hidden>Category</option>
                        <option value="Stationary">Stationary</option>
                        <option value="Health">Health</option>
                      </Form.Select>
                    </td>
                  </tr>

                   
                  <tr className={`${styles.ticketRows}`}>
                    <td className={`${styles.ticketHeadings}`}>
                      <b>Status:</b>
                    </td>
                    <td>
                      <div>
                        <Form.Select
                          className="col-md-1"
                          aria-label="Default select example"
                          onChange={handleChange}
                          name="status"
                          value={data.status}
                        >
                          <option>Select Status</option>
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                          <option value="Completed">Completed </option>
                          <option value="Incompleted">Incompleted</option>
                        </Form.Select>
                      </div>
                    </td>
                  </tr>
                  <tr className={`${styles.ticketRows}`}>
                    <td className={`${styles.ticketHeadings}`}>
                      <b>Approval :</b>
                    </td>
                    <td>
                      <Form.Select
                        aria-label="Default select example"
                        name="approval"
                        onChange={handleChange}
                        disabled
                      >
                        <option hidden>Approval</option>
                        <option value="Stationary">Accept</option>
                        <option value="Health">Reject</option>
                      </Form.Select>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer closeButton className="modal-header pb-0">
        <button className="btn btn-success" onClick={handleSubmit}>Save</button>
      </Modal.Footer>
    </>
  );
};

export default TicketModal;
