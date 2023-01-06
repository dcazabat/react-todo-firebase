import { useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import user from "../../assets/images/user.jpg";

export default function ContactDetail(props) {
  const { id } = useParams();
  const contact = props.contacts.filter(item => {
    return item.id === id;
  });
  const [name] = useState(contact[0].name);
  const [email] = useState(contact[0].email);

  return (
    <div className="container text-center w-25">
      <div className="card m-3">
        <img className="card-img-top" src={user} alt="user" />
        <div className="card-body">
          <div className="card-title">{name}</div>
          <div className="card-text">{email}</div>
        </div>
      </div>
      <Link to="/contacts">
        <button className="btn btn-warning">
          Volver a la Lista de Contactos
        </button>
      </Link>
    </div>
  );
};