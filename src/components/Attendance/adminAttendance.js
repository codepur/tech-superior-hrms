/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect, useRef, useState } from "react";
import { Button, Container, FloatingLabel, Form, Image, Input, InputGroup, Modal, Table } from "react-bootstrap";
import styles from "../../styles/attendance.module.scss"
import { Center, SegmentedControl, Box } from "@mantine/core";
import { IconClock, IconX, IconCheck, IconQuestionCircle, IconQuestionMark } from "@tabler/icons";
import { useDispatch, useSelector } from "react-redux";
import { attendanceList, allUserList } from "../../stores/actions/attendance";
import moment from "moment/moment";
import LiveTime from "../common/liveTime";
import { toast, Toaster } from "react-hot-toast";
import API from "../../helpers/api";
import { encodeData } from "../../helpers/auth";
const AdminAttendanceComp = () => {

  const [empAttendList, allUserAttendList] = useSelector((Gstate) => [Gstate.attendanceList?.attendanceList,
  Gstate.attendanceList?.allUserList]);
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(attendanceList());
    dispatch(allUserList());
  }, []); 

  const segmentColor = { Present: "green", Absent: "red", Late: "yellow" }
  const [segmentValue, setSegment] = useState()
  const handleActiveTab = (e) => {
    setSegment(e.target.value);
  };

  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const currentDate = (new Date().toLocaleDateString('en-US', { day: 'numeric', })) - 1;
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
  };
  const openModal = () => {
    setShowModal(true);
  };
  const handleStatus = () => {

    closeModal();
  }
  const set = new Set();
  allUserAttendList.map((val) => {
    set.add(val.user_id._id);
  })
  set = [...set];
  let allUserGrid = Array.from(Array(set.length), () => new Array(daysInMonth + 1).fill(null));
  allUserAttendList.forEach((val) => {
    allUserGrid[set.indexOf(val.user_id._id)][0] = val.user_id.first_name + " " + val.user_id.last_name;
    allUserGrid[set.indexOf(val.user_id._id)][(moment(val.date).format("D"))] = val;
  })

  

  //Select column by use of checkbox
     let attenListdayFormat = Array.from(Array(daysInMonth), () => new Array());
     allUserAttendList.map((value,index)=>{
       attenListdayFormat[(moment(value.date).format("D"))].push(value)
     })
   
  const [selectedColumn, setSelectedColumn] = useState([]);
  const handleCheckboxChange = (event, day) => {
     (event.target.checked) ? setSelectedColumn([...selectedColumn,...attenListdayFormat[day+1]]) : 
      setSelectedColumn(selectedColumn.filter((rem) => ((moment(rem.date).format("D")) != (day+1))));  // please dont add =
  };

  const markAllAttendance = () => {
    let data = [];
    selectedColumn.forEach((val)=> data.push({ "id" : val.user_id._id,"status" : "Approved","date" : val.date,})) 
    if(!data.length) {  toast.error("Please Select A Row"); return }
    API.apiPost("bulkApproval", { payload: encodeData(data) })
      .then((response) => {
        if (response.data && response.data.success === true) {
          toast.success(response.data.message, { position: "top-right" });
          dispatch(allUserList());
        }
      })
      .catch((err) => {
        handleErrorMessage(err);
      });
  }


  return (
    <>
      <Toaster />
      <Modal centered size="lg" show={showModal} onHide={closeModal} className="textFont">
        <Modal.Header closeButton className={`border-0`}>
          <h5 className="text-muted ms-auto">Attendance Info</h5>
        </Modal.Header>
        <Modal.Body className="mx-1 px-5 py-0">
          <div className="row">
            <div className="col-md-6">
              <div className={`${styles.cardContainer} card order-card shadow border-1`}>
                <div className="card-header text-dark">
                  <h6 className="d-inline">Time sheet &nbsp; </h6>
                  <span className=" text-muted">{moment(new Date()).format("LLL")}</span>
                </div>
                <div className="card-body">
                  <div className="card border-1 p-2 mb-2">
                    <div className="card-title text-dark">
                      Punch In at
                    </div>
                    <div className="card-text text-muted">
                      {empAttendList[empAttendList.length - 1]?.inTime ? moment(empAttendList[empAttendList.length - 1].inTime).format('ddd, do MMM YYYY, h:mm:ss a ') : "-------"}
                    </div>
                  </div>
                  <div className={`d-flex align-item-center justify-content-center rounded-circle`}>
                    <div className={`${styles.round} rounded-circle text-center`}>
                      <LiveTime />
                    </div>
                  </div>
                  <div className="card border-1 p-2 my-2">
                    <div className="card-title text-dark">
                      Punch In at
                    </div>
                    <div className="card-text text-muted">
                      {empAttendList[empAttendList.length - 1]?.inTime ? moment(empAttendList[empAttendList.length - 1].inTime).format('ddd, do MMM YYYY, h:mm:ss a ') : "-------"}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6 text-center">
                      <div className={`${styles.stats} text-dark`}>
                        <h6>Break</h6>
                        <p>1 hrs</p>
                      </div>
                    </div>
                    <div className="col-6 text-center">
                      <div className={`${styles.stats} text-dark`}>
                        <h6>Overtime</h6>
                        <p>2 hrs</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className={`${styles.cardContainer} card order-card shadow border-1`}>
                <div className="card-block text-dark ">
                  <h5 className="m-b-20 text-center">Approve attendance </h5>
                  <div className="my-3 py-1 d-flex flex-wrap align-item-center justify-content-center">
                    <div className="mb-3">
                      <Image className="img-fluid w-100 my-2" src="/images/Calendar_object.svg" alt="logo" />
                    </div>
                    <div className="col-md-12 mb-2">
                      <h6 className="ms-3">👋 Hi ,  I am {name}Neeraj </h6>
                      <p className="ms-3">Please approve my attendance </p>
                    </div>
                    <SegmentedControl className={`${styles.segment}`}
                      color={segmentColor[segmentValue]}
                      onClick={handleActiveTab}
                      data={[
                        {
                          value: "Present",
                          label: (
                            <Center>
                              <IconCheck size={16} />
                              <Box ml={5}>Present</Box>
                            </Center>
                          ),
                        },
                        {
                          value: "Absent",
                          label: (
                            <Center>
                              <IconX size={16} />
                              <Box ml={5}>Absent</Box>
                            </Center>
                          ),
                        },
                        {
                          value: "Late",
                          label: (
                            <Center>
                              <IconClock size={16} />
                              <Box ml={5}>Late</Box>
                            </Center>
                          ),
                        },]} />
                    <div className="my-5">
                      <button disabled={false} className={`btn btn-primary rounded-3 border-2`} role="button">Save</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <div className="conatiner-fluid">
        <div className={`row d-flex mt-1 ${styles.ContainerDiv}`}>
          <h2 className="col-md-4 mb-5">Attendance</h2>
          <div className="col-md-12 d-flex justify-content-between pe-4 my-2">
            <div className={`${styles.inputGroup}`}>
              <input type="text" name="text" className="input" placeholder="Search here!" />
            </div>
            <div>
              <Form.Select aria-label="Floating label select example">
                <option>{`${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`}</option>
              </Form.Select>
            </div>
            <Button className="border rounded-3 mx-3 px-3" onClick={markAllAttendance}>Save All</Button>
          </div>
          <div className="row">
            <div className="col-md-12 col-lg-12">
              <div className={`${styles.tableResponsive}`}>
                <Table className={`${styles.customtable} table-hover table-striped table-nowrap rounded-pill mb-0 `}>
                  <thead className={`${styles.tableHead}`}>
                    <tr className={`${styles.tableHead}`}>
                      <th itemScope='col' className="p-2 ">Sr. No</th>
                      <th itemScope='col' className="p-2 ">Employee Name</th>
                      {Array(daysInMonth).fill(0).map((val, day) => (
                        <th itemScope='col' key={day} className={`${currentDate === day ? 'table-active bg-danger text-white rounded-1' : ''} `}>
                          {day + 1}
                          <input className="form-check-input m-1" type="checkbox"  
                            onChange={event => handleCheckboxChange(event, day)} 
                          />
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {allUserGrid?.map((row, i) => (
                      <tr key={i} >
                        <td className="p-1 text-center">{i + 1}</td>
                        {
                          row.map((val, index) => (
                            val == null ? <td key={index} className="p-1 text-center">-</td> :
                              index == 0 ? <td className="p-1 " key={index}>{val}</td> : <td className="p-1 text-center" key={index}>{
                                val.status == "Approved" ? <IconCheck onClick={openModal} size={18} color="green" strokeWidth="2.5" /> :
                                  <IconQuestionMark onClick={openModal} size={18} strokeWidth="2.5" color="orange" />
                              }</td>
                          ))
                        }
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default AdminAttendanceComp