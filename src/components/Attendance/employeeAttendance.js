/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect, useRef, useState } from "react";
import { Image, InputGroup, Modal, Table } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import styles from "../../styles/attendance.module.scss";
import { Center, SegmentedControl, Box } from "@mantine/core";
import { IconClock, IconX, IconCheck } from "@tabler/icons";
import Calendar from "react-calendar";
import { useDispatch, useSelector } from "react-redux";
import { attendanceList } from "../../stores/actions/attendance";

const EmployeeAttendanceComp = () => {

  const [stuList] = useSelector((Gstate) => [Gstate.attendanceList?.attendanceList]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(attendanceList());
  }, []);

  const handleActiveTab = (e) => {
    setSegment(e.target.value);
  };

  const onSearchHandler = (event) => {
    setSearchKey(event?.target?.value);
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

  //  const currentMonth = 31;
  //  const currMontDay = 17
  let arr = [];
  const week = (curr) => {
    for (let i = curr; i > curr - 7; i--) {
      arr.push(i);
    }
    arr.reverse();
  };
  //  useEffect(()=>{
  //    week();
  //  },[])
  week(18);

  return (
    <>
      <div className={`row d-flex mt-4 ${styles.ContainerDiv}`}>
        <div
          className={`d-flex justify-content-between ${styles.createTicket}`}
        >
          <h2 className="col-md-4"> Attendance </h2>
        </div>
        <hr className={`${styles.hr}`}></hr>

        {/* <div className="col-md-3 d-flex ">
          <InputGroup className="mb-3 d-flex" onChange={onSearchHandler}>
            <Form.Control
              placeholder="Search"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              onChange={handleFilter}
            />
            <InputGroup.Text
              id="basic-addon2"
              className={`${styles.searchIcon}`}
            >
              <Image src="/images/searchWhite.png" alt="search" />
            </InputGroup.Text>
          </InputGroup>
        </div> */}
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
                  <td className="p-1 ">{row?.inTime.split("T")[0] || ""}</td>
                  <td className="p-1">{row?.inTime.split("T")[1].split(".")[0] || ""}</td>
                  <td className="p-1">{row?.outTime.split("T")[1].split(".")[0] || ""}</td>
                  <td className="p-1">10</td>
                  <td className="p-1">1</td>
                  <td className="p-1">0</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};
export default EmployeeAttendanceComp;
