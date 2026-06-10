import React from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebase.init';

const AuthProvider = ({children}) => {

        // ==-==  Register user ==-== 
    const registerUser = (email, pass) => {
        return createUserWithEmailAndPassword(auth, email, pass)
    }

        // ==-== signInUser
    const signInUser = (email, pass) => {
        return signInWithEmailAndPassword(auth, email, pass)
    }

    const authInfo = {
            registerUser,
            signInUser
    }
    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;