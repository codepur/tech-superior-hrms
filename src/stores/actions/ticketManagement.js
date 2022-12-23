import API from "../../helpers/api/index";

export function setdepartmentList(params) {
    return (dispatch) => {
      dispatch({ type: 'REQUEST_DEPARTMENTS' });
      API.apiGet('departmentList')
        .then((response) => {
          if (response.data && response.data.success === true && response.data.data) {
            dispatch({ type: `SET_DEPARTMENTS_LIST`, payload: response.data.data });
          }
        })
        .catch((err) => {
          dispatch({ type: `SET_DEPARTMENTS_LIST`, payload: [] });
        });
    };
  }

  export function setTicketList(params) {
    return (dispatch) => {
      dispatch({ type: 'REQUEST_TICKETS_LIST' });
      API.apiGet('ticketsList')
        .then((response) => {
          if (response.data) {
            dispatch({ type: `SET_TICKETS_LIST`, payload: response.data.data });
          }
        })
        .catch((err) => {
          dispatch({ type: `SET_TICKETS_LIST`, payload: [] });
        });
    };
  }