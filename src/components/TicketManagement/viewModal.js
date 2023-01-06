import { Modal, Form } from "react-bootstrap";
import styles from "../../styles/ticket.module.scss";
import { Dropdown } from "react-bootstrap";
import { Icon123, IconCircleDot } from "@tabler/icons";

const TicketModal = (props) => {
  const { index } = props;
  let indexData = index;

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
                    <td>{indexData.priority ? indexData.priority : "-"}</td>
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
                        <Dropdown>
                          <Dropdown.Toggle
                            id="dropdown-basic"
                            data-toggle="tooltip"
                            title="View Actions"
                            className={`bg-white border-1 border-secondary rounded-pill text-dark p-1 textFont`}
                          >
                            <span>
                              <IconCircleDot color="green" /> Active
                            </span>
                          </Dropdown.Toggle>
                          <Dropdown.Menu className="textFont">
                            <Dropdown.Item>
                              <span>
                                <IconCircleDot color="green" />Completed 
                              </span>
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <span>
                                <IconCircleDot color="orange" />Inactive 
                              </span>
                            </Dropdown.Item>
                            <Dropdown.Item>
                              <span>
                                <IconCircleDot color="red" />  Incompleted
                              </span>
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
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
         <button className="btn btn-success" >Save</button>
      </Modal.Footer>
    </>
  );
};

export default TicketModal;
