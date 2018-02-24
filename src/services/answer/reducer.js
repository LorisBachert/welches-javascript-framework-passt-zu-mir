import { ANSWER, RESET } from "./actions";

export function answerReducer(answers = {}, action) {
    switch(action.type) {
        case ANSWER:
            return {
                ...answers,
                ...action.data
            };
        case RESET:
            return {};
        default:
            return answers;
    }
}