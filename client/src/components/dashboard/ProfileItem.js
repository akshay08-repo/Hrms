import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { deleteProfile } from '../../actions/profile';
import { connect } from 'react-redux';
const ProfileItem = ({ employees, deleteProfile }) => {
    const employeeProfiles = employees.map(employee => (
        <tr key={employee._id}>
            <td>
                {employee.employeeName}
            </td>
            <td className="hide-sm">{employee.employeeId}</td>
            <td className="hide-sm">{employee.employeeStatus}</td>
            <td className="hide-sm">{employee.employeeAddress}</td>
            <td className="hide-sm">{employee.employeeSalary}</td>
            <td className="hide-sm">{(Number(employee.employee401k) + Number(employee.employeeTax) + Number(employee.employeeHra))}</td>
            <td>{Number(employee.employeeSalary) - (Number(employee.employee401k) + Number(employee.employeeTax) + Number(employee.employeeHra))}</td>
            <td > <Link to={`/profile/${employee._id}`} className="btn btn-success">Edit</Link></td>
            <td className="hide-sm"> <Link to={`/viewprofile/${employee._id}`} className="btn btn-success">View</Link></td>
            <td className="hide-sm"> <button onClick={() => deleteProfile(employee.employeeId)} className="btn btn-danger">Delete</button></td>
        </tr>
    ))
    return (
        <Fragment>
            <h2 className="my-2">All Employees</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th >Employee Name</th>
                        <th className="hide-sm">Employee Id</th>
                        <th className="hide-sm">Employee status</th>
                        <th className="hide-sm">Employee Address</th>
                        <th className="hide-sm">Employee Salary</th>
                        <th className="hide-sm">Total Deductions</th>
                        <th >Employee Net</th>
                        <th >Employee Edit</th>
                        <th className="hide-sm">Employee View</th>
                        <th className="hide-sm">Employee Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {employeeProfiles}
                </tbody>
            </table>
        </Fragment>
        // <div>
        //     {employeeId}
        //     <span>  </span>
        //     {employeeName}
        //     <span>  </span>
        //     {employeeSalary}
        //     <span>  </span>
        //     {employeeTax}
        //     <span>  </span>
        //     {Number(employeeSalary) - (Number(employeeTax) + Number(employee401k) + Number(employeeHra))}
        // </div>
    )
}

ProfileItem.propTypes = {
    employees: PropTypes.array.isRequired,
    deleteProfile: PropTypes.func.isRequired
}

export default connect(null, { deleteProfile })(ProfileItem)
