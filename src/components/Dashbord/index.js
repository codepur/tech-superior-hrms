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
        <div className="row d-flex justify-content-evenly">
          <div className="col-6">
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
                    <Image src="/images/leave.png" width={70} className="float-end" />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 col-xl-6">
                <div className="card order-card shadow border-0" style={{ backgroundColor: "#BCAAA4" }}>
                  <div className="card-block">
                    <h6 className="m-b-20 mt-1">Attendance</h6>
                    <h2 className="text-right float-start mt-3">
                      <i className="fa fa-cart-plus f-left"></i>
                      <button className="btn btn-dark px-3" onClick={openModal}>Mark</button>
                    </h2>
                    {/* <p className="m-b-0">Completed Orders<span className="f-right">351</span></p> */}
                    <Image
                      src="/images/calendarClock.png"
                      className="float-end"
                      width={60}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 col-xl-6">
                <div className="card order-card bg-c-yellow shadow border-0" >
                  <div className="card-block todoContainer overflow-auto">
                    <h6 className="m-b-20 mt-1"><TodoContainer /></h6>                                      
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-xl-6">
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
                <p className="text-center fs-5">
                  <span className="bold text-dark">Today Date: </span>{" "}
                  {new Date().toDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="row d-flex justify-content-evenly">
          <div className="col-6">
            <TodoContainer />
          </div>
        </div> */}
      </div>
    </>
  );
}
