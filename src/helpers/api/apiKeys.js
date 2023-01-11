
const apiKeys = {
  login: "users/login",
  getlogin: "users/profile",

  userlist: "users/list",
  resetUserPassword: "users/password/reset",
  updatePassword: "users/password/change",
  sendResetEmail: "users/password/reset/link",
  // userProfilePicture:"users/profilePicture",
  userProfilePicture: "users/profile/picture/upload",  
  userProfile:"images/ProfileImages",
  userFamilyEmergencyUpdate: "users/family/profile",
  userFamilyListdelete: "users/family/profile/delete",
  qualificationList: "users/qualification/List",
  updateQualification: "users/qualification/update",
  deleteQualification: "users/qualification/delete",

  //ticket-management
  departmentList: "department/list",
  createTicket: "tickets/create",
  ticketsList: "tickets/list",

  //hiring-portal
  candidateInvite: "users/profile",
  deleteProfile: "users/profile/delete",

  //DSR
  createDsr: "dsr/create",
  projectList: "project/list",
  DsrList: "dsr/list",
  dsrReject_Approvel: "dsr/status",
  updateDsr: "dsr/update",


  //Attendance
  attendanceList: "attendance/list",
  createAttendance: "attendance/create",
  punchIn: "attendance/punchIn",
  punchOut: "attendance/punchOut",
  allUserList: "attendance/allUsersList",
};


export default apiKeys;
