const INITIAL_STATE = {
    loading: false,
};

const ProfilePicture = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "SET_PROFILE_PICTURE":
            return {
                ...state,
                loading: true,
            };
        default:
            return state;
    }
};

export default ProfilePicture;
