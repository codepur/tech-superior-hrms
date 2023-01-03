
const INITIAL_STATE={
    attendanceList:[],
};

const attendanceReducer=(state=INITIAL_STATE,action)=>{
    switch(action.type){
        case 'REQUEST_ATTENDANCE':
            return {
                ...state,
                loading: true,
              };
        case 'SET_ATTENDANCE_LIST':
            return{
                ...state,
                loading:true,
                attendanceList:action.payload,
            }
            default:
            return state;
    }

}
export  default attendanceReducer;