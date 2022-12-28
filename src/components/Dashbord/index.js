/* eslint-disable jsx-a11y/alt-text */
import dynamic from "next/dynamic";
import { Card, Image, Modal } from "react-bootstrap";
import styles from "../../styles/dashboard.module.scss";
import React, { useState } from "react";
import Calendar from "react-calendar";
import { useSelector } from "react-redux";
import { Center, SegmentedControl, Box } from "@mantine/core";
import { IconClock, IconX, IconCheck } from "@tabler/icons";
import TodoContainer from "../TodoContainer";

export default function DashboardComponent() {
  const [Count] = useSelector((Gstate) => [Gstate.user?.CountParticipant]);

  const segmentColor = { Present: "green", Absent: "red", Late: "yellow" }
  const [segmentValue, setSegment] = useState("Present")
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
  const event = [
    { date: "25/12/22", eventName: "Christmas" },
    { date: "29/12/22", eventName: "Guru Gobind Singh Jayanti" },
  ];

  return (
    <>
      <Modal centered show={showModal} onHide={closeModal} >
        <Modal.Header closeButton className={`${styles.modalHeaderBorderNone}`}>
          <Modal.Title className={`${styles.header} ms-auto`}>Hi, Neeraj </Modal.Title>
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
          <button className="btn btn-primary text-center" onClick={closeModal}>Save</button>
        </Modal.Footer>
      </Modal>

      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <div className="row">
              <div className={`${styles.mainCard}  card`}>
                <div className={`${styles.cardText} card-body`}>
                  <div className="row">
                    <div className="col-md-3">
                      <div className={`${styles.empImgCard} `}>
                        <Image src="images/photo_6325701050312536371_x.jpg" alt="Profile pic" className={`${styles.empImg} `} />
                      </div>
                    </div>
                    <div className="col-md-9">
                      <div className={`${styles.empText}`}>
                        <h2>Welcome back , Neeraj</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="row">
                <div className="col-12">
                  <div className="row">
                    <div className="col-md-6 col-xl-6">
                      <div className="card bg-dark order-card shadow border-0">
                        <div className="card-block">
                          <h6 className="m-b-20">Attendance</h6>
                          <h2 className="text-right float-start">
                            <i className="fa fa-cart-plus f-left"></i>
                            <button className="btn btn-danger px-3" onClick={openModal}>Mark</button>
                          </h2>
                          {/* <p className="m-b-0">Completed Orders<span className="f-right">351</span></p> */}
                          <Image
                            src="/images/calendar.png"
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
                          <Image src="/images/leave.png" width={70} className="float-end" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 col-xl-6">
                <div className="card order-card bg-c-pink shadow border-0" >
                  <div className="card-block todoContainer overflow-auto">
                    <h6 className="m-b-20 mt-1"><TodoContainer /></h6>                                      
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 ps-4">
            <div className="row">
              <div className="card bg-c-green order-card shadow border-0 calenderCard">
                <div className="p-2">
                  <h3 className="text-center">Calendar</h3>
                  <div className="calendar-container">
                    <Calendar
                      // onChange={setDate}
                      selectRange={true}
                      defaultValue={new Date()}
                    />
                  </div>
                  <div className="row p-3">
                    <Card style={{ width: '25rem' }} bg="dark" className="mb-0">
                      <Card.Body className="text-white">
                        <Card.Title>Birthday this month 🎂</Card.Title>
                        <div className="row">
                          <div className="col-md-2">
                            <img src="/images/profileIcon.png" width="30" />
                          </div>
                          <div className="col-md-4">Ashutosh</div>
                          <div className="col-md-2">SE</div>
                          <div className="col-md-3">28aug</div>
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                  <div className="row p-3">
                    <Card style={{ width: '25rem' }} bg="dark" className="mb-0">
                      <Card.Body className="text-white">
                        <Card.Title>Event this month</Card.Title>
                        {event?.map((item) => (
                          <>
                            <div>
                              <span>{item.eventName}</span>
                              <span className="float-end">{item.date}</span>
                            </div>
                          </>
                        ))}
                      </Card.Body>
                    </Card>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="container">

      </div>
    </>
  );
}
