import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { questionReducer } from './services/questions/reducer';
import { frameworkReducer } from './services/frameworks/reducer';
import { navigationReducer } from "./services/navigation/reducer";
import { answerReducer } from "./services/answer/reducer";
import { resultReducer } from "./services/result/reducer";

const INITIAL_STATE = {
    questions: [],
    frameworks: [],
    index: -1,
    answers: {},
    done: false
};

const store = createStore(
    combineReducers({
        questions: questionReducer,
        frameworks: frameworkReducer,
        index: navigationReducer,
        answers: answerReducer,
        done: resultReducer
    }),
    INITIAL_STATE,
    applyMiddleware(thunk)
);

export default store;