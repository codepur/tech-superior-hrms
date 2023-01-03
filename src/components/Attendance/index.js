import React from "react";
import { useSelector } from "react-redux";
import {
    EMPLOYEE_ROLE,
    SUB_ADMIN_ROLE,
} from "../../constants/constant";
import AdminAttendanceComp from "./adminAttendance";
import EmployeeAttendanceComp from "./employeeAttendance";



const LeaveComponent = () => {
    const [userData] = useSelector((Gstate) => [Gstate.user?.userData]);
    const roleId = userData?.roles;

    return (
        <>
            {roleId && roleId === SUB_ADMIN_ROLE && <AdminAttendanceComp />}
            {roleId && roleId === EMPLOYEE_ROLE && <EmployeeAttendanceComp />}
        </>)

}
export default LeaveComponent