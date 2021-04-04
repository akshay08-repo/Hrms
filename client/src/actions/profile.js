import axios from 'axios';
import { setAlert } from './alert';
import { GET_EMPLOYEE, EMPLOYEE_ERROR, UPDATE_EMPLOYEE, USER_LOADED, GET_ID } from './types';

export const getCurrentEmployee = () => async (dispatch) => {
    try {
        const res = await axios.get('/api/profile/')

        dispatch({
            type: GET_EMPLOYEE,
            payload: res.data
        })

    } catch (err) {
        dispatch({
            type: EMPLOYEE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

//create or update profile

export const createProfile = (formData, history, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.post('/api/profile', formData, config)
        dispatch({
            type: GET_EMPLOYEE,
            payload: res.data
        })
        dispatch(setAlert(edit ? 'Employee Profile Updated' : 'Employee Profile Created', 'success'))
        if (!edit) {
            history.push('/dashboard');
        }
    } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        dispatch({
            type: EMPLOYEE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}


export const getProfileById = (id) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/profile/${id}`);

        dispatch({
            type: GET_ID,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: EMPLOYEE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

//delete an employee

export const deleteProfile = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/${id}`);

        dispatch({
            type: UPDATE_EMPLOYEE,
            payload: res.data
        })
        dispatch(setAlert('Employee Deleted', 'success'));
    } catch (err) {

    }
}