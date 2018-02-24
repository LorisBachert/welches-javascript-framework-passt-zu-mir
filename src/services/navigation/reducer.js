import { BACK, NEXT, RESTART } from "./actions";

export function navigationReducer(index = 0, action) {
    switch(action.type) {
        case BACK:
            return index > 0 ? index - 1 : index;
        case NEXT:
            return index < action.maxIndex ? index + 1 : index;
        case RESTART:
            return 0;
        default:
            return index;
    }
}