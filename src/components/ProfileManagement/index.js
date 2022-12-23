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
            className={`col-lg-3 col-md-4 col-sm-5  p-1 col-10 offset-lg-1 offset-md-2  offset-2 text-start ${styles.textdata}`}
          >
            <h4 className="">{`${
              userData?.first_name + " " + userData?.last_name
            }`}</h4>
            <div>
              <span className="fw-bold">Email : </span>&nbsp;
              <span>{`${userData?.email}`}</span>
            </div>
            <div>
              <span className="fw-bold">Employee_ID : </span>&nbsp;
              <span>{`${userData?.employee_ID}`}</span>
            </div>
            <div>
              <span className="fw-bold">Designation : </span>&nbsp;
              <span>{`${userData?.user_type}`}</span>
            </div>
            <div>
              <span className="fw-bold">Last Login : </span>&nbsp;
              <span></span>
            </div>
          </div>
        </div>
      </div>
      
      {/*  Sidebar */}
      <div className="row mt-4 ">
        <div className={`col-md-3`}>
          <ul className={`list-group ${styles.drop_down} ${styles.tableRound}`}>
            <li
              className={`list-group-item  ${state=="Basic Information" ? styles.activeTab : styles.listItem}`}
              onClick={() => handleClick("Basic Information")}
              name="Basic Information"
              value="Basic Information"
            >
              Basic Information
            </li>
            <li
              className={`list-group-item ${state=="Profile Picture" ? styles.activeTab : styles.listItem}`}
              onClick={() => handleClick("Profile Picture")}
              name="Profile Picture"
              value="Profile Picture"
            >
              Profile Picture
            </li>
            <li
              className={`list-group-item ${state=="Qualification" ? styles.activeTab : styles.listItem}`}
              onClick={() => handleClick("Qualification")}
              name="Qualification"
            >
              Qualification
            </li>
            <li
              className={`list-group-item ${state=="ChangePassword" ? styles.activeTab : styles.listItem}`}
              onClick={() => handleClick("ChangePassword")}
              name="ChangePassword"
            >
              Change Password
            </li>
            <li
              className={`list-group-item ${state=="FamilyMember" ? styles.activeTab : styles.listItem}`}
              onClick={() => handleClick("FamilyMember")}
              name="FamilyMember"
            >
              Family Member
            </li>
            <li
              className={`list-group-item ${state=="EmergencyContact" ? styles.activeTab : styles.listItem}`}
              onClick={() => handleClick("EmergencyContact")}
              name="EmergencyContact"
            >
              Emergency Contact
            </li>
            <li
              className={`list-group-item ${state=="DepartmentChange" ? styles.activeTab : styles.listItem}`}
              onClick={() => handleClick("DepartmentChange")}
              name="DepartmentChange"
            >
              Option 1
            </li>
          </ul>
        </div>

        {/* All Data */}
        <div
          className={`col-md-9 border   bg-white  mb-5 ${styles.tableRound}`}
        >
          <AboutInfo type={state} />
        </div>
      </div>
    </>
  );
}
