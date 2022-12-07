import { Link } from "react-router-dom";
import ContactCard from "./ContactCard";
import { BsFillPlusCircleFill } from 'react-icons/bs'

export default function ContactList(props) {
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
    <div className="container text-center">
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
  );
};