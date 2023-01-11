const INITIAL_STATE = {
    profileList: [],
    // allUserList:[],
    loading: false,
};

const ProfilePicture = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        //   case "REQUEST_ATTENDANCE_LIST":
        //     return {
        //       ...state,
        //       loading: true,
        //     };
        case "SET_PROFILE_PICTURE":
            return {
                ...state,
                loading: true,
                //profileList: action.payload,
            };
        //   case "GET_ALL_USER_LIST":
        //      return {
        //       ...state,
        //       loading: false,
        //       allUserList: action.payload,
        //      }  
        default:
            return state;
    }
};

export default ProfilePicture;
