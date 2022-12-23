import { Modal, Form } from "react-bootstrap";
import toast from "react-hot-toast";
import API from "../../helpers/api";
import { encodeData } from "../../helpers/auth";
import styles from "../../styles/ticket.module.scss";
import { handleErrorMessage } from "../../utils/commonFunctions";
import { useDispatch, useSelector } from "react-redux";
import { setAdminDsrList } from "../../stores/actions/dsr";


const RequestModal = (props) => {
  const { index,handleClose,change } = props;
  const dispatch = useDispatch();
  let indexData = index;

  const handleSubmit=(e,data)=>{
    e.preventDefault();
    API.apiPost("dsrReject_Approvel", {payload:encodeData({_id:indexData._id,status : data})})
    .then((response) => {
      if (response.data && response.data.success === true) {
        handleClose(false);
        dispatch(setAdminDsrList(change));
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
  }

  return (
    <>
      <Modal.Header closeButton className="modal-header pb-0">
        <Modal.Title className={`title fw-bold ${styles.ticketHeader}`}>
         DSR View
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <div className="container">
            <div className={`row mb-3`}>
              <table className="table">
                <tr className={`${styles.ticketRows}`}>
                  <td className={`${styles.ticketHeadings}`}>
                    <b>DSR Code :</b>
                  </td>
                  <td>{indexData._id}</td>
                </tr>
                <tr className={`${styles.ticketRows}`}>
                  <td className={`${styles.ticketHeadings}`}>
                    <b>Employee Name :</b>
                  </td>
                  <td>{indexData?.user_id?.first_name +" "+ indexData?.user_id?.last_name}</td>
                </tr>
                <tr className={`${styles.ticketRows}`}>
                  <td className={`${styles.ticketHeadings}`}>
                    <b>DSR Description :</b>
                  </td>
                  <td className={styles.discriptionData} dangerouslySetInnerHTML={{ __html:indexData?.description }}></td>
                </tr>
                <tr className={`${styles.ticketRows}`}>
                  <td className={`${styles.ticketHeadings}`}>
                    <b>Department Name:</b>
                  </td>
                  <td>{indexData.department_id.name}</td>
                </tr>
              </table>
              <div className="d-flex justify-content-evenly">
                <button className={`btn btn-success `} onClick={(e)=>handleSubmit(e,"Approved")}>Approve</button>
                <button className={`btn btn-danger`}  onClick={(e)=>handleSubmit(e,"Rejected")}>Reject</button>
              </div>
            </div>
          </div>
        </Form>
      </Modal.Body>
    </>
  );
};

export default RequestModal;
