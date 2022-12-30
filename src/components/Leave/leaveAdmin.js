import React, { useState } from "react";
import { Icon123, IconCircleDot } from "@tabler/icons";
import { Table } from "reactstrap";
import { Dropdown } from 'react-bootstrap';
import { Card, Image, Modal, Form, Button } from "react-bootstrap";
import styles from "../../styles/leave.module.scss"

const AdminLeaveComponent = () => {

    const [leaveModal, setLeaveModal] = useState(false);
    const closeLeaveModal = () => {
        setLeaveModal(false);
    };
    const openLeaveModal = () => {
        setLeaveModal(true);
    };
    const paginatedData = [{
        empName: 'neeraj',
        leaveType: "Hospitalisation",
        from: "15 jan 2019",
        to: "15 jan 2019",
        noofdays: "10 days",
        reason: "fever",
        status: "approved",
        approvedBy: "sakshi sarma"
    },
    {   
        empName : 'ashutosh',
        leaveType: "Maternity Leave",
        from: "15 jan 2019",
        to: "15 jan 2019",
        noofdays: "10 days",
        reason: "1Personnal",
        status: "approved",
        approvedBy: "sakshi sarma"
    },
    {
        leaveType: "Casual Leave",
        from: "15 jan 2019",
        to: "15 jan 2019",
        noofdays: "10 days",
        reason: "Personnal",
        status: "approved",
        approvedBy: "sakshi sarma"
    },
    {
        leaveType: "Hospitalisation",
        from: "15 jan 2019",
        to: "15 jan 2019",
        noofdays: "10 days",
        reason: "Going to hospiTAL",
        status: "approved",
        approvedBy: "sakshi sarma"
    },
    ]
    return (
        <>
            <Modal
                centered
                show={leaveModal}
                onHide={closeLeaveModal}
                className={`p-2`}
            >
                <div className={` fw-bold fs-5 d-flex justify-content-center align-self-center mt-4 fs-3`}>Add Leave</div>
                <Form className="p-4">
                    {/* <fieldset disabled> */}
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="leaveSelect" className="fw-bold">Leave Type</Form.Label>
                        <Form.Select id="leaveSelect">
                            <option type="hidden">Select Leave Type</option>
                            <option>Casual Leave</option>
                            <option>Medical Leave</option>
                            <option>Unpaid Leave</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="leaveFrom" className="fw-bold">From</Form.Label>
                        <Form.Control id="leaveFrom" type="date" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="leaveTo" className="fw-bold">To</Form.Label>
                        <Form.Control id="leaveTo" type="date" />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label className="fw-bold">Subject</Form.Label>
                        <Form.Control id="subject" type="text" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label className="fw-bold">Attachment</Form.Label>
                        <Form.Control as="textarea" rows={3} />
                    </Form.Group>
                    <Button type="submit" className={`${styles.leaveSubmit}`}>Submit</Button>
                    {/* </fieldset> */}
                </Form>
            </Modal>
            <div className="container textFont">
                <div className="row mt-5">
                    <div className="col-md-6 ">
                        <h2>Leaves</h2>
                    </div>
                    <div className="col-md-6">
                        <button className={`${styles.leaveSubmit} btn btn-primary mx-1 primary-button-bg float-end`} onClick={openLeaveModal} >
                            Add leave
                        </button>
                    </div>
                </div>
                <div className="row my-3">
                    <div className="col-md-3 col-xl-3">
                        <div className={`${styles.cardContainer} card order-card shadow border-1`}>
                            <div className="card-block text-dark text-center">
                                <h6 className="m-b-20">Today Presents</h6>
                                <h3>12 / 60</h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-xl-3">
                        <div className={`${styles.cardContainer} card order-card shadow border-1`}>
                            <div className="card-block text-dark text-center">
                                <h6 className="m-b-20">Planned Leaves</h6>
                                <h3>1</h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-xl-3">
                        <div className={`${styles.cardContainer} card order-card shadow border-1`}>
                            <div className="card-block text-dark text-center">
                                <h6 className="m-b-20">Unplanned Leaves</h6>
                                <h3>0</h3>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-xl-3">
                        <div className={`${styles.cardContainer} card order-card shadow border-1`}>
                            <div className="card-block text-dark text-center">
                                <h6 className="m-b-20">Pending Requests</h6>
                                <h3>16</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${styles.tableResponsive}`}>
                    <Table className={`${styles.table}`}>
                        <thead className={`${styles.tableHead}`}>
                            <tr className={`${styles.tableHead}`}>
                                <th>
                                    <span className="ms-1">Sr No</span>
                                </th>
                                <th>
                                    <span className="alignTableHeading" onClick={() => handleSort('name')}>
                                        <span className="ms-1 fs-6">Employee</span>
                                        <span className="ms-1">
                                            <Image src={'/images/sort.png'} className=" cursor-pointer sortImg" alt="" />
                                        </span>
                                    </span>
                                </th>
                                <th>
                                    <span className="alignTableHeading" onClick={() => handleSort('name')}>
                                        <span className="ms-1 fs-6">Leave Type</span>
                                        <span className="ms-1">
                                            <Image src={'/images/sort.png'} className=" cursor-pointer sortImg" alt="" />
                                        </span>
                                    </span>
                                </th>
                                <th>
                                    <span className="alignTableHeading" onClick={() => handleSort('from')}>
                                        <span className="ms-1">From</span>
                                        <span className="ms-1">
                                            <Image src={'/images/sort.png'} className="cursor-pointer sortImg" alt="" />
                                        </span>
                                    </span>
                                </th>
                                <th>
                                    <span className="alignTableHeading" onClick={() => handleSort("to")}>
                                        <span className="ms-1">To</span>
                                        <span className="ms-1">
                                            <Image src={'/images/sort.png'} className="cursor-pointer sortImg" alt="" />
                                        </span>
                                    </span>
                                </th>
                                <th>
                                    <span className="alignTableHeading" onClick={() => handleSort('version')}>
                                        <span className="ms-1">No Of Days</span>
                                        <span className="ms-1">
                                            <Image src={'/images/sort.png'} className="cursor-pointer sortImg" alt="" />
                                        </span>
                                    </span>
                                </th>
                                <th>
                                    <span className="alignTableHeading" onClick={() => handleSort('reason')}>
                                        <span className="ms-1">Reason</span>
                                        <span className="ms-1">
                                            <Image src={'/images/sort.png'} className="cursor-pointer sortImg" alt="" />
                                        </span>
                                    </span>
                                </th>
                                <th>
                                    <span className="alignTableHeading" onClick={() => handleSort('status')}>
                                        <span className="ms-1">Status</span>
                                        <span className="ms-1">
                                            <Image src={'/images/sort.png'} className="cursor-pointer sortImg" alt="" />
                                        </span>
                                    </span>
                                </th>
                                <th>
                                    <span className="alignTableHeading" onClick={() => handleSort('approvedBy')}>
                                        <span className="ms-1">Approved By</span>
                                        <span className="ms-1">
                                            <Image src={'/images/sort.png'} className="cursor-pointer sortImg" alt="" />
                                        </span>
                                    </span>
                                </th>
                                <th>
                                    <span className="alignTableHeading" onClick={() => handleSort('')}>
                                        <span className="ms-1">Action</span>
                                    </span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.map((entry, i) => (
                                <tr key={i} className="border">
                                    <td>{i + 1}</td>
                                    <td>{entry?.empName}</td>
                                    <td>{entry?.leaveType}</td>
                                    <td>{entry?.from}</td>
                                    <td>{entry?.to}</td>
                                    <td>{entry?.noofdays}</td>
                                    <td>{entry?.reason}</td>
                                    <td>
                                    <div>
                                            <Dropdown>
                                                <Dropdown.Toggle
                                                    id="dropdown-basic"
                                                    data-toggle="tooltip"
                                                    title="View Actions"
                                                    className={`bg-white border-1 border-secondary rounded-pill text-dark p-1 `}
                                                ><span><IconCircleDot color="green"/> Approved</span>
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item >
                                                        <span><IconCircleDot color="green"/> Approved</span>
                                                    </Dropdown.Item>
                                                    <Dropdown.Item >
                                                        <span><IconCircleDot color="orange"/> Pending</span>
                                                    </Dropdown.Item>
                                                    <Dropdown.Item >
                                                        <span><IconCircleDot color="red"/> Declined</span>
                                                    </Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </td>
                                    <td>{entry?.approvedBy}</td>
                                    <td>
                                        <div>
                                            <Dropdown>
                                                <Dropdown.Toggle
                                                    id="dropdown-basic"
                                                    data-toggle="tooltip"
                                                    title="View Actions"
                                                    className={`bg-white border-0 p-0 `}
                                                >
                                                    <Image src={'/images/more.png'} className="cursor-pointer mb-1 " alt="" />
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu>
                                                    <Dropdown.Item >
                                                        <span>Edit</span>
                                                    </Dropdown.Item>
                                                    <Dropdown.Item >
                                                        <span>Delete</span>
                                                    </Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </>
    );

}
export default AdminLeaveComponent