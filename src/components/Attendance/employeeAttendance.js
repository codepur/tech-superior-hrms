import React from "react";
import { useEffect, useRef, useState } from "react";
import { Image, InputGroup, Modal, Table } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import styles from "../../styles/attendance.module.scss";
import { Center, SegmentedControl, Box } from "@mantine/core";
import { IconClock, IconX, IconCheck } from "@tabler/icons";
import { useDispatch, useSelector } from "react-redux";
import { attendanceList } from "../../stores/actions/attendance";
import API from "../../helpers/api";
import { encodeData } from "../../helpers/auth";
import { handleErrorMessage } from "../../utils/commonFunctions";
// import moment from "moment/moment";
import moment from "moment/moment";
import { toast } from "react-hot-toast";
const EmployeeAttendanceComp = () => {
    const [stuList] = useSelector((Gstate) => [
        Gstate.attendanceList?.attendanceList,
    ]);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(attendanceList());
    }, [stuList?.length]);

    const handleActiveTab = (e) => {
        setSegment(e.target.value);
    };


    const handleFilter = (e) => {
        let searchvalue = e?.target?.value;
        let arr = dsrList?.filter(
            (item) =>
                (searchvalue
                    ? item.user_id?.first_name
                        ?.toLowerCase()
                        .includes(searchvalue.toLowerCase())
                    : true) ||
                (searchvalue
                    ? item.user_id?.last_name
                        ?.toLowerCase()
                        .includes(searchvalue.toLowerCase())
                    : true) ||
                (searchvalue
                    ? item.project_id?.toLowerCase().includes(searchvalue.toLowerCase())
                    : true)
        );
        setChooseDsrList(arr);
    };

    const onSearchHandler = (event) => {
        setSearchKey(event?.target?.value);
    };
 
    
    const onPunch=()=>{
        const inTime=new Date().toISOString();
        console.log(inTime);
        const time = {inTime : inTime}
        API.apiPost("createAttendance", { payload: encodeData(time) })
        .then((response) => {
          if (response.data && response.data.success === true) {
            console.log(response);
            toast.success(response.data.message)
            dispatch(attendanceList());
          }
        })
        .catch((err) => {
          handleErrorMessage(err);
        });
    }


    return (
        <>
            <div className="container textFont">
                <div className={`row d-flex mt-4 ${styles.ContainerDiv}`}>
                    <div className={`d-flex justify-content-between ${styles.createTicket}`}>
                        <h2 className="col-md-4">Attendance</h2>
                    </div>
                    {/* <hr className={`${styles.hr}`}></hr> */}

                    <div className="row mt-3">
                        <div className="col-md-4 col-xl-4">
                            <div className={`${styles.cardContainer} card order-card shadow border-1`}>
                                <div className="card-header text-dark">
                                    <h5 className="d-inline">Time sheet &nbsp;  </h5>
                                    <span className=" text-muted">{moment().format('dddd d MMM YYYY')}</span>
                                </div>
                                <div className="card-body">
                                    <div className="card border-1">
                                        <div className="card-body">
                                            <div className="card-title text-dark">
                                                Punch In at
                                            </div>
                                            <div className="card-text text-muted">
                                                {moment().format('ddd, do MMM YYYY, h:mm:ss a ')}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`d-flex align-item-center justify-content-center rounded-circle`}>
                                        <div className={`${styles.round} rounded-circle text-center`}>
                                            3.5 hrs
                                        </div>
                                    </div>
                                    <div className="d-flex align-item-center justify-content-center my-3">
                                        <button className={`${styles.button}`} role="button" onClick={onPunch}>Punch Out</button>
                                    </div>
                                    <div className="row" >
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
                        <div className="col-md-4 col-xl-4">
                            <div className={`${styles.cardContainer} card order-card shadow border-1 text-dark`}>
                                <div className={`${styles.cardBody}`}>
                                    <h5 className={`${styles.cardTittle} mb-4`}>Statics</h5>
                                    <div className={`${styles.statsList}`}>
                                        <div className={`${styles.statsInfo}`}>
                                            <p> Today<strong> 3.45<small>/8hrs</small> </strong> </p>
                                            <div class="progress ">
                                                <div class="progress-bar bg-primary w-25" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" ></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`${styles.statsInfo}`}>
                                        <p >This week<strong> 3.45<small>/8hrs</small></strong></p>
                                        <div class="progress">
                                            <div class="progress-bar bg-warning w-50" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </div>
                                    <div className={`${styles.statsInfo}`}>
                                        <p> this month<strong> 3.45<small>/8hrs</small> </strong> </p>
                                        <div class="progress">
                                            <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" ></div>
                                        </div>
                                    </div>
                                    <div className={`${styles.statsInfo}`}>
                                        <p> Remaining<strong> 3.45<small>/8hrs</small> </strong> </p>
                                        <div class="progress">
                                            <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" ></div>
                                        </div>
                                    </div>
                                    <div className={`${styles.statsInfo}`}>
                                        <p> Overtime<strong> 3.45<small>/8hrs</small> </strong> </p>
                                        <div class="progress">
                                            <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" ></div>
                                        </div>
                                    </div>

                                </div >

                            </div >
                        </div >
                        <div className="col-md-4 col-xl-4">
                            <div className={`${styles.cardContainer} card order-card shadow border-1`}>
                                <div className="card-block text-dark text-center">
                                    <h6 className="m-b-20">Unplanned Leaves</h6>
                                    <h5>0</h5>
                                </div>
                            </div>
                        </div>
                    </div >

                    <div className="col-md-3 d-flex">
                        <InputGroup className="mb-3 d-flex" onChange={onSearchHandler}>
                            <Form.Control
                                placeholder="Search"
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                                onChange={handleFilter}
                            />
                            <InputGroup.Text   id="basic-addon2" className={`${styles.searchIcon}`}>
                                <Image src="/images/searchWhite.png" alt="search" />
                            </InputGroup.Text>
                        </InputGroup>
                    </div>
                    {/* <button className="btn btn-warning col-1 p-0 m-0 ">save</button> */}
                    <div>
                        <Table striped bordered hover size="sm" className="text-center">
                            <thead>
                                <tr className={`${styles.tableHeadRow}`}>
                                    <th className="p-3 col-md-1">Sr. No</th>
                                    <th className="p-3 col-md-3">Date</th>
                                    <th className="p-3 col-md-3">Punch In</th>
                                    <th className="p-3 ">Punch out</th>
                                    <th className="p-3 text-center">Production</th>
                                    <th className="p-3 text-center">Break</th>
                                    <th className="p-3 text-center">Overtime</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stuList?.map((row, i) => (
                                    <tr key={i}>
                                        <td className="p-1">{i + 1}</td>
                                        <td className="p-1 ">{moment(row?.date).format("ll")|| ""}</td>
                                        <td className="p-1">{moment(row?.inTime).format("LTS") || ""}</td>
                                        <td className="p-1">{moment(row?.outTime).format("LTS") || ""}</td>
                                        <td className="p-1">10</td>
                                        <td className="p-1">1</td>
                                        <td className="p-1">0</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div >
            </div >
        </>
    );
}
export default EmployeeAttendanceComp
