import React from "react";
import { useEffect, useRef, useState } from "react";
import {
    Image,
    InputGroup,
    Modal,
    Table,
    Card,
    ListGroup,
    ListGroupItem,
} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import styles from "../../styles/attendance.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { attendanceList } from "../../stores/actions/attendance";
import API from "../../helpers/api";
import { encodeData } from "../../helpers/auth";
import { handleErrorMessage } from "../../utils/commonFunctions";
import moment from "moment/moment";
import { toast, Toaster } from "react-hot-toast";
import LiveTime from "../common/liveTime";
import { set } from "lodash";

const EmployeeAttendanceComp = () => {
    const [empAttendList] = useSelector((Gstate) => [
        Gstate.attendanceList?.attendanceList,
    ]);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(attendanceList());
    }, [empAttendList.length]);

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

    const [punch, setPunch] = useState(true);
    const [punchbtn, setPunchbtn] = useState(false);
    
    useEffect(() => {
        const currDate = new Date(); 
        if(moment(empAttendList[empAttendList.length-1]?.date).format('ll')  !== moment(currDate).format('ll'))
        {    
            setPunch(true);
            // setPunchbtn(!punchbtn); 
        }
        else{
            if (empAttendList[0]?.inTime ) {
                setPunch(false);
            }
            if (empAttendList[0]?.outTime && empAttendList[0]?.InTime) {
                setPunch(!punch);
                setPunchbtn(!punchbtn);
            }
        }
    }, [empAttendList.length]);

    const onPunchIn = () => {
        const inTime = new Date().toISOString();
        const time = { inTime: inTime }
        API.apiPost("punchIn", { payload: encodeData(time) })
            .then((response) => {
                if (response.data && response.data.success === true) {
                    setPunch(!punch);
                    toast.success(response.data.message)
                    // dispatch(attendanceList());
                }
            })
            .catch((err) => {
                handleErrorMessage(err);
            });
    }

    const onPunchOut = () => {
        const outTime = new Date().toISOString();
        const time = { outTime: outTime }
        API.apiPost("punchOut", { payload: encodeData(time) })
            .then((response) => {
                if (response.data && response.data.success === true) {
                    setPunchbtn(!punch);
                    toast.success(response.data.message)
                    // dispatch(attendanceList());
                }
            })
            .catch((err) => {
                handleErrorMessage(err);
            });
    }
<<<<<<< HEAD
=======
 
>>>>>>> 7c82e1c8dece7febeb5eac16e7cf069088121902
 
    
    return (
        <>
            <div className="container textFont">
                <Toaster />
                <div className={`row d-flex  ${styles.ContainerDiv}`}>
                    <div className={`d-flex justify-content-between ${styles.createTicket}`}>
                        <h2 className="col-md-4">Attendance</h2>
                    </div>

                    <div className="row mt-2">
                        <div className="col-md-4 col-xl-4">
                            <div className={`${styles.cardContainer} card order-card shadow border-1`}>
                                <div className="card-header text-dark">
                                    <h5 className="d-inline">Time sheet &nbsp;  </h5>
                                    <span className=" text-muted">{moment().format('ddd d MMM YYYY')}</span>
                                </div>
                                <div className="card-body">
                                    <div className="card border-1">
                                        <div className="card-body">
                                            <div className="card-title text-dark">
                                                Punch In at
                                            </div>
                                            <div className="card-text text-muted">
                                                {empAttendList[empAttendList.length-1]?.inTime ? moment(empAttendList[empAttendList.length-1].inTime).format('ddd, do MMM YYYY, h:mm:ss a ') : "-------"}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`d-flex align-item-center justify-content-center rounded-circle`}>
                                        <div className={`${styles.round} rounded-circle text-center`}>
                                            <LiveTime />
                                            {/* {elapsedTime} */}
                                        </div>
                                    </div>
                                    <div className="d-flex align-item-center justify-content-center my-3">
                                        <button className={`${punch ? "btn-success" : "btn-danger"} btn rounded-5`} role="button"
                                            disabled={punchbtn} onClick={punch ? onPunchIn : onPunchOut}>Punch {punch ? "In" : "Out"}</button>
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
                                            <div className="progress ">
                                                <div className="progress-bar bg-primary w-25" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" ></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={`${styles.statsInfo}`}>
                                        <p >This week<strong> 3.45<small>/8hrs</small></strong></p>
                                        <div className="progress">
                                            <div className="progress-bar bg-warning w-50" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </div>
                                    <div className={`${styles.statsInfo}`}>
                                        <p> this month<strong> 3.45<small>/8hrs</small> </strong> </p>
                                        <div className="progress">
                                            <div className="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" ></div>
                                        </div>
                                    </div>
                                    <div className={`${styles.statsInfo}`}>
                                        <p> Remaining<strong> 3.45<small>/8hrs</small> </strong> </p>
                                        <div className="progress">
                                            <div className="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" ></div>
                                        </div>
                                    </div>
                                    <div className={`${styles.statsInfo}`}>
                                        <p> Overtime<strong> 3.45<small>/8hrs</small> </strong> </p>
                                        <div className="progress">
                                            <div className="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" ></div>
                                        </div>
                                    </div>

                                </div >

                            </div >
                        </div >
                        <div className="col-md-4 col-xl-4">
                            <div className={`${styles.cardContainer} card order-card shadow border-1`}>
                                <div className="card-block text-dark text-center">
                                    <h6 className="m-b-20">Attendance Graph</h6>
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
                            <InputGroup.Text id="basic-addon2" className={`${styles.searchIcon}`}>
                                <Image src="/images/searchWhite.png" alt="search" />
                            </InputGroup.Text>
                        </InputGroup>
                    </div>
                    <div className="row">
                        <div className="col-md-12 col-lg-12">
                        <div className={`${styles.tableResponsive}`}>
                        <Table className={`${styles.customtable} table-hover table-striped table-nowrap rounded-pill mb-0 `}>
                            <thead className={`${styles.tableHead}`}>
                                <tr className={`${styles.tableHead}`}>
                                    <th className="p-3 col-md-1">Sr. No</th>
                                    <th className="p-3 ">Date</th>
                                    <th className="p-3 ">Punch In</th>
                                    <th className="p-3 ">Punch out</th>
                                    <th className="p-3 text-center">Production</th> 
                                    <th className="p-3 text-center">Break</th>
                                    <th className="p-3 text-center">Overtime</th>
                                </tr>
                            </thead>
                            <tbody>
                                {empAttendList?.map((row, i) => (
                                    <tr key={i}>
                                        <td className="p-1 text-center">{i + 1}</td>
                                        <td className="p-1 ">{moment(row?.date).format("ll") || ""}</td>
                                        <td className="p-1 ">{row?.inTime ? moment(row?.inTime).format("LTS") : "-----"}</td>
                                        <td className="p-1 ">{row?.outTime ? moment(row?.outTime).format("LTS") : "-----"}</td>
                                        <td className="p-1 text-center">{row?.duration ? row.duration + " hrs" : "------"}</td>
                                        <td className="p-1 text-center">1</td>
                                        <td className="p-1 text-center">0</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                        </div>
                    </div>
                   
                </div >
            </div >
        </>
    );
}
export default EmployeeAttendanceComp
