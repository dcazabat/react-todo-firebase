import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import AuthProvider from "./AuthProvider";
import { existUsername, updateUser } from "../firebase/cnx";

export default function ChooseUserNameView() {

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
    const [currentUser, setCurrentUser] = useState({});
    const [username, setUserName] = useState('');

    const navigate = useNavigate();

    function handleUserLoggedIn(user) {
        navigate('/')
    }

    function handleUserNotLoggedIn() {
        navigate('/login')
    }

    function handleUserNotRegistered(user) {
        setCurrentUser(user)
        setCurrentState(2)
    }

    function handleInputUserName(e) {
        setUserName(e.target.value)
    }

    async function handleContinue() {
        if (username != '') {
            const exist = await existUsername(username)
            if (exist) {
                setCurrentState(5)
            } else {
                const tmp = { ... currentUser}
                tmp.username = username
                tmp.processComplited = true
                // Actualizamos el Usuario
                await updateUser(tmp)
                setCurrentState(6)
            }
        }
        
    }

    if (currentState === 2 || currentState === 5) {
        return (
            <div className="text-center">
                <h1 className="display-1">
                    Bienvenido {currentUser.displayName}
                </h1>
                <p>Para terminar el proceso de Alta de Usuario, ingrese un nombre valido</p>
                {currentState === 5 ? <p>El nombre de usuario ya existe</p> : ''}
                <div>
                    <input type="text" onChange={handleInputUserName} ></input>
                </div>
                <div>
                    <button className="btn btn-success" onClick={handleContinue}>Continue</button>
                </div>
            </div>
        )
    };

    if (currentState === 6) {
        return (
            <div>
                <h3>Felicidades proceso de Registro Completo !!!!</h3>
                <Link className="btn btn-success" to="/">Continuar</Link>
            </div>
        )
    }
    return <AuthProvider
                onUserLoggedIn={handleUserLoggedIn}
                onUserNotLoggedIn={handleUserNotLoggedIn}
                onUserNotRegistered={handleUserNotRegistered}
            ></AuthProvider>
}