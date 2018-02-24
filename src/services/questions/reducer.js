import { FETCH_QUESTIONS } from "./actions";

export function questionReducer(questions = [], action) {
    switch(action.type) {
        case FETCH_QUESTIONS:
            return action.questions;
        default:
            return questions;
    }
}