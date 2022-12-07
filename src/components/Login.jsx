import { useState } from "react";
import { auth, userExist } from '../firebase/cnx'
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { FcGoogle } from 'react-icons/fc'
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthProvider from "./AuthProvider";

export default function Login() {

    // const [currentUser, setCurrentUser] = useState(null);

    /*
        Valores currentState
        0: Init
        1: Loading 
        2: Login Complet
        3: Login but no Registration
        4: Not Logged In
        5: User Exist
        6: New UserName, Continue
    */

    const [currentState, setCurrentState] = useState(0);
    const navigate = useNavigate();

    async function logInGoogle() {
        const googleProvider = new GoogleAuthProvider();
        await singInWithGoogle(googleProvider);

        async function singInWithGoogle(googleProvider) {
            try {
                const res = await signInWithPopup(auth, googleProvider);
                console.log(res);
            } catch (error) {
                console.error(error)
            }
        }
    }

    function handleUserLoggedIn(user) {
        navigate('/')
    }

    function handleUserNotLoggedIn() {
        setCurrentState(3)
    }

    function handleUserNotRegistered(user) {
        navigate('/username')
    }

    if (currentState === 3) {
        return (
            <div className="text-center">
                <button className="btn btn-ligth" onClick={logInGoogle}>
                    <FcGoogle size={50} />
                </button>
            </div>
        )
    };

    return (
        <AuthProvider
            onUserLoggedIn={handleUserLoggedIn}
            onUserNotLoggedIn={handleUserNotLoggedIn}
            onUserNotRegistered={handleUserNotRegistered}
        >
            <div className="container">
                <h6 className="display-3 text-center">Loading ...</h6>
            </div>
        </AuthProvider>
    )
};