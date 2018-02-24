import { resetAnswers } from "../answer/actions";
import { resetState } from "../result/actions";

export const BACK = 'BACK';
export const NEXT = 'NEXT';
export const RESTART = 'RESTART';

export function back() {
    return {
        type: BACK
    }
}

export function next() {
    return (dispatch, getState) => {
        const state = getState();
        dispatch({
            type: NEXT,
            maxIndex: state.questions.length - 1
        });
    };
}

export function restart() {
    return (dispatch) => {
        dispatch(resetAnswers());
        dispatch(resetState());
        dispatch({
            type: RESTART
        });
    };
}