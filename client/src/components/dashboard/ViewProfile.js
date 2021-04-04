// // import React, { Fragment, useEffect, useState } from 'react'
// // import { connect } from 'react-redux'
// // import PropTypes from 'prop-types'
// // import { getProfileById } from '../../actions/profile'
// // const ViewProfile = ({ match, getProfileById, employee: { employee } }) => {
// //     // useEffect(() => {
// //     //     getProfileById(match.params.id);
// //     // }, [getProfileById, match.params.id])
// //     return (
// //         <div>
// //             <Chart></Chart>
// //         </div>
// //     )
// // }

// // ViewProfile.propTypes = {
// //     getProfileById: PropTypes.func.isRequired,
// //     employee: PropTypes.object.isRequired,
// // }
// // const mapStateToProps = state => ({
// //     employee: state.employee,
// //     auth: state.auth
// // })

// // export default connect(mapStateToProps, { getProfileById })(ViewProfile)
// import React, { useState, useEffect } from "react";
// import { Line } from "react-chartjs-2";
// import PropTypes from 'prop-types'

// const ViewProfile = () => {
//     const [chartData, setChartData] = useState({});
//     const chart = () => {
//         setChartData({
//             label: ['monday', 'tuesday', 'wed', 'thurs', 'friday'],
//             datasets: [
//                 {
//                     label: 'hello this is label',
//                     data: [32, 45, 12, 76, 69],
//                     backgroundColor: [
//                         'rgba(75,192,192,0.6)'
//                     ],
//                     borderWidth: 4
//                 }
//             ]
//         })
//     }
//     useEffect(() => {
//         chart()
//     }, [])
//     return (
//         <div className="App">
//             <h1>Chart</h1>
//             <div>
//                 <Line data={chartData} />
//             </div>
//         </div>
//     )
// }

// // ViewProfile.propTypes = {

// // }

// export default ViewProfile

// import { LineChart, Line } from 'recharts'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getProfileById } from '../../actions/profile'
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, Legend } from 'recharts'

const ViewProfile = ({ match, getProfileById, employee: { employee } }) => {
    const test = employee.employeeStatus
    let val;
    switch (test) {
        case "Senior Developer":
            val = 30;
            break;
        default:
            val = 5;
    }
    const bonus = Number(employee.employeeSalary) * (val / 100)
    useEffect(() => {
        getProfileById(match.params.id);
    }, [getProfileById, match.params.id])
    const data = [
        { name: "Salary", value: Number(employee.employeeSalary) },
        { name: "Tax", value: Number(employee.employeeTax) },
        { name: "hra", value: Number(employee.employeeHra) },
        { name: "401k", value: Number(employee.employee401k) }


    ]
    const barData = [
        { name: "Tax", value: Number(employee.employeeTax) },
        { name: "hra", value: Number(employee.employeeHra) },
        { name: "401k", value: Number(employee.employee401k) }
    ]
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    const RADIAN = Math.PI / 180;
    // console.log(RADIAN)
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;

        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };
    return (
        <section className="container">
            <h1 className='large text-primary'>Dashboard</h1>
            <p className='lead'><i className='fas fa-user' />{employee.employeeName} Record</p>
            <div className="profiles">
                <div className="profile bg-light">

                    <PieChart width={400} height={400}>
                        <Pie
                            data={data}
                            name="pv of pages"
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={150}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                    <div>
                        <h2>Employee Predictions</h2>
                        <p>Estimated Bonus:{bonus}</p>
                        <p>Estimated Salary:{bonus + Number(employee.employeeSalary)}</p>
                        <table className="tab">
                            <thead>
                                <tr>
                                    <th className="hide-sm">Tax</th>
                                    <th className="hide-sm">Hra</th>
                                    <th className="hide-sm">401k</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{employee.employeeTax}$</td>
                                    <td>{employee.employeeHra}$</td>
                                    <td>{employee.employee401k}$</td>
                                </tr>
                            </tbody>
                        </table>
                        {/* <a href="profile.html" class="btn btn-primary">View Profile</a> */}
                    </div>
                    <div>
                        <BarChart width={350} height={350} data={barData}>
                            <Bar dataKey="value" fill="#8884d8" name="Employee deductions" />
                            <XAxis dataKey="name" />
                            <YAxis label={{ value: 'Amount in $', angle: -90, position: 'insideLeft' }} />
                            <Tooltip />
                            <Legend />
                        </BarChart>
                    </div>
                </div>

            </div>
        </section>
    );
}
ViewProfile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    employee: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    employee: state.employee,
    auth: state.auth
})

export default connect(mapStateToProps, { getProfileById })(ViewProfile)