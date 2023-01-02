import React from "react";
import AdminLeaveComponent from "./leaveAdmin";
import EmployeeLeaveComponent from "./leaveEmployee";
import { useSelector } from "react-redux";
import {
    EMPLOYEE_ROLE,
    SUB_ADMIN_ROLE,
} from "../../constants/constant";



const LeaveComponent = () => {
    const [userData] = useSelector((Gstate) => [Gstate.user?.userData]);
    const roleId = userData?.roles;

    return (
        <>
            {roleId && roleId === SUB_ADMIN_ROLE && <AdminLeaveComponent />}
            {roleId && roleId === EMPLOYEE_ROLE && <EmployeeLeaveComponent />}
        </>)

}
export default LeaveComponent