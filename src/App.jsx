import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import "./App.css";
import Header from "./components/Header";
import AddContact from "./components/AddContact";
import ContactList from "./components/ContactList";
import ContactDetail from "./components/ContactDetail";
import NoMatch from "./components/NoMatch";
import Login from "./components/Login";

// Importar la variables de Conexion de Firebase
// import { db, dbCollections } from './firebase/cnx';

function App() {

  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);

  const addContactHandler = (contact) => {
    setContacts([...contacts, { id: uuidv4(), ...contact }]);
    console.log('ID', uuidv4());
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
      <Header />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<ContactList contacts={contacts} getContactId={removeContactHandler} />}></Route>
          <Route exact path="/login" element={<Login />} ></Route>
          <Route exact path="/username" element={<ChooseUserNameView />} ></Route>
          <Route exact path="/add" element={<AddContact addContactHandler={addContactHandler} />}></Route>
          <Route path="/contact/:id" element={<ContactDetail contacts={contacts}/>}></Route>
          <Route path="*" element={<NoMatch />} ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;