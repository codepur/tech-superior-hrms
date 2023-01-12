import React, { useEffect, useState } from "react";
import router from "next/router";
import styles from "../../styles/ProfileManagement.module.scss";
import AboutInfo from "./aboutInfo";
import { useDispatch, useSelector } from "react-redux";
import { Image } from "react-bootstrap";

export default function MainPage() {
  // const dispatch = useDispatch();
  const userData = useSelector((Gstate) => Gstate.user.userData);
  const [state, Setstate] = useState("Basic Information");

  const handleClick = (data) => {
    Setstate(data);
  };

  return (
    <>
      <div className={`${styles.widgetcard} mt-3`}>
        <div className={`row bg-white border ${styles.tableRound} `}>
          <div className="col-md-2 col-10 offset-1 offset-md-0">
            <div
              className={`rounded-circle  ms-5  mt-3 ${styles.circleimg} border`}
            >
              <Image
                src="/images/men.png"
                alt="userProfile"
                className={`${styles.userProfile} img-fluid`}
              />
            </div>
          </div>
          <div
            className={`col-lg-4 col-md-6 col-sm-5  p-1 col-10 offset-lg-1 offset-md-2  offset-2 ${styles.textdata} mt-5`}
          >
            <h2 className="">{`${userData?.first_name + " " + userData?.last_name
              }`}</h2>

            <div>
              <span className="fw-bold ">Department Name : </span>&nbsp;
              <span className="">
                {`${userData?.department?.name}`}
              </span>
            </div>
          </div>
          <div
            className={`col-lg-4 col-md-6 col-sm-6  p-1 col-10 offset-lg-1 offset-md-2  offset-2 ${styles.textdata}`}
          >
            <table className="">
              <tbody>
                <tr>
                  <th>Email</th>
                  <th className="px-4">:</th>
                  <td>{`${userData?.email ? userData?.email : "-"}`}</td>
                </tr>
                <tr>
                  <th>Employee_ID</th>
                  <th className="px-4">:</th>
                  <td>{`${userData?.employee_ID ? userData?.employee_ID : "-"}`}</td>
                </tr>
                <tr>
                  <th>Designation</th>
                  <th className="px-4">:</th>
                  <td>{`${userData?.user_type ? userData?.user_type : "-"}`}</td>
                </tr>
                <tr>
                  <th>Date of Joining</th>
                  <th className="px-4">:</th>
                  <td>{`${userData?.doj ? userData?.doj : "-"}`}</td>
                </tr>
                <tr>
                  <th>Date of Birth</th>
                  <th className="px-4">:</th>
                  <td>{`${userData?.dob ? userData?.dob : "-"}`}</td>
                </tr>
                <tr>
                  <th>Blood Group</th>
                  <th className="px-4">:</th>
                  <td>{`${userData?.bloodGroup ? userData?.bloodGroup : "-"}`}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="row mt-4 ">
        <nav
          className={`navbar navbar-expand-lg navbar-light bg-light ${styles.navPosition}`}
        >
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className={`navbar-nav list-group  ${styles.drop_down}`}>
              <li
                className={`list-group-item ${state == "Basic Information" ? styles.activeTab : styles.listItem} rounded-0`}
                name="Basic Information"
                value="Basic Information"
                onClick={() => handleClick("Basic Information")}
              >
                Basic Information
              </li>
              <li
                className={`list-group-item ${state == "Profile Picture" ? styles.activeTab : styles.listItem}`}
                onClick={() => handleClick("Profile Picture")}
                name="Profile Picture"
                value="Profile Picture"
              >
                Profile Picture
              </li>

              <li
                className={`list-group-item ${state == "Qualification" ? styles.activeTab : styles.listItem}`}
                onClick={() => handleClick("Qualification")}
                name="Qualification"
              >
                Qualification
              </li>

              <li
                className={`list-group-item ${state == "ChangePassword" ? styles.activeTab : styles.listItem}`}
                onClick={() => handleClick("ChangePassword")}
                name="ChangePassword"
              >
                Change Password
              </li>
              <li
                className={`list-group-item ${state == "FamilyMember" ? styles.activeTab : styles.listItem}`}
                onClick={() => handleClick("FamilyMember")}
                name="FamilyMember"
              >
                Family Member
              </li>
              <li
                className={`list-group-item ${state == "EmergencyContact" ? styles.activeTab : styles.listItem} rounded-0`}
                onClick={() => handleClick("EmergencyContact")}
                name="EmergencyContact"
              >
                Emergency Contact
              </li>
            </ul>
          </div>
        </nav>

        <div
          className={`col-md-12 border   bg-white  mb-5 ${styles.tableRound}`}
        >
          <AboutInfo type={state} userData={userData} />
        </div>
      </div>
    </>
  );
}
