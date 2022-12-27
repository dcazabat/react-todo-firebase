import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import "./App.css";
import AddContact from "./components/AddContact";
import ContactList from "./components/ContactList";
import ContactDetail from "./components/ContactDetail";
import NoMatch from "./components/NoMatch";
import Login from "./components/Login";
import SignOut from "./components/Signout"
import ChooseUserNameView from "./components/ChooseUserNameView";
import Application from './components/Application';

// Importar la variables de Conexion de Firebase
// import { db, dbCollections } from './firebase/cnx';


function App() {

  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);

  async function addContactHandler(contact) {
    const newContact = {
      id: uuidv4(),
      name: contact.name,
      email: contact.email,
      // uid: currentUser.uid,
    };
    console.log(newContact);
    // const res = await insertNewContact({ ...newContact });
    // newContact.docId = res.id;

    setContacts([...contacts, { id: uuidv4(), ...contact }]);
    // console.log('ID', uuidv4());
  };

  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
  };

  useEffect(() => {
    const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (retriveContacts) setContacts(retriveContacts);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Application />} />
          <Route exact path="/contacts" element={<ContactList contacts={contacts} getContactId={removeContactHandler} />}></Route>
          <Route exact path="/login" element={<Login />} ></Route>
          <Route exact path="/signout" element={<SignOut />} ></Route>
          <Route exact path="/username" element={<ChooseUserNameView />} ></Route>
          <Route exact path="/add" element={<AddContact addContactHandler={addContactHandler} />}></Route>
          <Route path="/contact/:id" element={<ContactDetail contacts={contacts} />}></Route>
          <Route path="*" element={<NoMatch />} ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;