const INITIAL_STATE = {
  attendanceList: [],
  allUserList:[],
  loading: false,
};

const AttendanceReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "REQUEST_ATTENDANCE_LIST":
      return {
        ...state,
        loading: true,
      };
    case "SET_ATTENDANCE_LIST":
      return {
        ...state,
        loading: false,
        attendanceList: action.payload,
      }; 
    case "GET_ALL_USER_LIST":
       return {
        ...state,
        loading: false,
        allUserList: action.payload,
       }  
    default:
      return state;
  }
};

export default AttendanceReducers;
