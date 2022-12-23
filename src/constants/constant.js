export const appMenuItems = [
  {
    id: 1,
    name: "Dashboard",
    link: "/employee-dashboard",
    Icon: "/images/dashboard.png",
    IconActive: "/images/dashboard-active.png",
  },
  {
    id: 2,
    name: "My Profile",
    link: "/profile-management",
    Icon: "/images/my-profile.png",
    IconActive: "/images/my-profile-active.png",
  },
  {
    id: 3,
    name: "Directory",
    link: "/directory",
    Icon: "/images/directory.png",
    IconActive: "/images/directory-active.png",
  },
  {
    id: 4,
    name: "Ticket Management",
    link: "/ticket-management",
    Icon: "/images/ticket.png",
    IconActive: "/images/ticket-active.png",
  },
  {
    id: 5,
    name: "Hiring Portal",
    link: "/hiring-portal",
    Icon: "/images/hiring.png",
    IconActive: "/images/hiring-active.png",
  },
  {
    id: 6,
    name: "Employee Management",
    link: "/add-employee",
    Icon: "/images/add-employee.png",
    IconActive: "/images/add-employee-active.png",
  },
  {
    id: 7,
    name: "DSR",
    link: "/dsr",
    Icon: "/images/add-employee.png",
    IconActive: "/images/add-employee-active.png",
  },
  {
    id: 8,
    name: "Attendance",
    link: "/attendance",
    Icon: "/images/attendance.png",
    IconActive: "/images/attendance.png",
  },
];

export const ADMIN_ROLE = 1;
export const SUB_ADMIN_ROLE = 2;
export const EMPLOYEE_ROLE = 3;
export const routesConfig = {
  "/": {
    path: "/",
    redirect: "/",
    protected: false,
    access: [ADMIN_ROLE, SUB_ADMIN_ROLE, EMPLOYEE_ROLE],
  },
  "/set-password": {
    path: "/set-password",
    redirect: "/",
    protected: true,
    access: [ADMIN_ROLE, SUB_ADMIN_ROLE, EMPLOYEE_ROLE],
  },
  "/dashboard": {
    path: "/dashboard",
    redirect: "/dashboard",
    protected: true,
    access: [ADMIN_ROLE, SUB_ADMIN_ROLE, EMPLOYEE_ROLE],
  },
  "/profile-management": {
    path: "/profile-management",
    redirect: "/dashboard",
    protected: true,
    access: [ADMIN_ROLE, SUB_ADMIN_ROLE, EMPLOYEE_ROLE],
  },
  "/ticket-management": {
    path: "/ticket-management",
    redirect: "/dashboard",
    protected: true,
    access: [ADMIN_ROLE, SUB_ADMIN_ROLE, EMPLOYEE_ROLE],
  },
  "/directory": {
    path: "/directory",
    redirect: "/dashboard",
    protected: true,
    access: [EMPLOYEE_ROLE],
  },
  "/admin-portal": {
    path: "/admin-portal",
    redirect: "/dashboard",
    protected: true,
    access: [SUB_ADMIN_ROLE, EMPLOYEE_ROLE],
  },
  "/dsr": {
    path: "/dsr",
    redirect: "/dashboard",
    protected: true,
    access: [SUB_ADMIN_ROLE, EMPLOYEE_ROLE],
  },
  "/attendance": {
    path: "/attendance",
    redirect: "/dashboard",
    protected: true,
    access: [SUB_ADMIN_ROLE, EMPLOYEE_ROLE],
  },
};
