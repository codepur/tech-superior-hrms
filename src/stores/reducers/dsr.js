const INITIAL_STATE = {
  dsrList: [],
  // AdmindsrList: [],
  projectList: [],
  loading: false,
};

const DsrReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "REQUEST_DSR_LIST":
      return {
        ...state,
        loading: true,
      };
    case "SET_DSR_LIST":
      return {
        ...state,
        loading: false,
        dsrList: action.payload,
      };
      // case "REQUEST_Admin_DSR_LIST":
      //   return {
      //     ...state,
      //     loading: true,
      //   };
      // case "SET_Admin_DSR_LIST":
      //   return {
      //     ...state,
      //     loading: false,
      //     AdmindsrList: action.payload,
      //   };

    case "REQUEST_PROJECT_LIST":
      return {
        ...state,
        loading: true,
      };
    case "SET_PROJECT_LIST":
      return {
        ...state,
        loading: false,
        projectList: action.payload,
      };
    default:
      return state;
  }
};

export default DsrReducers;
