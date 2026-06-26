import React from 'react';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import Forbidden from '../pages/Forbidden/Forbidden';

const RiderRoute = ({children}) => {

    const {user, loading} = useAuth();
    const {role, isLoading} = useRole();


    if (loading || isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace></Navigate>;
    }

  
    if (role !== 'rider') {
        return <Forbidden />;
    }



    return  children
};

export default RiderRoute;