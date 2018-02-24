import axios from 'axios';

export const FETCH_FRAMEWORKS = 'FETCH_FRAMEWORKS';

export function fetchFrameworks() {
    return (dispatch) => {
        return axios.get("/data.json")
            .then(response => {
                dispatch(fetchQuestionsSuccess(response.data.frameworks));
            });
    }
}

function fetchQuestionsSuccess(frameworks) {
    return {
        type: FETCH_FRAMEWORKS,
        frameworks
    }
}