import React from "react";
import AdminLeaveComponent from "./leaveAdmin";
import EmployeeLeaveComponent from "./leaveEmployee";



const LeaveComponent = ()=>{

    return(
    <>
     <EmployeeLeaveComponent />
     <AdminLeaveComponent />
    </>)
     
}
export default LeaveComponent