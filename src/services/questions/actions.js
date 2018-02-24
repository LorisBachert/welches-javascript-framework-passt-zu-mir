import axios from 'axios';

export const FETCH_QUESTIONS = 'FETCH_QUESTIONS';

export function fetchQuestions() {
    return (dispatch) => {
        return axios.get("/data.json")
            .then(response => {
                dispatch(fetchQuestionsSuccess(response.data.questions));
            });
    }
}

function fetchQuestionsSuccess(questions) {
    return {
        type: FETCH_QUESTIONS,
        questions
    }
}