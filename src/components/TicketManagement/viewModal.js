import { Modal, Form } from "react-bootstrap";
import styles from "../../styles/ticket.module.scss";

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
                    <td>{indexData.ticket_code}</td>
                  </tr>
                  <tr className={`${styles.ticketRows}`}>
                    <td className={`${styles.ticketHeadings}`}>
                      <b>Ticket Subject :</b>
                    </td>
                    <td>{indexData.subject}</td>
                  </tr>
                  <tr className={`${styles.ticketRows}`}>
                    <td className={`${styles.ticketHeadings}`}>
                      <b>Employee Name :</b>
                    </td>
                    <td>{indexData?.user_id?.first_name + " " + indexData?.user_id?.last_name}</td>
                  </tr>
                  <tr className={`${styles.ticketRows}`}>
                    <td className={`${styles.ticketHeadings}`}>
                      <b>Ticket Description :</b>
                    </td>
                    <td className={styles.discriptionData} dangerouslySetInnerHTML={{ __html: indexData?.description }}></td>
                  </tr>
                  <tr className={`${styles.ticketRows}`}>
                    <td className={`${styles.ticketHeadings}`}>
                      <b>Ticket Priority :</b>
                    </td>
                    <td>{indexData.priority}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Form>
      </Modal.Body>
    </>
  );
};

export default TicketModal;
