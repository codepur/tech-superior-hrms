import API from "../../helpers/api/index";

export function setProfilePicture(params) {
    return (dispatch) => {
        dispatch({ type: 'REQUEST_PROFILE_PICTURE' });
        API.apiGet('userProfile', `/${params}`)
            .then((response) => {
                if (response.data) {
                    dispatch({ type: `SET_PROFILE_PICTURE`, payload: response.data.data });
                }
            })
            .catch((err) => {
                dispatch({ type: `SET_PROFILE_PICTURE`, payload: [] });
            });
    };
}

