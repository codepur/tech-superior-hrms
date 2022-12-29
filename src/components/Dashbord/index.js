/* eslint-disable jsx-a11y/alt-text */
import dynamic from "next/dynamic";
import { Card, Image, Modal, Form, Button } from "react-bootstrap";
import styles from "../../styles/dashboard.module.scss";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { useSelector } from "react-redux";
import { Center, SegmentedControl, Box, Textarea } from "@mantine/core";
import { IconClock, IconX, IconCheck } from "@tabler/icons";


export default function DashboardComponent() {
  const [Count] = useSelector((Gstate) => [Gstate.user?.CountParticipant]);
  const [formaData,setFormData]=useState({
    leaveType:"",
    fromData:"",
    toData:""
  })
  const segmentColor = { Present: "green", Absent: "red", Late: "yellow" };
  const event = [
    { date: "25/12/22", eventName: "Christmas" },
    { date: "29/12/22", eventName: "Guru Gobind Singh Jayanti" },
  ];
  const [segmentValue, setSegment] = useState("Present");
  const handleActiveTab = (e) => {
    setSegment(e.target.value);
  };

  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
  };
  const openModal = () => {
    setShowModal(true);
  };
  const [eventModal, setEventModal] = useState();
  const closeEventModal = () => {
    setEventModal(false);
  };
  useEffect(() => {
    setEventModal(true);
  }, []);
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
  return (
    <>
      <Modal centered show={showModal} onHide={closeModal}>
        <Modal.Header closeButton className={`${styles.modalHeaderBorderNone}`}>
          <Modal.Title className={`${styles.header} ms-auto`}>
            Hi, Neeraj{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-5 pb-4 pt-2 bodyModal">
          <h5 className="text-center">Please mark your attendance </h5>
          <div className="py-2 d-flex align-item-center justify-content-center">
            <SegmentedControl
              className={`${styles.segment}`}
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
                },
              ]}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary text-center" onClick={closeModal}>
            Save
          </button>
        </Modal.Footer>
      </Modal>

      <Modal centered show={eventModal} onHide={closeEventModal}>
        <Modal.Header closeButton className={`${styles.modalHeaderBorderNone}`}>
          <Modal.Title className={`${styles.header} ms-auto`}>
            Today's Events
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-5 pb-4 pt-2 bodyModal">
          <h2>
            <div className="d-flex-justify-content-center">
              HAPPY Holiday!!!!!!!!
            </div>
          </h2>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-primary text-center"
            onClick={closeEventModal}
          >
            Save
          </button>
        </Modal.Footer>
      </Modal>

      <Modal
        centered
        show={leaveModal}
        onHide={closeLeaveModal}
        className={`p-2`}
      >
        <div
          className={` fw-bold fs-5 d-flex justify-content-center align-self-center mt-4 fs-3`}
        >
          Add Leave
        </div>
        <Form className="p-4">
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
            <Form.Label htmlFor="leaveFrom" className="fw-bold">
              From
            </Form.Label>
            <Form.Control id="leaveFrom" type="date" name="fromDate" onChange={handleChange}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="leaveTo" className="fw-bold">
              To
            </Form.Label>
            <Form.Control id="leaveTo" type="date"  name="toDate" onChange={handleChange}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Subject</Form.Label>
            <Form.Control id="subject" type="text" name="subject" onChange={handleChange}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label className="fw-bold" >Attachment</Form.Label>
            <Form.Control as="textarea" rows={3} name="attachment" onChange={handleChange}/>
          </Form.Group>
          <Button type="submit" className={`${styles.leaveSubmit}`}  >
            Submit
          </Button>
          {/* </fieldset> */}
        </Form>
      </Modal>

      <div className="container">
        <button className="btn btn-danger px-3" onClick={openLeaveModal}>
          Apply Leave+
        </button>
        <div className="row d-flex justify-content-evenly">
          <div className="col-8">
            <div className="row">
              <div className="col-md-6 col-xl-6">
                <div className="card bg-c-blue order-card shadow border-0">
                  <div className="card-block">
                    <h6 className="m-b-20">Total Employees</h6>
                    <h2 className="text-right float-start">
                      <i className="fa fa-cart-plus f-left"></i>
                      <p>{Count}</p>
                    </h2>
                    {/* <p className="m-b-0">Completed Orders<span className="f-right">351</span></p> */}
                    <Image
                      src="/images/profileIcon.png"
                      className="float-end"
                      width={70}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-xl-6">
                <div className="card bg-c-yellow order-card shadow border-0">
                  <div className="card-block ">
                    <h6 className="m-b-20">Number of Leave</h6>
                    <h2 className="text-right float-start">
                      <i className="fa fa-rocket f-left"></i>
                      <span>500</span>
                    </h2>
                    {/* <p className="m-b-0">Completed Orders<span className="f-right">351</span></p> */}
                    <Image
                      src="/images/leave.png"
                      width={70}
                      className="float-end"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 col-xl-6">
                <div className="card bg-dark order-card shadow border-0">
                  <div className="card-block">
                    <h6 className="m-b-20">Attendance</h6>
                    <h2 className="text-right float-start">
                      <i className="fa fa-cart-plus f-left"></i>
                      <button
                        className="btn btn-danger px-3"
                        onClick={openModal}
                      >
                        Mark
                      </button>
                    </h2>
                    {/* <p className="m-b-0">Completed Orders<span className="f-right">351</span></p> */}
                    <Image
                      src="/images/calendar.png"
                      className="float-end"
                      width={60}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card bg-c-green order-card shadow border-0 calenderCard">
              <div className="card-block">
                <h1 className="text-center">Calendar</h1>
                <div className="calendar-container">
                  <Calendar
                    // onChange={setDate}
                    selectRange={true}
                    defaultValue={new Date()}
                  />
                </div>

                <div className="col-md-12">
                  <div className="card bg-dark event-card shadow border-0">
                    <div className="card-block">
                      <Card.Title>Event this month</Card.Title>
                      <i className="fa fa-rocket f-left"></i>
                      {event?.map((item) => (
                        <>
                          <div>
                            <span>{item.eventName}</span>
                            <span className="float-end">{item.date}</span>
                          </div>
                        </>
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-center fs-5">
                  <span className="bold text-dark">Today Date: </span>{" "}
                  {new Date().toDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
