import { next } from "../navigation/actions";

export const ANSWER = 'ANSWER';
export const RESET = 'RESET';

export function answer(questionIndex, answer) {
    let result = {
        type: ANSWER,
        data: {}
    };
    result.data[questionIndex] = answer;
    return (dispatch) => {
        dispatch(next());
        dispatch(result);
    }
}

export function resetAnswers() {
    return {
        type: RESET
    }
}