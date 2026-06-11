import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router';

const PrivateRouter = ({children}) => {
    const {user, loading} = useAuth();
    const location = useLocation();
    console.log(location)
 
    if(loading) {
        return <p>loading.....</p>
    }

    if(!user) {
       return <Navigate state={location.pathname} to='/login' >  </Navigate>
    }

    return (
        <div>
            
        </div>
    );
};

export default PrivateRouter;