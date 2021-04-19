const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
//get current user profile
//use the token
router.get('/me', auth, async (req, res) => {
    try {
        console.log(req.user.id)
        const profile = await User.findOne({ user: req.user._id })
        console.log(profile)

        if (!profile) {
            return res.status(400).json({ msg: 'There is no profile for this user' });
        }
        res.json(profile);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Service Error');
    }

});

//post to api/profile
//create or update user profile

router.post('/', [auth, [
    check('employeeId', 'EmployeeId is requried').not().isEmpty(),
    check('employeeName', 'Employee Name is requried').not().isEmpty(),
    check('employeeStatus', 'Employee Status is requried').not().isEmpty(),
    check('employeeAddress', 'Employee Address is requried').not().isEmpty(),
    check('employeeSalary', 'Employee Salary is requried').not().isEmpty(),
    check('employeeTax', 'Employee Tax is requried').not().isEmpty(),
    check('employeeHra', 'Employee Hra is requried').not().isEmpty(),
    check('employee401k', 'Employee 401k is requried').not().isEmpty(),
]],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {
            employeeId,
            employeeName,
            employeeStatus,
            employeeAddress,
            employeeSalary,
            employeeTax,
            employeeHra,
            employee401k,
        } = req.body;
        //build the object
        const profileFields = {};
        if (employeeId) profileFields.employeeId = employeeId;
        if (employeeName) profileFields.employeeName = employeeName;
        if (employeeStatus) profileFields.employeeStatus = employeeStatus;
        if (employeeAddress) profileFields.employeeAddress = employeeAddress;
        if (employeeSalary) profileFields.employeeSalary = employeeSalary;
        if (employeeTax) profileFields.employeeTax = employeeTax;
        if (employeeHra) profileFields.employeeHra = employeeHra;
        if (employee401k) profileFields.employee401k = employee401k;

        try {
            let profile = await Profile.findOne({ employeeId: req.body.employeeId });
            if (profile) {
                profile = await Profile.findByIdAndUpdate(
                    profile._id,
                    { $set: profileFields },
                    { new: true }
                );
                return res.json(profile);
            }
            //create 

            profile = new Profile(profileFields);
            await profile.save();
            res.json(profile);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }

    });

//get api/profiles

router.get('/', auth, async (req, res) => {
    try {
        const profiles = await Profile.find()
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

//get api/profile of single user
router.get('/:empid', async (req, res) => {
    try {
        const profile = await Profile.findOne({
            _id: req.params.empid
        });
        if (!profile) return res.status(400).json({ msg: 'Profile Not Found' });
        res.json(profile);
    } catch (err) {
        if (err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'Profile Not Found' });
        }
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

//delete record of a single user

router.delete('/:empid', auth, async (req, res) => {
    try {
        // console.log(req.user.id);
        await Profile.findOneAndRemove({ employeeId: req.params.empid });
        res.json({ msg: 'User Deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;