import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';
import { getAuth, getIdToken } from 'firebase/auth'; 

const axiosSecure = axios.create({
    baseURL: 'http://localhost:3000'
})

const useAxiosSecure = () => {
    const { user, logoutUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // ==-== Intercepts request for the backend ==-== //
        const reqInterCeptor = axiosSecure.interceptors.request.use(async (config) => { 
            try {
                const auth = getAuth();
                const currentUser = auth.currentUser;

                if (currentUser) {
                    const token = await getIdToken(currentUser, true)
                    config.headers.Authorization = `Bearer ${token}`;
                } else if (user?.accessToken) {
                    
                    config.headers.Authorization = `Bearer ${user.accessToken}`;
                }
            } catch (error) {
                console.error("Error refreshing token:", error);
            }
            
            return config;
        }, (error) => {
            return Promise.reject(error);
        });

        // ==-== Interceptors for Response ==-== //
        const resInterceptor = axiosSecure.interceptors.response.use(
            (response) => response,
            (error) => {
                console.log(error);
                const statusCode = error.response ? error.response.status : error.status;
                
                if (statusCode === 401 || statusCode === 403) {
                    if (typeof logoutUser === 'function') {
                        logoutUser()
                            .then(() => {
                                navigate('/login');
                            })
                            .catch(err => console.error("Logout error:", err));
                    }
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosSecure.interceptors.request.eject(reqInterCeptor);
            axiosSecure.interceptors.response.eject(resInterceptor);
        }

    }, [logoutUser, navigate, user]);

    return axiosSecure;
};

export default useAxiosSecure;