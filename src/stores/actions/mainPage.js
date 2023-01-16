import { get } from "lodash";
import router from "next/router";
import API from "../../helpers/api/index";
import * as auth from "../../helpers/auth";

function errorRequest(err, dispatch) {
  let data = get(err, "response.data", null);
  data = data || get(err, "response");
  data = data || err;
  dispatch({
    type: "REQUEST_FAIL",
    payload: data,
  });
}

export function login(payload) {
  return (dispatch) => {
    const type = "AUTH";
    dispatch({ type: `${type}_REQUEST` });
    try {
      API.apiPost("login", { payload: auth.encodeData(payload) })
        .then(({ data }) => {
          if (data && data.token) {
            auth.login(data.token);
            dispatch({ type: `${type}_SUCCESS`, payload: data });
            dispatch(getProfile());
            router.push("/employee-dashboard");
          }
        })
        .catch((err) => {
          errorRequest(err, dispatch);
        });
    } catch (err) {
      errorRequest(err, dispatch);
    }
  };
}

export function getProfile() {
  return (dispatch) => {
    const type = "PROFILE";
    try {
      API.apiGet("getlogin")
        .then((response) => {
          if (response.data) {
            let payload = response.data.data;
            dispatch({ type: `${type}_SUCCESS`, payload });
          }
        })
        .catch((err) => {
          errorRequest(err, dispatch);
        });
    } catch (err) {
      errorRequest(err, dispatch);
    }
  };
}

export function setUserlist() {
  return (dispatch) => {
    try {
      API.apiGet("userlist")
        .then((response) => {
          if (response.data) {
            dispatch({ type: `SET_User_List`, payload: response.data.data });
            dispatch({
              type: `SET_Count_List`,
              payload: response.data.totalCount,
            });
          }
        })
        .catch((err) => {
          errorRequest(err, dispatch);
        });
    } catch (err) {
      errorRequest(err, dispatch);
    }
  };
}

export function setQualificationList() {
  return (dispatch) => {
    try {
      API.apiGet("qualificationList")
        .then((response) => {
          if (response.data) {
            dispatch({
              type: `SET_QUALIFICATION_List`,
              payload: response.data.data,
            });
          }
        })
        .catch((err) => {
          errorRequest(err, dispatch);
        });
    } catch (err) {
      errorRequest(err, dispatch);
    }
  };
}

export function setFamilyList() {
  return (dispatch) => {
    try {
      API.apiGet("userFamilyEmergencyUpdate")
        .then((response) => {
          if (response.data) {
            dispatch({
              type: `SET_FAMILY_List`,
              payload: response.data.data[0],
              //earlier==> payload: response.data.data[0].family_member,
            });
          }
        })
        .catch((err) => {
          errorRequest(err, dispatch);
        });
    } catch (err) {
      errorRequest(err, dispatch);
    }
  };
}
