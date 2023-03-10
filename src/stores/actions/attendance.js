import API from "../../helpers/api/index"; 
 
export function attendanceList(params) { 
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

export function allUserList(params) {
  return (dispatch) => {  
    dispatch({ type: 'REQUEST_ATTENDANCE_LIST' });
    API.apiGet('allUserList')
      .then((response) => {
    
        if (response.data && response.data.success === true && response.data.data) {
          dispatch({ type: `GET_ALL_USER_LIST`, payload: response.data.data });
        }
      })
      .catch((err) => {
        dispatch({ type: `GET_ALL_USER_LIST`, payload: [] });
      });
  };
}


