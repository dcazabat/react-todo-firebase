import { useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import user from "../assets/images/user.jpg";

export default function ContactDetail(props) {
  const {id} = useParams();
  const contact = props.contacts.filter(item => {
    return item.id === id;
  });
  const [name] = useState(contact[0].name);
  const [email] = useState(contact[0].email);

  return (
    <div className="main">
      <div className="ui card centered">
        <div className="image">
          <img src={user} alt="user" />
        </div>
        <div className="content">
          <div className="display-6">{name}</div>
          <div className="description">{email}</div>
        </div>
      </div>
      <div className="center-div">
        <Link to="/">
          <button className="ui button blue center">
            Volver a la Lista de Contactos
          </button>
        </Link>
      </div>
    </div>
  );
};