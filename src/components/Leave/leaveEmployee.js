/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { Icon123 } from "@tabler/icons";
import { Table } from "reactstrap";
import { Dropdown } from 'react-bootstrap';
import { Card, Image, Modal, Form, Button } from "react-bootstrap";
import styles from "../../styles/leave.module.scss"
import PaginationComponent from "../common/PaginationComponent";
import { useEffect } from "react";

const EmployeeLeaveComponent = () => {

    const initialPaginationState = {
        activePage: 1,
        skip: 0,
        limitPerPage: 4,
        paginatedData: [],
        userData: [],
        list: [],
    };

    const [pagination, setPagination] = useState(initialPaginationState);
    const { activePage, skip, limitPerPage, userData, list } = pagination;
    const [formaData, setFormData] = useState({
        leaveType: "",
        fromData: "",
        toData: ""
    })
    const [leaveModal, setLeaveModal] = useState(false);
    const closeLeaveModal = () => {
        setLeaveModal(false);
    };
    const openLeaveModal = () => {
        setLeaveModal(true);
    };

    const handleChange = (e) => {
        setFormData({ ...data, [e.target.name]: e.target.value });
    };

    const paginatedData = [{
        leaveType: "Hospitalisation",
        from: "15 jan 2019",
        to: "15 jan 2019",
        noofdays: "10 days",
        reason: "fever",
        status: "approved",
        approvedBy: "sakshi sarma"
    },
    {
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
    {
        leaveType: "Hospitalisation",
        from: "15 jan 2019",
        to: "15 jan 2019",
        noofdays: "10 days",
        reason: "Going to hospiTAL",
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

    const onPageChange = (page) => {
        var skipRecords = (page - 1) * limitPerPage;
        const to = limitPerPage * page;
        setPagination((prev) => ({
            ...prev,
            activePage: page,
            skip: JSON.parse(skipRecords),
            paginatedData: list.slice(skipRecords, to),
            userData: list.slice(skipRecords, to),
        }));
    };

    useEffect(() => {
        setPagination((prev) => ({ ...prev, list: paginatedData }));
    }, [paginatedData?.length, userData?.length]);

    useEffect(() => {
        onPageChange(activePage);
    }, [list, activePage]);

    return (
        <>
            <Modal
                centered
                show={leaveModal}
                onHide={closeLeaveModal}
                className={`p-2`}
            >
                <Modal.Header closeButton className={`${styles.modalHeaderBorderNone}`}>
                    <Modal.Title className={` fw-bold mt-4 fs-3 `}>
                        <div className="d-flex justify-content-center align-self-center">
                            {/* <div className={` fw-bold fs-5 d-flex justify-content-center align-self-center mt-4 fs-3`}> */}
                            Add Leave
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="">
                        {/* <fieldset disabled> */}
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="leaveSelect" className="fw-bold" >
                                Leave Type
                            </Form.Label>
                            <Form.Select id="leaveSelect" name="leaveType" onChange={handleChange}>
                                <option type="hidden">Select Leave Type</option>
                                <option value="Casual Leave">Casual Leave</option>
                                <option value="Medical Leave">Medical Leave</option>
                                <option value="Unpaid Leave">Unpaid Leave</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="leaveFrom" className="fw-bold col-6">
                                From
                            </Form.Label>
                            <Form.Control id="leaveFrom" type="date" name="fromDate" onChange={handleChange} />
                            <Form.Label htmlFor="leaveTo" className="fw-bold col-6">
                                To
                            </Form.Label>
                            <Form.Control id="leaveTo" type="date" name="toDate" onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="leaveTo" className="fw-bold">
                                To
                            </Form.Label>
                            <Form.Control id="leaveTo" type="date" name="toDate" onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="fw-bold">Subject</Form.Label>
                            <Form.Control id="subject" type="text" name="subject" onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label className="fw-bold" >Attachment</Form.Label>
                            <Form.Control as="textarea" rows={3} name="attachment" onChange={handleChange} />
                        </Form.Group>
                        <Button type="submit" className={`${styles.leaveSubmit}`}  >
                            Submit
                        </Button>
                        {/* </fieldset> */}
                    </Form>
                </Modal.Body>
            </Modal>
            <div className="container textFont">
                <div className="row mt-3">
                    <div className="col-md-6 ">
                        <h2>Leaves</h2>
                    </div>
                    <div className="col-md-6">
                        <button className={`${styles.leaveSubmit} btn btn-primary mx-1 float-end textFont`} onClick={openLeaveModal} >
                            Add leave
                        </button>
                    </div>
                </div>
                <div className="row my-3">
                    <div className="col-md-3 col-xl-3">
                        <div className="card order-card shadow border-1">
                            <div className="card-block text-dark text-center">
                                <h6 className="m-b-20">Annual Leave</h6>
                                <h4>12</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-xl-3">
                        <div className="card order-card shadow border-1">
                            <div className="card-block text-dark text-center">
                                <h6 className="m-b-20">Medical Leave</h6>
                                <h4>1</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-xl-3">
                        <div className="card order-card shadow border-1">
                            <div className="card-block text-dark text-center">
                                <h6 className="m-b-20">Other Leave</h6>
                                <h4>5</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-xl-3">
                        <div className="card order-card shadow border-1">
                            <div className="card-block text-dark text-center">
                                <h6 className="m-b-20">Remaining Leave</h6>
                                <h4>6</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${styles.tableResponsive} col-lg-12`}>
                    <Table className={`${styles.table} table table-hover`}>
                        <thead className={`${styles.tableHead} `}>
                            <tr className={`${styles.tableHead}`}>
                                <th itemScope='col'>

                                    #
                                </th>
                                <th itemScope='col'>
                                    <span className="alignTableHeading" onClick={() => handleSort('name')}>
                                        <span className="">Leave Type</span>
                                        <span className="ms-1">
                                            <Image src={'/images/sort.png'} className=" cursor-pointer sortImg" alt="" />
                                        </span>
                                    </span>
                                </th>
                                <th itemScope='col'>
                                    <span className="alignTableHeading" onClick={() => handleSort('from')}>
                                        <span className="">From</span>
                                        <span className="ms-1">
                                            <Image src={'/images/sort.png'} className="cursor-pointer sortImg" alt="" />
                                        </span>
                                    </span>
                                </th>
                                <th itemScope='col'>
                                    <span className="alignTableHeading" onClick={() => handleSort("to")}>
                                        <span className="">To</span>
                                        <span className="ms-1">
                                            <Image src={'/images/sort.png'} className="cursor-pointer sortImg" alt="" />
                                        </span>
                                    </span>
                                </th>
                                <th itemScope='col'>
                                    <span className="alignTableHeading" onClick={() => handleSort('version')}>
                                        <span className="">No Of Days</span>
                                        <span className="ms-1">
                                            <Image src={'/images/sort.png'} className="cursor-pointer sortImg" alt="" />
                                        </span>
                                    </span>
                                </th>
                                <th itemScope='col'>
                                    <span className="alignTableHeading" onClick={() => handleSort('reason')}>
                                        <span className="">Reason</span>
                                        <span className="ms-1">
                                            <Image src={'/images/sort.png'} className="cursor-pointer sortImg" alt="" />
                                        </span>
                                    </span>
                                </th>
                                <th itemScope='col'>
                                    <span className="alignTableHeading" onClick={() => handleSort('status')}>
                                        <span className="">Status</span>
                                        <span className="ms-1">
                                            <Image src={'/images/sort.png'} className="cursor-pointer sortImg" alt="" />
                                        </span>
                                    </span>
                                </th>
                                <th itemScope='col'>
                                    <span className="alignTableHeading" onClick={() => handleSort('approvedBy')}>
                                        <span className="">Approved By</span>
                                        <span className="ms-1">
                                            <Image src={'/images/sort.png'} className="cursor-pointer sortImg" alt="" />
                                        </span>
                                    </span>
                                </th>
                                <th itemScope='col'>
                                    <span className="alignTableHeading" onClick={() => handleSort('')}>
                                        <span className="">Action</span>
                                    </span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {userData.map((entry, i) => (
                                <tr key={i} className="border" itemScope='row'>
                                    <td>{skip + i + 1}</td>
                                    <td>{entry?.leaveType}</td>
                                    <td>{entry?.from}</td>
                                    <td>{entry?.to}</td>
                                    <td>{entry?.noofdays}</td>
                                    <td>{entry?.reason}</td>
                                    <td>{entry?.status}</td>
                                    <td>{entry?.approvedBy}</td>
                                    <td>
                                        <div>
                                            <Dropdown className="text-center">
                                                <Dropdown.Toggle
                                                    id="dropdown-basic"
                                                    data-toggle="tooltip"
                                                    title="View Actions"
                                                    className={`bg-white border-0 p-0`}
                                                >
                                                    <Image src={'/images/three-dot-icon.svg'} alt="" className="cursor-pointer mb-1 sortImg" />
                                                    {/* <Image src={'/images/more.png'} className="cursor-pointer mb-1 sortImg " alt="" /> */}
                                                </Dropdown.Toggle>

                                                <Dropdown.Menu className="textFont">
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
            <div className={`d-flex justify-content-${list?.length ? 'end' : 'center'}`}>
                <PaginationComponent
                    currentPage={activePage}
                    list={list}
                    skip={skip}
                    limitPerPage={limitPerPage}
                    //   loading={loading}
                    onPageChange={onPageChange}
                />
            </div>
        </>
    );

}
export default EmployeeLeaveComponent