import API from "../../helpers/api/index";
import { decodeData } from "../../helpers/auth";

export function setProfilePicture(params) {
    return (dispatch) => {
        dispatch({ type: 'REQUEST_PROFILE_PICTURE' });
        API.apiGet('userProfile', `:${params}`)
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


export function downloadStudyDocuments(params) {
    return (dispatch) => {
        dispatch({ type: 'DOWNLOAD_STUDY_DOCUMENTS' });
        API.apiGet('downloadStudyDocument', `?query=${params}`)
            .then((response) => {
                const url = window.URL.createObjectURL + { responseType: 'blob' };
                const link = document.createElement('a');
                link.href = response.data.data.document_link;
                link.setAttribute('download', `FileName.pdf`);

                document.body.appendChild(link);

                link.click();

                link.parentNode.removeChild(link);
                if (response.data && response.data.success === true && response.data.data.document_link) {
                    dispatch({ type: `SET_DOWNLOAD_DATA`, payload: response.data.data.document_link });
                }
            })

            .catch((err) => {
                handleErrorMessage(err);
                dispatch({ type: `SET_DOWNLOAD_DATA`, payload: [] });
            });
    };
}
