import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import employee from './profile';
export default combineReducers({
    alert,
    auth,
    employee
});