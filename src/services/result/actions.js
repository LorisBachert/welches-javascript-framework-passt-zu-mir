export const DONE = 'DONE';
export const RESET = 'RESET';

export function done() {
    return {
        type: DONE
    }
}

export function resetState() {
    return {
        type: RESET
    }
}