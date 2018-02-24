import { DONE, RESET } from "./actions";

export function resultReducer(done = false, action) {
    switch(action.type) {
        case DONE:
            return true;
        case RESET:
            return false;
        default:
            return done;
    }
}