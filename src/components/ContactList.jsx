import { Link, useNavigate } from "react-router-dom";
import ContactCard from "./ContactCard";
import { BsFillPlusCircleFill } from 'react-icons/bs'
import Header from "./Header";
import { useEffect, useState } from "react";
import { auth, getUserInfo, userExists, fetchContactData } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function ContactList(props) {
  const [currentUser, setCurrentUser] = useState({uid:0, username: "",profilePicture:"",processCompleted:false,displayName:""});

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, callBackAuthState);
  },[])

  async function callBackAuthState(user) {
    if (user) {
      const uid = user.uid;
      console.log(user);

      if (userExists(user.uid)) {
        const loggedUser = await getUserInfo(uid);
        setCurrentUser(loggedUser);
        if (loggedUser.username === "") {
          // console.log("Falta username");
          navigate("/login");
        } else {
          // console.log("Ya tiene username");
          const asyncContacts = await fetchContactData(uid);
          setContacts([...asyncContacts]);
        }
      } else {
        // console.log('Usuario Logueado pero no existe');
        navigate("/login");
      }
    } else {
      // console.log('Usuario no Logueado');
      navigate("/login");
    }
  }

  const deleteConactHandler = (id) => {
    props.getContactId(id);
  };

  const renderContactList = props.contacts.map((contact) => {
    return (
      <div className="col d-flex justify-content-center align-items-center">
        <ContactCard
          contact={contact}
          clickHander={deleteConactHandler}
        />
      </div>
    );
  });
  return (
    <div>
      <Header isLogged={(currentUser.username != "" ? true : false)}></Header>
      <div className="text-center">
        <div className="row d-flex align-items-center">
          <h2 className="display-4 col">
            Contactos
          </h2>
          <Link className="col-2" to="/add">
            <BsFillPlusCircleFill size={50} />
          </Link>
        </div>
        <div className="row mt-5">
          {renderContactList}
        </div>
      </div>
    </div>
  );
};