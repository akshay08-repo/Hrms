import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layouts/Spinner';
import ProfileItem from './ProfileItem';
import { getCurrentEmployee } from '../../actions/profile'
const Dashboard = ({
    auth: { user },
    getCurrentEmployee,
    employee: { employees, loading }
}) => {
    useEffect(() => {
        getCurrentEmployee();
    }, [getCurrentEmployee, user]);

    return (
        <Fragment>
            {loading && Object.keys(employees).length === 0 ? (
                <Spinner />
            ) : (
                    <Fragment>
                        <h1 className='large text-primary'>Dashboard</h1>
                        <p className='lead'>
                            <i className='fas fa-user' />Welcome


                        </p>
                        {employees.length > 0 ? (
                            <Fragment>
                                <ProfileItem employees={employees} />
                            </Fragment>) : (
                                <Fragment>
                                    <p>You have yet to enter a Employee profile, please add some info</p>
                                    <Link to='/create-profile' className="btn btn-primary my-1">Create Employee</Link>
                                </Fragment>
                            )}
                    </Fragment>
                )}
        </Fragment>
    );
};

Dashboard.propTypes = {
    getCurrentEmployee: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    employee: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    employee: state.employee
});

export default connect(mapStateToProps, { getCurrentEmployee })(Dashboard)
