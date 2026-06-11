import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase.init';

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

        // ==-==  Register user ==-== 
    const registerUser = (email, pass) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, pass)
    }

        // ==-== signInUser ==-== 
    const signInUser = (email, pass) => {
         setLoading(true);
        return signInWithEmailAndPassword(auth, email, pass)
    }

    const signInWithGoogle = () => {
         setLoading(true);
         return signInWithPopup(auth, googleProvider)
    }

    // ==-== Logut User ==-== 

    const logoutUser = () => {
        setLoading(true);
       return signOut(auth)
    }

    // ==-==  observing user in or out ==-== 

    useEffect( () => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
                setUser(currentUser);
                setLoading(false)
        })
        return () => {
            unSubscribe()
        }
    }, [])

    const authInfo = {
            user,
            loading,
            registerUser,
            signInUser,
            signInWithGoogle,
            logoutUser

    }
    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;