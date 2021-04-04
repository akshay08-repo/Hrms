import React, { useState, Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile'

const CreateProfile = ({ createProfile, history }) => {
    const [formData, setFormData] = useState({
        employeeId: '',
        employeeName: '',
        employeeStatus: '',
        employeeAddress: '',
        employeeSalary: '',
        employeeTax: '',
        employeeHra: '',
        employee401k: '',
    });
    const {
        employeeId,
        employeeName,
        employeeStatus,
        employeeAddress,
        employeeSalary,
        employeeTax,
        employeeHra,
        employee401k,
    } = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

    const onSubmit = e => {
        e.preventDefault();
        createProfile(formData, history);
    }
    return (
        <Fragment>
            <h1 className="large text-primary">
                Create Employee Profile
      </h1>
            <p className="lead">
                <i className="fas fa-user"></i>Fillout the Employee details form
      </p>
            <small>* = required field</small>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input type="text" placeholder="Emp Id" name="employeeId" value={employeeId} onChange={e => onChange(e)} />
                    <small className="form-text"
                    >Employee ID</small
                    >
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Name" name="employeeName" value={employeeName} onChange={e => onChange(e)} />
                    <small className="form-text"
                    >Employee First Name</small
                    >
                </div>
                <div className="form-group">
                    <select name="employeeStatus" value={employeeStatus} onChange={e => onChange(e)}>
                        <option value="0">* Select Professional Status</option>
                        <option value="Developer">Developer</option>
                        <option value="Junior Developer">Junior Developer</option>
                        <option value="Senior Developer">Senior Developer</option>
                        <option value="Manager">Manager</option>
                        <option value="Student or Learning">Student or Learning</option>
                        <option value="Instructor">Instructor or Teacher</option>
                        <option value="Intern">Intern</option>
                        <option value="Other">Other</option>
                    </select>
                    <small className="form-text"
                    >Select the current role of the Employee</small
                    >
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Address" name="employeeAddress" value={employeeAddress} onChange={e => onChange(e)} />
                    <small className="form-text"
                    >City & state suggested (eg. Arlington, Tx)</small
                    >
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Salary" name="employeeSalary" value={employeeSalary} onChange={e => onChange(e)} />
                    <small className="form-text"
                    >Salary in $ Amount</small
                    >
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Tax" name="employeeTax" value={employeeTax} onChange={e => onChange(e)} />
                    <small className="form-text"
                    >Tax in $ Amount</small
                    >
                </div>
                <div className="form-group">
                    <input type="text" placeholder="HRA" name="employeeHra" value={employeeHra} onChange={e => onChange(e)} />
                    <small className="form-text"
                    >HRA in $ Amount</small
                    >
                </div>
                <div className="form-group">
                    <input type="text" placeholder="E401k" name="employee401k" value={employee401k} onChange={e => onChange(e)} />
                    <small className="form-text"
                    >401k in $ Amount</small
                    >
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <a className="btn btn-light my-1" href="dashboard.html">Go Back</a>
            </form>
        </Fragment>
    )
};

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired
}


export default connect(null, { createProfile })(withRouter(CreateProfile))
