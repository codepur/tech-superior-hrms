import { Modal, Form } from "react-bootstrap";
import styles from "../../styles/ticket.module.scss";
import { useState } from "react";

const TicketModal = (props) => {
  const initial = {
    status: props.index.status,
    priority: props.index.priority,
  }
  const { index } = props;
  const indexData = index;
  const [data, setData] = useState(initial);
  const { status, priority } = props.index;
  const handleChange = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  };

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
                    {/* <td>{indexData.priority ? indexData.priority : "-"}</td> */}
                    <td>
                      <Form.Select

                        aria-label="Default select example"
                        onChange={handleChange} name="priority"
                        value={data.priority}
                      >
                        <option >Select Priority</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </Form.Select>
                    </td>
                  </tr>
                  <tr className={`${styles.ticketRows}`}>
                    <td className={`${styles.ticketHeadings}`}>
                      <b>Assign To:</b>
                    </td>
                    <td>{indexData.assignee ? indexData.assignee : "-"}</td>
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
                          onChange={handleChange} name="status"
                          value={data.status}
                        >
                          <option >Select Status</option>
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                          <option value="Completed">Completed </option>
                          <option value="Incompleted">Incompleted</option>
                        </Form.Select>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer closeButton className="modal-header pb-0">
        <button className="btn btn-success">Save</button>
      </Modal.Footer>
    </>
  );
};

export default TicketModal;
