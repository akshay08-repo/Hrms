const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({

    employeeId: {
        type: String,
        requried: true
    },
    employeeName: {
        type: String,
        required: true
    },
    employeeStatus: {
        type: String,
        required: true
    },
    employeeAddress: {
        type: String,
        required: true
    },
    employeeSalary: {
        type: String,
        required: true
    },
    employeeTax: {
        type: String,
        required: true
    },
    employeeHra: {
        type: String,
        required: true
    },
    employee401k: {
        type: String,
        required: true
    },
    employeeNet: {
        type: Number,
    },
    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = Profile = mongoose.model('profile', ProfileSchema);