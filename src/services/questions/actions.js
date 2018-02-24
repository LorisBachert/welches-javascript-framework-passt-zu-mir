import axios from 'axios';

export const FETCH_QUESTIONS = 'FETCH_QUESTIONS';

export function fetchQuestions() {
    return (dispatch) => {
        return axios.get("https://lorisbachert.github.io/welches-javascript-framework-passt-zu-mir/data.json")
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