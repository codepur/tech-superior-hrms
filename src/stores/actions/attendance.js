
import { get } from "lodash";
import router from "next/router";
import API from "../../helpers/api/index";
import * as auth from "../../helpers/auth";
 

export function attendance(payload) {
    return (dispatch) => {
      const type = "AUTH";
      dispatch({ type: `${type}_REQUEST` });
      try {
        API.apiPost("markAttendance",{payload:auth.encodeData(payload)})
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