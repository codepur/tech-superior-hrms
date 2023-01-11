import React, { useState } from "react";
import { Icon123 } from "@tabler/icons";
import { Table } from "reactstrap";
import { Dropdown } from "react-bootstrap";
import { Card, Image, Modal, Form, Button } from "react-bootstrap";
import styles from "../../styles/leave.module.scss";
import { setUserlist } from "../../stores/actions/mainPage";
import { useSelector,useDispatch } from "react-redux";
import { useEffect } from "react";

const PayrollComponent = () => {
  const dispatch = useDispatch();
  const [userList] = useSelector((Gstate) => [Gstate.user?.userList]);
  const [salaryModal, setSalaryModal] = useState(false);
  const closeSalaryModal = () => {
    setSalaryModal(false);
  };
  const openSalaryModal = () => {
    setSalaryModal(true);
  };
  useEffect(() => {
    dispatch(setUserlist());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <>
      <Modal
        centered
        show={salaryModal}
        onHide={closeSalaryModal}
        className={`p-2`}
      >
        <div
          className={` fw-bold fs-5 d-flex justify-content-center align-self-center mt-4 fs-3`}
        >
          Add Salary
        </div>
        <Form className="p-4">
          {/* <fieldset disabled> */}
          <div className="row">
          <Form.Group className="col-md-6 mb-3">
            <Form.Label htmlFor="leaveSelect" className="fw-bold">
             Employee name
            </Form.Label>
            <Form.Select id="leaveSelect">
              <option type="hidden">Select Employee</option>
              <option>Casual Leave</option>
              <option>Medical Leave</option>
              <option>Unpaid Leave</option>
            </Form.Select>
          </Form.Group>
         
          <Form.Group className="col-md-6 mb-3 ">
            <Form.Label htmlFor="leaveFrom" className="fw-bold">
              Net Salary
            </Form.Label>
            <Form.Control id="leaveFrom" type="number" />
          </Form.Group>
          </div>
          <div className="row">
          <Form.Group className=" col-md-6 mb-3">
            <Form.Label htmlFor="leaveTo" className="fw-bold">
              To
            </Form.Label>
            <Form.Control id="leaveTo" type="date" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Subject</Form.Label>
            <Form.Control id="subject" type="text" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label className="fw-bold">Attachment</Form.Label>
            <Form.Control as="textarea" rows={3} />
          </Form.Group>
          </div>
          <Button type="submit" className={`${styles.leaveSubmit}`}>
            Submit
          </Button>
          {/* </fieldset> */}
        </Form>
      </Modal>
      <div className="container">
        <div className="row mt-2">
          <div className="col-md-6 ">
            <h2>Payroll</h2>
          </div>
          <div className="col-md-6">
            <button
              className={`${styles.leaveSubmit} btn btn-primary mx-1 float-end textFont`}
              onClick={openSalaryModal}
            >
              Add Salary
            </button>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-md-3 col-xl-3">
            <div
              className={`${styles.cardContainer} card order-card shadow border-1`}
            >
              <div className="card-block text-dark text-center">
                <h6 className="m-b-20">Employee name</h6>
                <h5></h5>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-xl-3">
            <div
              className={`${styles.cardContainer} card order-card shadow border-1`}
            >
              <div className="card-block text-dark text-center">
                <h6 className="m-b-20">Paid</h6>
                <h5></h5>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-xl-3">
            <div
              className={`${styles.cardContainer} card order-card shadow border-1`}
            >
              <div className="card-block text-dark text-center">
                <h6 className="m-b-20">From</h6>
                <h5></h5>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-xl-3">
            <div
              className={`${styles.cardContainer} card order-card shadow border-1`}
            >
              <div className="card-block text-dark text-center">
                <h6 className="m-b-20">To</h6>
                <h5></h5>
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.tableResponsive} col-lg-12 textFont`}>
          <Table className={`${styles.table} table table-hover`}>
            <thead className={`${styles.tableHead} `}>
              <tr className={`${styles.tableHead}`}>
                <th itemScope="col">
                  <span className="">Sr No</span>
                </th>
                <th itemScope="col">
                  <span
                    className="alignTableHeading "
                    onClick={() => handleSort("name")}
                  >
                    <span className="">Employee Name</span>
                    <span className="">
                      <Image
                        src={"/images/sort.png"}
                        className=" cursor-pointer sortImg"
                        alt=""
                      />
                    </span>
                  </span>
                </th>
                <th itemScope="col">
                  <span
                    className="alignTableHeading"
                    onClick={() => handleSort("name")}
                  >
                    <span className="">Employee ID</span>
                    <span className="">
                      <Image
                        src={"/images/sort.png"}
                        className=" cursor-pointer sortImg"
                        alt=""
                      />
                    </span>
                  </span>
                </th>
                <th itemScope="col">
                  <span
                    className="alignTableHeading"
                    onClick={() => handleSort("from")}
                  >
                    <span className="">Email</span>
                    <span className="">
                      <Image
                        src={"/images/sort.png"}
                        className="cursor-pointer sortImg"
                        alt=""
                      />
                    </span>
                  </span>
                </th>
                <th itemScope="col">
                  <span
                    className="alignTableHeading"
                    onClick={() => handleSort("to")}
                  >
                    <span className="">Role</span>
                    <span className="">
                      <Image
                        src={"/images/sort.png"}
                        className="cursor-pointer sortImg"
                        alt=""
                      />
                    </span>
                  </span>
                </th>
                <th itemScope="col">
                  <span>
                    <span
                      className="alignTableHeading"
                      onClick={() => handleSort("version")}
                    >
                      <span className="">Salary</span>
                      <span className="">
                        <Image
                          src={"/images/sort.png"}
                          className="cursor-pointer sortImg"
                          alt=""
                        />
                      </span>
                    </span>
                  </span>
                </th>
                <th itemScope="col">
                  <span
                    className="alignTableHeading"
                    onClick={() => handleSort("reason")}
                  >
                    <span className="">Payslip</span>
                    <span className="">
                      <Image
                        src={"/images/sort.png"}
                        className="cursor-pointer sortImg"
                        alt=""
                      />
                    </span>
                  </span>
                </th>
                <th itemScope="col">
                  <span
                    className="alignTableHeading"
                    onClick={() => handleSort("status")}
                  >
                    <span className=""></span>
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {userList.map((item, i) => (
                <tr key={i} className="border" itemScope="row">
                  <td>{ i + 1}</td>
                  <td> {item?.first_name} {item?.last_name}</td>
                  <td>{item?.employee_ID ? item?.employee_ID : "--"}</td>
                  <td>{item?.email}</td>
                  <td>{item?.designation ? item?.designation : "Software Engineer"}</td>
                  <td></td>
                  <td><Image src={"/images/download.png"}></Image></td>
                  <td>
                    <div>
                      <Dropdown>
                        <Dropdown.Toggle
                          id="dropdown-basic"
                          data-toggle="tooltip"
                          title="View Actions"
                          className={`bg-white border-0 p-0 `}
                        >
                          <Image
                            src={"/images/three-dot-icon.svg"}
                            alt=""
                            className="cursor-pointer mb-1 sortImg"
                          />
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="textFont">
                          <Dropdown.Item>
                            <span>Edit</span>
                          </Dropdown.Item>
                          <Dropdown.Item>
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
};
export default PayrollComponent;
