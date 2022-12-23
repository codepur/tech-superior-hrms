import API from "../../helpers/api/index";

export function setAdminDsrList(parmes) {
  return (dispatch) => {
    dispatch({type: "REQUEST_DSR_LIST" });
    API.apiGet('DsrList',`?query=${parmes}`)
      .then((response) => {
        if (response.data) {
          dispatch({ type: `SET_DSR_LIST`, payload: response.data.data });
        }
      })
      .catch((err) => {
        dispatch({ type: `SET_DSR_LIST`, payload: [] });
      });
  };
}

export function setProjectList() {
  return (dispatch) => {
    dispatch({ type: "REQUEST_PROJECT_LIST" });
    API.apiGet("projectList")
      .then((response) => {
        if (response.data) {
          dispatch({ type: `SET_PROJECT_LIST`, payload: response.data.data });
        }
      })
      .catch((err) => {
        dispatch({ type: `SET_PROJECT_LIST`, payload: [] });
      });
  };
}

export function setDsrList() {
  return (dispatch) => {
    dispatch({type: "REQUEST_DSR_LIST" });
    API.apiGet('DsrList')
      .then((response) => {
        if (response.data) {
          dispatch({ type: `SET_DSR_LIST`, payload: response.data.data });
        }
      })
      .catch((err) => {
        dispatch({ type: `SET_DSR_LIST`, payload: [] });
      });
  };
}
