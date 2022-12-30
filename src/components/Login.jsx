import { useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, registerNewUser } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import AuthProvider from "../components/AuthProvider";
import Loading from "../components/Loading";
import { FcGoogle, FcLeft } from 'react-icons/fc'

import style from "./Login.css";

/*
  Stages:
  0: initiated
  1: loading
  2: login completed
  3: login but no username
  4: not logged
*/
export default function Login() {
  const navigate = useNavigate();
  const [state, setState] = useState(1);

  function handleAuth() {
    const googleProvider = new GoogleAuthProvider();
    const signInWithGoogle = async () => {
      try {
        const res = await signInWithPopup(auth, googleProvider);
        if (res) {
          registerNewUser(res.user);
        }
      } catch (err) {
        console.error(err);
        //alert(err.message);
      }
    };
    signInWithGoogle();
  }

  if (state === 4) {
    return (
      <div className={style.loginView}>
        <div>
          <h1>LOGUEATE !!!!</h1>
          <button onClick={() => handleAuth()} className="btn btn-outline-dark">
            <FcGoogle size={50} />
          </button>
          <button onClick={() => navigate('/')} className="btn btn-outline-dark">
            <FcLeft size={50} /> Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <AuthProvider
      onUserLoggedIn={(user) => {
        navigate("/contacts");
      }}
      onUserNotLoggedIn={() => {
        setState(4);
      }}
    >
      <Loading />
    </AuthProvider>
  );
}
