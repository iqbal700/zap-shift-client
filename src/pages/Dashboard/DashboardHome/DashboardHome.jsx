import React from 'react';
import AdminDashboardHome from './AdminDashboardHome';
import UserDashboardHome from './UserDashboardHome';
import useRole from '../../../hooks/useRole';
import RiderDashboardHome from './RiderDashboardHome';

const DashboardHome = () => {

    const {role, isLoading} = useRole();

            if(isLoading) {
                return <p>loading.....</p>
            }

            if(role === 'admin') {
                    return <AdminDashboardHome> </AdminDashboardHome>
            } else if( role === 'rider') {
                    return <RiderDashboardHome> </RiderDashboardHome>
            } else {
                    return <UserDashboardHome> </UserDashboardHome>
                }
};

export default DashboardHome;