import React from 'react';
import { Navigate } from 'react-router';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import Forbidden from '../pages/Forbidden/Forbidden';

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const { role, isLoading } = useRole();

    console.log( 'role:',role, 'loading:', loading, 'isLoading:', isLoading)

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

  
    if (role !== 'admin') {
        return <Forbidden />;
    }

  
    return children;
};

export default AdminRoute;