import dynamic from "next/dynamic";
import { Button, Card, Form, FormGroup, Image, Modal } from "react-bootstrap";
import styles from "../../styles/dashboard.module.scss";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { useSelector } from "react-redux";
import { Center, SegmentedControl, Box } from "@mantine/core";
import { IconClock, IconX, IconCheck } from "@tabler/icons";
import TodoContainer from "../TodoContainer";
import CalendarAi from "./calender";
import { Input } from "reactstrap";
import { template } from "lodash";

export default function DashboardComponent() {
  const [Count, userData] = useSelector((Gstate) => [Gstate.user?.CountParticipant, Gstate?.user?.userData]);
  const HOST = 'http://13.232.215.173:9003';
  const imagePath = userData?.Image;
  const altSrc = HOST + imagePath;
  const [todomodal, setTodoModal] = useState(false);
  const full_name = userData?.first_name + " " + userData?.last_name;

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
  const [eventModal, setEventModal] = useState(false);
  const closeEventModal = () => {
    setEventModal(false);
  };
  useEffect(() => {
    setEventModal(true);
  }, []);

  const closeTodoModal = () => {
    setTodoModal(false);
  };
  const openTodoModal = () => {
    setTodoModal(true);
  };
  const [formValues, setFormValues] = useState([
    {
      category: "",
      categoryInputLine1: "",
      categoryInputLine2: "",
      categoryInputLine3: "",
    },
  ]);
  const addFormFields = () => {
    debugger;
    let item = [...formValues];
    let obj = {
      category: "",
      categoryInputLine1: "",
      categoryInputLine2: "",
      categoryInputLine3: "",
    };
    item.push(obj);
    setFormValues(item);
  };
  const handleChange = (i, e) => {
    // setShowErrors(false);
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };
  const removeFormFields = (i, item) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
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
          <h5 className="text-center">Attendance Status</h5>
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
      </Modal>

      {/* <Modal centered show={eventModal} onHide={closeEventModal}>
        <Modal.Header closeButton className={`${styles.modalHeaderBorderNone}`}>
          <Modal.Title className={`${styles.header} ms-auto`}>
            <span>Today&apos;s Events</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-5 pb-4 pt-2 bodyModal">
          <h2>
            <div className="text-center text-danger">HAPPY Holiday!!!!!!!!</div>
          </h2>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn bg-btn-green text-center"
            onClick={closeEventModal}
          >
            Save
          </button>
        </Modal.Footer>
      </Modal> */}

      <Modal centered show={todomodal} onHide={closeTodoModal}>
        <Modal.Header closeButton className={`${styles.modalHeaderBorderNone}`}>
          <Modal.Title className={`${styles.header} ms-auto`}>
            <span>Todo List</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-5 pb-4 pt-2 bodyModal">
          {formValues &&
            formValues.map((item, index) => (
              <>
                <div
                  className="float-end user-select-none"
                  onClick={() => removeFormFields(index, item)}
                >
                  <Image src="/images/cancel.svg" alt="add" width={25} />
                </div>

                <div className="m-3">
                  <Form.Group className="col-md-3" controlId="formGridEmail">
                    <Form.Control
                      type="text"
                      // placeholder="Enter Name"
                      // disabled={item.save == true ? true : false}
                      value={item.category}
                      placeholder="Category"
                      name="category"
                      onChange={(e) => handleChange(index, e)}
                    // isInvalid={showErrors && !Validation.maxOf(item.name, 30)}
                    />
                  </Form.Group>

                  <FormGroup>
                    <Input
                      value={item.categoryInputLine1}
                      type="text"
                      name="categoryInputLine1"
                      // id="first_name"
                      placeholder="Enter your task"
                      onChange={(e) => handleChange(index, e)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Input
                      value={item.categoryInputLine2}
                      type="text"
                      name="categoryInputLine2"
                      // id="first_name"
                      // placeholder="Enter your task"
                      onChange={(e) => handleChange(index, e)}
                    />
                  </FormGroup>

                  <FormGroup>
                    <Input
                      value={item.categoryInputLine3}
                      type="text"
                      name="categoryInputLine3"
                      // id="first_name"
                      // placeholder="Enter your task"
                      onChange={(e) => handleChange(index, e)}
                    />
                  </FormGroup>
                </div>
              </>
            ))}
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn bg-btn-green text-center"
            onClick={addFormFields}
          >
            Add
          </button>
          <button
            className="btn bg-btn-green text-center"
            onClick={closeTodoModal}
          >
            Save
          </button>
        </Modal.Footer>
      </Modal>

      <div className="container">
        <div className="row ">
          <div className="col-md-8">
            <div className="row">
              <div className={`${styles.mainCard}  card bg-c-glassgreen`}>
                <div className={`${styles.cardText} card-body`}>
                  <div className="row">
                    <div className="col-md-3">
                      <div className={`${styles.empImgCard} `}>
                        <Image
                          src={/*imagePath ? altSrc :*/ "images/photo_6325701050312536371_x.jpg"}
                          alt="Profile pic"
                          className={`${styles.empImg} `}
                        />
                      </div>
                    </div>
                    <div className="col-md-9">
                      <div className={`${styles.empText}`}>
                        <h2 className="mt-3">Welcome, {full_name} </h2>
                        <p className="fst-italic mt-3">
                          <q>
                            Lorem Ipsum dolor emette Lorem Ipsum dolor emette
                            Lorem Ipsum dolor emette Lorem Ipsum dolor emette
                          </q>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="row">
                  <div className="col-md-6 col-xl-6">
                    <div className="row">
                      <div className="card bg-c-glassgreen order-card shadow border-0">
                        <div className="card-block py-4 mt-4">
                          <h6 className="m-b-20 pt-2">Attendance</h6>
                          <h2 className="text-right float-start mt-3">
                            <i className="fa fa-cart-plus f-left"></i>
                            <button className="bg-btn-green px-3 btn" onClick={openModal}>Status</button>
                          </h2>
                          {/* <p className="m-b-0">Completed Orders<span className="f-right">351</span></p> */}
                          <Image
                            src="/images/calendar.png"
                            className="float-end"
                            width={70}
                            alt="logo" />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="card bg-c-glassgreen order-card shadow border-0">
                        <div className="card-body px-4 pt-4 pb-3">
                          <div className="time-list d-flex ">
                            <div className="col-md-6 text-center dash-stats-list ">
                              <h4>4.5</h4>
                              <span>Leave taken</span>
                            </div>
                            <div className="col-md-6 text-center border-start dash-stats-list">
                              <h4>12</h4>
                              <span>Remaining</span>
                            </div>
                          </div>
                          <div className="request-btn text-center mt-4 pt-1">
                            <button className="btn bg-btn-green px-3">
                              Apply Leave
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-xl-6">
                    <div className="card order-card bg-c-glassgreen shadow border-0">
                      <div className="card-block todoContainer overflow-auto">
                        <h6 className="m-b-20 mt-1">
                          Todo List
                          {/* <TodoContainer /> */}
                        </h6>
                        <Button onClick={openTodoModal}>Open todo</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* </div> */}
          </div>
          <div className="col-md-4 ps-4">
            <div className="row">
              <div className="card bg-c-glassgreen order-card shadow border-0 calenderCard">
                <div className="p-2 pt-3 mt-1">
                  <div className="calendar-container ">
                    <CalendarAi />
                  </div>
                  <div className="row p-3">
                    <Card
                      style={{ width: "25rem" }}
                      bg="dark"
                      className={`${styles.calenderCard} mb-0`}
                    >
                      <Card.Body className="text-black">
                        <Card.Title>Birthday this month ????</Card.Title>
                        <div className="row ">
                          <div className="col-md-2">
                            <Image src="/images/profileIcon.png" width="30" alt="logo" />
                          </div >
                          <div className="col-md-4">Ashutosh</div>
                          <div className="col-md-2">SE</div>
                          <div className="col-md-3">28aug</div>
                        </div >
                      </Card.Body >
                    </Card >
                  </div >
                  <div className="row p-3">
                    <Card
                      style={{ width: "25rem" }}
                      bg="dark"
                      className={`${styles.calenderCard} mb-0`}
                    >
                      <Card.Body className="text-black">
                        <Card.Title>Event this month</Card.Title>
                        {event?.map((item, index) => (
                          <div key={index}>
                            <span>{item.eventName}</span>
                            <span className="float-end">{item.date}</span>
                          </div>
                        ))}
                      </Card.Body>
                    </Card>
                  </div>
                </div >
              </div >
            </div >
          </div >
        </div >
      </div >
    </>
  );
}
