import { useState, useEffect } from 'react'
import { AiOutlineLogin, AiOutlineLogout } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { auth, getUserInfo, userExists, fetchContactData } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import imgLogo from '../../public/fav-icon.svg'
import './Header.css';

export default function Header() {
  
  const [isLogged, setIsLogged] = useState()
  const [userName, setUserName ] = useState('No Logeado')

  useEffect(() => {
    onAuthStateChanged(auth, callBackAuthState);
  }, [])

  async function callBackAuthState(user) {
    if (user) {
      const uid = user.uid;

      setUserName('No Logeado')
      if (userExists(user.uid)) {
        const loggedUser = await getUserInfo(uid);
        if (loggedUser.username === "") {
          setIsLogged(false)
        } else {
          setUserName(loggedUser.username)
          setIsLogged(true)
        }
      } else {
        setIsLogged(false)
      }
    } else {
      setIsLogged(false)
    }
  }
  
  return (
    <div className="nav-header">
      <div className="div-btn-logo">
        <img className='imglogo' src={imgLogo} alt="" />
      </div>
      <div className=''>
        <h2>Lista de Contactos</h2>
        <h4>
          Usuario Conectado: {userName}
        </h4>
      </div>
      <div className='div-btn-login'>
        {(isLogged) ?
          <Link className="btn btn-danger" to='/signout'>
            <AiOutlineLogout size={30} />
          </Link>
          :
          <Link className="btn btn-success" to='/login'>
            <AiOutlineLogin size={30} />
          </Link>}
      </div>
    </div>
  );
};