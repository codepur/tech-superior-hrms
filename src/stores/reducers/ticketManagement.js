const INITIAL_STATE = {
  departmentList: [],
  ticketCreate: {},
  ticketsList: [],
};

const ticketReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "REQUEST_DEPARTMENTS":
      return {
        ...state,
        loading: true,
      };
    case "SET_DEPARTMENTS_LIST":
      return {
        ...state,
        loading: false,
        departmentList: action.payload,
      };
    case "REQUEST_TICKETS_CREATE":
      return {
        ...state,
        loading: true,
      };
    case "SET_TICKETS_CREATE":
      return {
        ...state,
        loading: false,
        ticketCreate: action.payload,
      };
    case "REQUEST_TICKETS_LIST":
      return {
        ...state,
        loading: true,
      };
    case "SET_TICKETS_LIST":
      return {
        ...state,
        loading: false,
        ticketsList: action.payload,
      };
    default:
      return state;
  }
};

export default ticketReducers;
