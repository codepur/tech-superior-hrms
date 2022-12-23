import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";
import { useEffect, useState } from "react";
import { Image, InputGroup, Modal, Table } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
// import { useDispatch, useSelector } from "react-redux";
import { Button, FormGroup, Input, Label } from "reactstrap";
import API from "../../helpers/api";
import { setUserlist } from "../../stores/actions/mainPage";
import styles from "../../styles/ticket.module.scss";
import { handleErrorMessage } from "../../utils/commonFunctions";
import HiringModal from "./hiringModal";


const initialPaginationState = {
  skip: 0,
};

function HiringPortal() {
    const [openModal, setOpenModal] = useState(false);
    const [pagination, setPagination] = useState(initialPaginationState);
    const { skip = [] } = pagination;
    const [userList] = useSelector((Gstate) => [Gstate.user?.userList]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const handleClose = ({ type, data }) => {
        setLoading(true);
        if (type === 'add') {
          addParticipantsData(data);
          return;
        }
        setOpenModal(false);
      };

  const addStudent = () => {
    setOpenModal(true);
  };

  useEffect(() => {
    dispatch(setUserlist());
  },[]);

  return (
    <>
      <Modal
        className="custom-modal"
        show={openModal}
        onHide={() => setOpenModal(false)}
        backdrop="static"
        keyboard={false}
        centered
      >
        <HiringModal handleClose={handleClose} />
      </Modal>
      <div className={` ${styles.OuterTicketDiv}`}>
        <div className={`row d-flex mt-4 ${styles.ContainerDiv}`}>
          <div
            className={`d-flex justify-content-between ${styles.createTicket}`}
          >
            <h2 className="col-md-4">Invite Candidates</h2>
            <button
              className={`col-md-1 btn ${styles.addTicket}`}
              onClick={addStudent}
            >
              Add Candidate
            </button>
          </div>
          <hr className={`${styles.hr}`}></hr>
          <div>
            <Table striped bordered hover size="sm">
              <thead>
                <tr className={`${styles.tableHeadRow}`}>
                  <th className="p-3">S. No.</th>
                  <th className="p-3">First Name</th>
                  <th className="p-3">Last Name</th>
                  <th className="p-3">Email ID</th>
                  <th className="p-3">Link Status</th>
                </tr>
              </thead>
              <tbody>
                 {userList.filter((item)=>item.user_type == "Guest")?.map((row, i) => (
                    <tr key={i}>
                      <td className="px-3">{skip + i + 1}</td>
                      <td className="px-3">{row?.first_name || ''}</td>
                      <td className="px-3">{row?.last_name || ''}</td>
                      <td className="px-3">{row.email || ''}</td>
                      <td className="px-3"><center>
                      <button className="btn btn-warning">
                      Resend Mail
                      </button>
                    </center></td>
                    </tr>
                  ))}
                </tbody>
            </Table>
          </div>
        </div>
      </div>
      <div className={` ${styles.OuterTicketDiv}`}>
        <div className={`row d-flex mt-4 ${styles.ContainerDiv}`}>
          <div
            className={`d-flex justify-content-between ${styles.createTicket}`}
          >
            <h2 className="col-md-4">Hiring List</h2>
           
          </div>
          <hr className={`${styles.hr}`}></hr>
          <div>
            <Table striped bordered hover size="sm">
              <thead>
                <tr className={`${styles.tableHeadRow}`}>
                  <th className="p-3">S. No.</th>
                  <th className="p-3">Student Name</th>
                  <th className="p-3">Mobile Number</th>
                  <th className="p-3">Source Platform</th>
                  <th className="p-3">Exam Status</th>
                  <th className="p-3">Interview Status</th>
                  <th className="p-3">Link Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3"></td>
                  <td className="p-3"></td>
                  <td className="p-3"></td>
                  <td className="p-3"></td>
                  <td className="p-3"></td>
                  <td className="p-3"></td>
                  <td className="p-3">
                    <center>
                      <button className="btn btn-warning">
                        Reactivate Link
                      </button>
                    </center>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}

export default HiringPortal;
