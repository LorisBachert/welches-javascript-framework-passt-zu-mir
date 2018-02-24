import { FETCH_FRAMEWORKS } from "./actions";

export function frameworkReducer(frameworks = [], action) {
    switch(action.type) {
        case FETCH_FRAMEWORKS:
            return action.frameworks;
        default:
            return frameworks;
    }
}