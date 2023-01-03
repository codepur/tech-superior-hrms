import API from "../../helpers/api/index";

export function attendanceList(params) {
<<<<<<< HEAD
    return (dispatch) => {
      dispatch({ type: 'REQUEST_ATTENDANCE_LIST' });
      API.apiGet('attendanceList')
        .then((response) => {
            console.log('response', response);

          if (response.data && response.data.success === true && response.data.data) {
            dispatch({ type: `SET_ATTENDANCE_LIST`, payload: response.data.data });
          }
        })
        .catch((err) => {
          dispatch({ type: `SET_ATTENDANCE_LIST`, payload: [] });
        });
    };
  } 

 
=======
  return (dispatch) => {
    dispatch({ type: 'REQUEST_ATTENDANCE_LIST' });
    API.apiGet('attendanceList')
      .then((response) => {
    
        if (response.data && response.data.success === true && response.data.data) {
          dispatch({ type: `SET_ATTENDANCE_LIST`, payload: response.data.data });
        }
      })
      .catch((err) => {
        dispatch({ type: `SET_ATTENDANCE_LIST`, payload: [] });
      });
  };
}

>>>>>>> 1f2d11064564bdf2f87589a81c33f5614fa2feab
