const INITIAL_STATE = {
  auth: {},
  errors: {},
  userData: {},
  userList: [],
  qualificationList: [],
  familyList: [],
  CountParticipant: "",
};

const mainPageReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "AUTH_FAILURE":
      return { ...state, errors: action.payload };
    case "AUTH_SUCCESS":
      return { ...state, auth: action.payload }; // isOtp: false, userData: isAuth()
    case "PROFILE_SUCCESS":
      return { ...state, userData: action.payload };
    case "SET_RESET_PASSWORD":
      return { ...state, userData: action.payload };
    case "SET_User_List":
      return { ...state, userList: action.payload };
    case "SET_QUALIFICATION_List":
      return { ...state, qualificationList: action.payload };
    case "SET_FAMILY_List":
      return { ...state, familyList: action.payload };
    case "SET_Count_List":
      return { ...state, CountParticipant: action.payload };
    default:
      return state;
  }
};

export default mainPageReducers;
