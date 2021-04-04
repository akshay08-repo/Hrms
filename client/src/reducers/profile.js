import { GET_EMPLOYEE, EMPLOYEE_ERROR, CLEAR_PROFILE, UPDATE_EMPLOYEE, GET_ID } from "../actions/types";

const initialState = {
    employee: null,
    employees: [],
    loading: true,
    error: {}
}
// eslint-disable-next-line
export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_EMPLOYEE:
        case UPDATE_EMPLOYEE:
            return {
                ...state,
                employees: payload,
                loading: false
            }
        case GET_ID:
            return {
                ...state,
                employee: payload,
                loading: false
            }
        case EMPLOYEE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        case CLEAR_PROFILE:
            return {
                ...state,
                employees: [],
                loading: false
            }
        default:
            return state;
    }
}